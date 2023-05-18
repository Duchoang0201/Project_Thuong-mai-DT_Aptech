import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCartStore } from "@/hook/useCountStore";
import { useAuthStore } from "@/hook/useAuthStore";
import router from "next/router";
import { DollarOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;
type Props = {};

const CheckoutPayment = (props: Props) => {
  const [cities, setCities] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  const [fromAction, setFormAction] = useState<any>();
  //setPayMethod

  const [payMethod, setPayMethod] = useState<any>("shipCod");

  // const handleChangePayMethod = (value: any) => {
  //   setPayMethod(value);
  // };
  const { items } = useCartStore((state: any) => state);
  const { auth }: any = useAuthStore((state: any) => state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderCity = () => {
    return cities.map((city: any) => (
      <Option key={city.Id} value={city.Id}>
        {city.Name}
      </Option>
    ));
  };

  const renderDistrict = () => {
    return districts.map((district: any) => (
      <Option key={district.Id} value={district.Id}>
        {district.Name}
      </Option>
    ));
  };

  const renderWard = () => {
    return wards.map((ward: any) => (
      <Option key={ward.Id} value={ward.Id}>
        {ward.Name}
      </Option>
    ));
  };

  const handleCityChange = (cityId: number) => {
    const selectedCity = cities.find((city: any) => city.Id === cityId);
    setDistricts(selectedCity?.Districts || []);
    setWards([]);
  };

  const handleDistrictChange = (districtId: number) => {
    const selectedDistrict = districts.find(
      (district: any) => district.Id === districtId
    );
    setDistricts((prevDistricts: any) => {
      const updatedDistricts = prevDistricts.map((district: any) => {
        if (district.Id === districtId) {
          return {
            ...district,
            selected: true,
          };
        } else {
          return {
            ...district,
            selected: false,
          };
        }
      });
      return updatedDistricts;
    });
    setWards(selectedDistrict?.Wards || []);
  };

  const handlePaySubmit = (values: any) => {
    const selectedCity = cities.find((city: any) => city.Id === values.city);
    const selectedDistrict = districts.find(
      (district: any) => district.Id === values.district
    );
    const selectedWard = wards.find((ward: any) => ward.Id === values.ward);

    values.city = selectedCity?.Name;
    values.district = selectedDistrict?.Name;
    values.ward = selectedWard?.Name;
    values.address = `${values.address}, ${values.ward}, ${values.district}, ${values.city}`;

    const orderData: any = {};
    orderData.createdDate = new Date().toISOString();
    orderData.shippedDate = new Date().toISOString();
    orderData.description = values.description;
    orderData.shippingAddress = values.address;
    orderData.status = "WAITING";
    orderData.orderDetails = items.map((item: any) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    orderData.contactInformation = {
      address: orderData.shippingAddress,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };
    orderData.customerId = `${auth.payload._id}`;

    console.log("««««« oderData »»»»»", orderData);
    if (payMethod === "shipCod") {
      orderData.paymentType = "CASH";

      const payPost = async () => {
        const found = await axios.post(
          "http://localhost:9000/orders",
          orderData
        );
        if (found) {
          router.push("/success-payment");
        }
      };
      payPost();
    }
    if (payMethod === "momo") {
      orderData.paymentType = "MOMO";

      const amount = items
        .map((item: any) => item.product.price)
        .reduce((acc: any, curr: any) => acc + curr, 0);

      const payPost = async () => {
        try {
          const postOder = await axios.post(
            "http://localhost:9000/orders",
            orderData
          );
          if (postOder) {
            const found = await axios.post(
              "http://localhost:9000/orders/pay/create_momo_url",
              { amount: amount }
            );

            console.log("««««« found »»»»»", found.data);
            window.location.href = found.data.urlPay;
          }
        } catch (error) {
          console.log("««««« error »»»»»", error);
        }
      };
      payPost();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const renderOrders = (): React.ReactNode => {
    if (!isHydrated) {
      // Server-side rendering
      return null;
    }

    if (items) {
      return (
        <>
          {items.map((i: any, index: any) => {
            return (
              <>
                <div
                  key={i.product.id}
                  className="d-flex justify-content-between"
                >
                  <div className="w-75">
                    <span>{i.product.name}</span> x{" "}
                    <span className="text-danger">{i.quantity}</span>
                  </div>
                  <span>{i.product.price}</span>
                </div>
                <Divider></Divider>
              </>
            );
          })}
          <div className="d-flex justify-content-between">
            <strong>Tổng</strong>
            <strong>
              {items.length > 0
                ? items
                    .map((item: any) => item.product.price)
                    .reduce((acc: any, curr: any) => acc + curr, 0)
                : 0}
            </strong>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="container ">
        <Row>
          <Col
            xs={24}
            xl={8}
            className="px-3 py-2"
            style={{ backgroundColor: "grey" }}
          >
            {" "}
            <Card title="Thông tin thanh toán" style={{ width: "100%" }}>
              <div className="d-flex justify-content-between border-bottom">
                <strong>Sản phẩm</strong>
                <strong>Tạm tính</strong>
              </div>
              {renderOrders()}
              <Divider></Divider>

              <Radio.Group defaultValue={payMethod}>
                <Space
                  direction="vertical"
                  onChange={(e: any) => setPayMethod(e?.target?.value)}
                >
                  <Radio
                    className="d-flex justify-content-around border-bottom"
                    value="shipCod"
                  >
                    <Space>
                      <span>Shipcod</span>
                      <span>
                        <Image
                          width={25}
                          height={25}
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbZ0bQHF9cNGzFlD8gAddwu0a15l43bcWyg&usqp=CAU"
                          }
                          alt={""}
                        />
                      </span>
                    </Space>
                  </Radio>
                  <Radio
                    className="d-flex justify-content-around border-bottom"
                    value="momo"
                  >
                    <Space>
                      <span>Momo</span>
                      <span>
                        <Image
                          width={25}
                          height={25}
                          src={
                            "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544"
                          }
                          alt={""}
                        />
                      </span>
                    </Space>
                  </Radio>
                  <Radio
                    className="d-flex justify-content-around border-bottom"
                    value="vnpay"
                  >
                    <Space>
                      <span>Vnpay</span>
                      <span>
                        <Image
                          width={25}
                          height={25}
                          src={
                            "https://vivnpay.vn/assets/landing/bat-nhip-tet/0701/29.png"
                          }
                          alt={""}
                        />
                      </span>
                    </Space>
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
          </Col>

          <Col
            xs={24}
            xl={14}
            className="py-2 px-3"
            style={{ backgroundColor: "grey" }}
          >
            {" "}
            <Card title="Đơn hàng của bạn" style={{ width: "100%" }}>
              <Form
                layout="vertical"
                name="payForm"
                onFinish={handlePaySubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                // action={payMethod}
                // method="POST"
              >
                <Row>
                  <Col xs={24} xl={12}>
                    {" "}
                    <Form.Item
                      label="Họ"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input style={{ width: "90%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    {" "}
                    <Form.Item
                      label="Tên"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input style={{ width: "90%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tỉnh Thành"
                  name="city"
                  rules={[
                    { required: true, message: "Please select your city!" },
                  ]}
                >
                  <Select
                    placeholder="Chọn tỉnh thành"
                    onChange={(cityId) => handleCityChange(cityId)}
                  >
                    {renderCity()}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Quận/ Huyện"
                  name="district"
                  rules={[
                    { required: true, message: "Please select your district!" },
                  ]}
                >
                  <Select
                    placeholder="Chọn quận huyện"
                    onChange={handleDistrictChange}
                  >
                    {renderDistrict()}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Phường/ Xã"
                  name="ward"
                  rules={[
                    { required: true, message: "Please select your ward!" },
                  ]}
                >
                  <Select placeholder="Chọn phường xã">{renderWard()}</Select>
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Ghi chú" name="description">
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
      <div></div>
    </>
  );
};

export default CheckoutPayment;
