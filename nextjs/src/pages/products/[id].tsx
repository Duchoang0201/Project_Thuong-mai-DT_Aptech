import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Rate, Collapse, Mentions, Input, Button, message } from "antd";
import Style from "./index.module.css";
import { PhoneFilled, PhoneOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";

const { Panel } = Collapse;
const { getMentions } = Mentions;
const { TextArea } = Input;
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Navigation } from "swiper";
import { useCartStore } from "@/hook/useCountStore";
// import { Route } from "react-router-dom";

type Props = {
  product: any;
  allProduct: any;
};

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function ProductDetails({ product, allProduct }: Props) {
  const { add, items, increase } = useCartStore((state: any) => state);

  // console.log("product tim thay: ", product);
  const [visible, setVisible] = useState(false);
  const [picture, setPicture] = useState<any>();
  // const [rating, setRating] = useState<number>();
  const router = useRouter();

  const handleImageClick = (items: any) => {
    console.log("click");
    setVisible(true);
    setPicture(items);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const handlePageId = (path: any, rateInfor: any) => {
    router.push(path);
  };

  return (
    <>
      <div className="container d-flex-column justify-content-center">
        <div className=" w-75" style={{ margin: "0px 12%" }}>
          <div className=" d-flex flex-lg-row justify-content-center flex-column ">
            <div
              className="p-5 bd-highlight d-flex flex-column"
              style={{ background: "#fcfcfc" }}
            >
              <div>
                <Image
                  src={`${URL_ENV}/${product.imageUrl}`}
                  alt="Description of the image"
                  width={200}
                  height={200}
                  className="w-100 img-fluid"
                ></Image>
              </div>

              <div
                className="d-flex flex-row  mt-2"
                style={{ width: "200px", height: "100px" }}
              >
                <Swiper
                  modules={[Navigation]}
                  className="mySwiper"
                  navigation={true}
                  slidesPerView={2}
                  spaceBetween={30}
                  // modules={[Pagination]}
                >
                  {product?.images?.map((items: any, index: any) => {
                    if (index <= 20)
                      return (
                        <>
                          <SwiperSlide className="m-3 w-25">
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
              <h3 className="fs-5">{product.name}</h3>
              <div className={Style.rating}>
                {" "}
                <Rate allowHalf defaultValue={product.averageRate} />
                <span className={`${Style.ratingNumber}`}>
                  ({product?.rateInfor?.length})
                </span>
              </div>
              <div className="d-sm-flex justify-content-between d-inline-block ">
                <p>
                  Mã: <span className="fs-6">{product.categoryId}</span>
                </p>
                <p>... đã bán</p>
              </div>

              <div>
                <span className="fs-4">{product.price}đ</span>
              </div>
              <div>
                <b>{product.active === true ? "Còn hàng" : "Hết hàng"}</b>
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
                    if (
                      !items.some((i: any) => i.product._id === product._id)
                    ) {
                      add({ product: product, quantity: 1 });
                      message.success(
                        "Thêm sản phẩm vào giỏ hàng thành công",
                        1.5
                      );
                    } else {
                      increase(product._id);
                      message.success(
                        "Đã thêm 1 sản phẩm vào giỏ hàng thành công, ",
                        1.5
                      );
                    }
                  }}
                  className="w-100  border-bottom border-dark  rounded bg-danger bg-gradient text-light"
                >
                  <b>Đặt hàng ngay</b>
                </button>
              </div>
              <div className="w-75 ms-5 d-flex">
                <div className="">
                  <PhoneOutlined />
                </div>
                <p className="text-center  fw-bolder mt-1">
                  Liên hệ 1800 000 để được tư vấn miễn phí và các thông tin
                  khuyến mãi
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <Collapse size="large">
            <Panel header="Thông số và mô tả sản phẩm" key="1">
              <p>{product.description}</p>
            </Panel>
          </Collapse>
        </div>
        <div>
          <Collapse size="large">
            <Panel header="Bình luận" key="1">
              <TextArea showCount maxLength={100} />
              <Button className="m-2" type="primary">
                Submit
              </Button>
            </Panel>
          </Collapse>
        </div>

        <div className="d-none d-sm-block">
          <p className="fs-4 "> Sản phẩm được yêu thích</p>
          <div className=" m-5 d-flex justify-content-center ">
            {allProduct?.results?.map((items: any, index: any) => {
              if (index <= 3)
                return (
                  <div
                    key={index}
                    className={`m-2 d-flex-column justify-content-center w-25 ${Style.items}`}
                  >
                    <div className="">
                      <Image
                        src={`${URL_ENV}/${items.imageUrl}`}
                        alt="Description of the image"
                        width={200}
                        height={200}
                        className="w-100 rounded "
                        onClick={() =>
                          handlePageId(
                            `/products/${items._id}`,
                            items.rateInfor
                          )
                        }
                      ></Image>
                    </div>
                    <div>
                      <p
                        style={{ color: "blue" }}
                        className="fs-6 primary ps-1"
                      >
                        {" "}
                        {items.name}
                      </p>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        <div className=" ms-3 pt-5 ">
          <p className="fs-4">Các sản phẩm khác</p>
          <div className="h-50">
            <Swiper
              modules={[Navigation]}
              className="mySwiper"
              navigation={true}
              slidesPerView={3}
              spaceBetween={30}
              pagination={{ clickable: true }}
            >
              {allProduct?.results?.map((items: any, index: any) => {
                if (index <= 20)
                  return (
                    <>
                      <SwiperSlide className="m-3 w-25">
                        <Image
                          src={`${URL_ENV}/${items.imageUrl}`}
                          alt="Description of the image"
                          width={200}
                          height={200}
                          className="w-100 "
                          onClick={() =>
                            handlePageId(
                              `/products/${items._id}`,
                              items.rateInfor
                            )
                          }
                          style={{ maxHeight: "180px", minHeight: "80px" }}
                        ></Image>
                        <p className="fs-6">{items.name}</p>
                      </SwiperSlide>
                      <div className="swiper-button-prev">k</div>
                      <div className="swiper-button-next">d</div>
                    </>
                  );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await axios
    .get("http://localhost:9000/products")
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
  const product = await axios
    .get(`${URL_ENV}/products/${params.id}`)
    .then((response) => {
      return response.data;
    });

  const allProduct = await axios.get(`${URL_ENV}/products`).then((response) => {
    return response.data;
  });

  // Pass post data to the page via props
  return { props: { product: product, allProduct: allProduct } };
}
