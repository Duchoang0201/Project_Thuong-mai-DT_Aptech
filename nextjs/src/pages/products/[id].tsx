import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";

import axios from "axios";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Rate,
  Collapse,
  Input,
  Button,
  List,
  Form,
  message,
  Divider,
} from "antd";
import Style from "./index.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";

const { Panel } = Collapse;
const { TextArea } = Input;
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

// import { Pagination } from "swiper";
import { Navigation } from "swiper";
import { useAuthStore } from "@/hook/useAuthStore";
import { useCartStore } from "@/hook/useCountStore";
// import { Route } from "react-router-dom";
import ReactPlayer from "react-player";
import Topmoth from "@/compenents/Mainpage/Topmonth/Topmonth";
import Hotdeal from "@/compenents/Mainpage/Hotdeal/Hotdeal";
type Props = {
  product: any;
  allProduct: any;
  productParams: any;
};

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function ProductDetails({ product }: Props) {
  const [commentForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [picture, setPicture] = useState<any>();
  const [data, setData] = useState<any>(product.rateInfo);
  const [refresh, setRefresh] = useState<any>(0);
  const { add, items, increase } = useCartStore((state: any) => state);

  const { auth } = useAuthStore((state: any) => state);
  //////////////////

  const [productMain, setProductMain] = useState<any>();

  useEffect(() => {
    axios.get(`${URL_ENV}/products/${product._id}`).then((res) => {
      setProductMain(res.data);
      setData(res.data.rateInfo);
    });
  }, [product._id, refresh]);

  // useEffect(() => {
  //   console.log("update data: ", product);
  //   setData(product.rateInfo);
  // }, [product]);
  const onFinish = async (record: any) => {
    const customer = {
      customerId: auth.payload?._id,
      firstName: auth.payload?.firstName,
      lastName: auth.payload?.lastName,
      comment: record.comment,
    };

    const response = await axios.get(`${URL_ENV}/products/${product._id}`);
    const updateData = response.data;

    if (response.data.rateInfo) {
      updateData.rateInfo.push({
        customer: customer,
        rateNumber: record.rateNumber,
      });
    } else {
      updateData.rateInfo = [];
      updateData.rateInfo.push({
        customer: customer,
        rateNumber: record.rateNumber,
      });
    }

    axios
      .patch(`${URL_ENV}/products/${product._id}`, {
        rateInfo: updateData.rateInfo,
      })
      .then((res) => {
        commentForm.resetFields();
        message.success(
          "Cảm ơn quý khách đã đánh giá sản phẩm của chúng tôi",
          1.5
        );
        setRefresh((f: any) => f + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageClick = (items: any) => {
    console.log("click");
    setVisible(true);
    setPicture(items);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="container d-flex-column justify-content-center py-3">
        <div className=" w-75" style={{ margin: "0px 12%" }}>
          <div className=" d-flex flex-lg-row justify-content-center flex-column ">
            <div
              className="p-5 bd-highlight d-flex flex-column"
              style={{ background: "#fcfcfc" }}
            >
              <div>
                <Image
                  src={`${URL_ENV}/${productMain?.imageUrl}`}
                  alt="Description of the image"
                  width={200}
                  height={200}
                  className="w-100 img-fluid"
                ></Image>
              </div>

              <div
                className="d-flex flex-row  mt-2"
                style={{ width: "200px", height: "100px", marginLeft: "2% " }}
              >
                <Swiper
                  modules={[Navigation]}
                  className="mySwiper"
                  navigation={true}
                  slidesPerView={2}
                  spaceBetween={30}
                >
                  {productMain?.images?.map((items: any, index: any) => {
                    if (index <= 20)
                      return (
                        <>
                          <SwiperSlide
                            key={`${items._id}-${index}`}
                            className="ms-2 w-25"
                          >
                            <Image
                              src={`${URL_ENV}/${items}`}
                              alt="Description of the image"
                              width={80}
                              height={80}
                              className="border"
                              onClick={() => handleImageClick(items)}
                              // style={{ maxHeight: "180px", minHeight: "80px" }}
                            ></Image>
                            <Modal
                              visible={visible}
                              onCancel={handleModalClose}
                              footer={null}
                            >
                              <Image
                                src={`${URL_ENV}/${picture}`}
                                alt="Image"
                                width={500}
                                height={500}
                                style={{ width: "100%" }}
                              />
                            </Modal>
                          </SwiperSlide>
                        </>
                      );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="p-2 bd-highlight ">
              <h3 className="fs-5">{product?.name}</h3>
              <div>
                {" "}
                <Rate disabled value={product?.averageRate} />
                <span className={`${Style.ratingNumber}`}>
                  {product?.rateInfor?.length}
                </span>
              </div>
              <div className="d-sm-flex justify-content-between d-inline-block ">
                <p>
                  Mã: <span className="fs-6">{product?.categoryId}</span>
                </p>
                <p>{product?.amountSold} đã bán</p>
              </div>

              <div>
                <span className="fs-4">
                  {product?.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div>
                <b>{productMain?.active === true ? "Còn hàng" : "Hết hàng"}</b>
              </div>
              <div className="mt-1 border border-dark border-1 rounded-3 ">
                <div
                  className="  border-dark bg-light rounded-top "
                  // style={{ background: "#fcfcfc" }}
                >
                  <p className="">Chương trình - Ưu đãi</p>
                </div>
                <ul>
                  <li>Giảm giá cho sản phẩm lên đến {product.discount}%</li>
                  <li>Áp dụng cho mọi địa điểm trên toàn quốc</li>
                  <li>Áp dụng bảo hành 2 tháng trong toàn quốc</li>
                </ul>
              </div>
              <div className="mt-1 ">
                <button
                  onClick={() => {
                    const productId = productMain?._id;

                    console.log("««««« items »»»»»", items);
                    const productExists = items.some(
                      (item: any) => item.product._id === productId
                    );
                    console.log("««««« productExists »»»»»", productExists);
                    if (productExists === true) {
                      increase(productId);
                      message.success("Thêm 1 sản phẩm vào giỏ hàng!", 1.5);
                    } else {
                      add({ product: product, quantity: 1 });
                      message.success("Đã thêm sản phẩm vào giỏ hàng!", 1.5);
                    }
                  }}
                  className="w-100  border-bottom border-dark  rounded bg-gradient text-light"
                  style={{ background: "#AD2A36", height: "35px" }}
                >
                  <b>Đặt hàng ngay</b>
                </button>
              </div>
              <div className="w-100  d-flex ">
                <div className="mt-2 ">
                  <PhoneOutlined />
                </div>
                <p className={`${Style.guide__tilte}`}>
                  Liên hệ 1800 000 để được tư vấn miễn phí và các thông tin
                  khuyến mãi
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="  d-flex justify-content-center">
          <div className="w-75">
            <Collapse size="small">
              <Panel header="Thông số và mô tả sản phẩm" key="1">
                <p>{product.description}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75">
            <Collapse size="small">
              <Panel header="Bình luận" key="1">
                <div className={Style.scroll__bar}>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          key={`${item._id}-${index}`}
                          title={
                            <div>
                              <span style={{ marginRight: "10px" }}>
                                {item.customer.firstName}
                              </span>
                              <Rate allowHalf defaultValue={item.rateNumber} />
                            </div>
                          }
                          description={item.customer.comment}
                        />
                      </List.Item>
                    )}
                  />
                </div>
                <hr style={{ width: "100%" }} />
                {/* ////////////////////////////////////////// */}
                {auth && (
                  <>
                    <Form
                      form={commentForm}
                      name="commentForm"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}
                      onFinish={onFinish}
                      autoComplete="off"
                      className={Style.comment}
                    >
                      <Form.Item
                        label={"Đánh giá"}
                        name="rateNumber"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập đánh giá!",
                          },
                        ]}
                      >
                        <Rate />
                      </Form.Item>
                      <Form.Item
                        label={"Bình luận"}
                        name="comment"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập bình luận!",
                          },
                        ]}
                      >
                        <TextArea showCount maxLength={100} />
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                )}

                {/* //////////////////////////////////////////////////// */}
              </Panel>
            </Collapse>
          </div>
        </div>
        <Divider>
          <h3>Sản phẩm yêu thích </h3>
        </Divider>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(208,206,191,1) 19%, rgba(222,221,202,1) 56%, rgba(160,167,151,1) 86%)",
          }}
        >
          <div className="container">
            <Topmoth />
          </div>
        </div>
        <Divider>
          <h3>Sản phẩm yêu thích </h3>
        </Divider>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(208,206,191,1) 19%, rgba(222,221,202,1) 56%, rgba(160,167,151,1) 86%)",
          }}
        >
          <div className="container">
            <Hotdeal />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await axios
    .get(`${URL_ENV}/products?active=true`)
    .then((response) => {
      return response.data;
    });

  // console.log(products);

  const paths = products?.results?.map((items: any) => ({
    params: { id: `${items._id}` },
  }));

  // { fallback: false } means other routes should 404
  // console.log("listpaths:", paths);
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const productParams = params;
  const product = await axios
    .get(`${URL_ENV}/products/${params.id}`)
    .then((response) => {
      return response.data;
    });

  const allProduct = await axios
    .get(`${URL_ENV}/products?active=true`)
    .then((response) => {
      return response.data;
    });

  // Pass post data to the page via props
  return {
    props: {
      product: product,
      allProduct: allProduct,
      productParams: productParams,
    },
  };
}
