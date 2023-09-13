import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  message,
} from "antd";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useCartStore } from "@/hook/useCountStore";
import Image from "next/image";
import CheckoutMethod from "@/compenents/Checkout/CheckoutMethod";
import { useRouter } from "next/router";
import { useSaveOrderId } from "@/hook/useSaveOrderId";
import CheckoutPay from "@/compenents/Checkout/CheckoutPay";
import { axiosClient } from "@/libraries/axiosConfig";
import { useSession } from "next-auth/react";
const { Option } = Select;

const CheckoutPayment = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { saveOrderId } = useSaveOrderId((state: any) => state);
  const [cities, setCities] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  const [payMethod, setPayMethod] = useState<any>("shipCod");
  const [position, setPosition] = useState<any>();

  const { itemsCheckout } = useCartStore((state: any) => state);

  //Lấy danh sách tỉnh thành
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

  //Lấy vị trí
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json");
        setPosition(response.data);
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
    orderData.orderDetails = itemsCheckout.map((item: any) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    orderData.contactInformation = {
      address: orderData.shippingAddress,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };
    orderData.customerId = `${user?._id}`;
    orderData.position = {
      name: position.regionName,
      lat: position.lat,
      lng: position.lon,
    };

    if (payMethod === "shipCod") {
      orderData.paymentType = "CASH";

      const payPost = async () => {
        const found: any = await axiosClient.post(`/orders`, orderData);

        saveOrderId(found?.data?.result?._id);
        if (found) {
          //Change stock of product :
          const handleChangeStock = await axiosClient
            .post(`/products/orderp/${found?.data?.result._id}/stock`)
            .then((response) => {
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error(error);
            });
          router.push("/success-payment");
        }
      };
      payPost();
    }
    if (payMethod === "momo") {
      orderData.paymentType = "MOMO";

      const amount = itemsCheckout
        .map((item: any) => item.product.price * item.quantity)
        .reduce((accumulator: any, subtotal: any) => accumulator + subtotal, 0);

      const payPost = async () => {
        const postOder: any = await axiosClient.post(`/orders`, orderData);
        try {
          console.log("««««« postOder »»»»»", postOder);
          if (postOder?.data?.oke === true) {
            //Change stock of product :
            const handleChangeStock = await axiosClient
              .post(`/products/orderp/${postOder?.data?.result?._id}/stock`)
              .then((response) => {
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error(error);
              });

            const found = await axiosClient.post(
              `/orders/pay/create_momo_url`,
              { amount: amount }
            );

            window.location.href = found.data.urlPay;
          }
        } catch (error) {
          console.log("««««« error »»»»»", error);
          await axiosClient.delete(`/orders/${postOder?.data?.result?._id}`);
          message.error({
            content:
              "Momo chỉ cho phép thanh toán giá trị đơn hàng dưới 10 triệu đồng!!, vui lòng thay đổi cách thanh toán.",

            style: {
              marginTop: 130,
            },
          });
        }
      };
      payPost();
    }
    if (payMethod === "vnpay") {
      orderData.paymentType = "VNPAY";

      const amount = itemsCheckout
        .map((item: any) => item.product.price * item.quantity)
        .reduce((accumulator: any, subtotal: any) => accumulator + subtotal, 0);

      const payPost = async () => {
        try {
          const postOder = await axiosClient.post(`/orders`, orderData);
          if (postOder?.data?.oke === true) {
            const handleChangeStock = await axiosClient
              .post(`/products/orderp/${postOder?.data?._id}/stock`)
              .then((response) => {
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error(error);
              });

            const found = await axiosClient.post(
              `/orders/pay/create_vnpay_url`,
              { amount: amount }
            );

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

  // const [isHydrated, setIsHydrated] = useState(false);
  // useEffect(() => {
  //   setIsHydrated(true);
  // }, []);
  // const renderOrders = (): React.ReactNode => {
  //   if (!isHydrated) {
  //     // Server-side rendering
  //     return null;
  //   }

  //   if (itemsCheckout) {
  //     return (
  //       <>
  //         {itemsCheckout.map((i: any, index: any) => {
  //           return (
  //             <React.Fragment key={i.product._id}>
  //               <div className="d-flex justify-content-between">
  //                 <div className="w-75">
  //                   <span>{i.product.name}</span> x{" "}
  //                   <span className="text-danger">{i.quantity}</span>
  //                 </div>
  //                 <span>
  //                   {(i.product.price * i.quantity).toLocaleString("vi-VN", {
  //                     style: "currency",
  //                     currency: "VND",
  //                   })}
  //                 </span>
  //               </div>
  //               <Divider></Divider>
  //             </React.Fragment>
  //           );
  //         })}

  //         <div className="d-flex justify-content-between">
  //           <strong>Tổng</strong>
  //           <strong>
  //             {itemsCheckout.length > 0
  //               ? itemsCheckout
  //                   .map((item: any) => item.product.price * item.quantity)
  //                   .reduce(
  //                     (accumulator: any, subtotal: any) =>
  //                       accumulator + subtotal,
  //                     0
  //                   )
  //                   .toLocaleString("vi-VN", {
  //                     style: "currency",
  //                     currency: "VND",
  //                   })
  //               : 0}
  //           </strong>
  //         </div>
  //       </>
  //     );
  //   }
  // };

  return (
    <div className="bg-gray-300">
      <div style={{ background: "rgb(245,245,245)" }}>
        <div className="container">
          <h4 className="text-center py-4">
            {user?._id
              ? `Thủ tục thanh toán`
              : `Vui lòng đăng nhập để truy cập thanh toán!`}
          </h4>
          <Divider orientation="left"> Phương thức thanh toán cho phép</Divider>
        </div>

        <CheckoutMethod />
      </div>

      {user?._id ? (
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row">
            <div className="px-3 py-2 w-auto md:w-1/2 ">
              {" "}
              <Card
                className="border border-dark-subtle"
                title="Thông tin thanh toán"
                style={{ width: "100%" }}
              >
                <div className="flex justify-between border-bottom">
                  <strong>Sản phẩm</strong>
                  <strong>Tạm tính</strong>
                </div>
                {/* {renderOrders()} */}

                <CheckoutPay />
                <Divider></Divider>

                <Radio.Group defaultValue={payMethod}>
                  <Space
                    direction="vertical"
                    onChange={(e: any) => setPayMethod(e?.target?.value)}
                  >
                    <Radio
                      className="flex justify-around border-bottom"
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
                      className="flex justify-around border-bottom"
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
                      className="flex justify-around border-bottom"
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
            </div>

            <div className="py-2 px-3 w-auto md:w-1/2">
              {" "}
              <Card
                className="border border-dark-subtle"
                title="Đơn hàng của bạn"
                style={{ width: "100%" }}
              >
                <Form
                  layout="vertical"
                  name="payForm"
                  onFinish={handlePaySubmit}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
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
                      onChange={(cityId) => {
                        handleCityChange(cityId);
                      }}
                    >
                      {renderCity()}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Quận/ Huyện"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "Please select your district!",
                      },
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
                  <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                    <Button
                      className="text-white border-gray-200 dark:bg-gray-900 hover:text-gray-400"
                      htmlType="submit"
                    >
                      Thanh toán
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <Divider>Vui lòng đăng nhập!!</Divider>
      )}
    </div>
  );
};

export default CheckoutPayment;
