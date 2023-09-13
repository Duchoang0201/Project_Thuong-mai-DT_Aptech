import { API_URL } from "@/contants/URLS";
import { useCartStore } from "@/hook/useCountStore";
import { axiosClient } from "@/libraries/axiosConfig";
import { Button, Form, Input, Rate, message } from "antd";
import axios from "axios";
import { Image } from "antd";
import router from "next/router";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";

type Props = {
  product: any;
};
const ProductDetails = ({ product }: Props) => {
  const { data: session } = useSession();

  const user = session?.user;
  const {
    add,
    items: itemsCart,
    increase,
  } = useCartStore((state: any) => state);

  const [commentForm] = Form.useForm();

  const handlePostComent = async (record: any) => {
    const customer = {
      imageUrl: user?.imageUrl,
      customerId: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      comment: record.comment,
    };
    const response = await axiosClient.get(`/products/${product._id}`);
    const updateData = response.data;

    if (response.data.rateInfo) {
      updateData.rateInfo.push({
        customer: customer,
        rateNumber: record.rateNumber,
        createdAt: new Date(),
      });
    } else {
      updateData.rateInfo = [];
      updateData.rateInfo.push({
        customer: customer,
        rateNumber: record.rateNumber,
        createdAt: new Date(),
      });
    }

    axiosClient
      .patch(`/products/${product._id}`, {
        rateInfo: updateData.rateInfo,
      })
      .then((res) => {
        commentForm.resetFields();
        message.success({
          content: "Cảm ơn quý khách đã đánh giá sản phẩm của chúng tôi",
          style: { marginTop: 150 },
          duration: 1.5,
        });
        // setRefresh((f: any) => f + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="py-10 font-poppins ">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden  ">
                <div className="relative mb-6 lg:mb-10 lg:h-96 ">
                  <Image
                    className="object-contain w-full lg:h-full"
                    src={`${API_URL}${product.imageUrl}`}
                    alt="asd"
                    width={"80%"}
                  />
                </div>
                <div className="flex-wrap hidden -mx-2 md:flex py-2">
                  {product?.images?.map((item: any, index: number) => (
                    <div
                      key={`${item}-${index}`}
                      className="w-1/2 p-2 sm:w-1/4"
                    >
                      <a className="block border border-gray-200  dark:border-gray-700 ">
                        <Image
                          className="object-contain w-full lg:h-28"
                          src={`${API_URL}/${item}`}
                          alt=""
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <span className="px-2.5 py-0.5 text-xs text-red-600 bg-red-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                    Thông tin sản phẩm:
                  </span>
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-950 md:text-2xl ">
                    {product.name}
                  </h2>
                  <div className="flex flex-wrap items-center ">
                    Mã sản phẩm: {product._id}
                  </div>
                  <div className="flex flex-wrap items-center mb-6">
                    <Rate disabled value={product?.averageRate} />
                  </div>
                  <div className="flex flex-wrap items-center mb-6">
                    Còn hàng
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>
                      {" "}
                      {product?.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      {(product?.price + 5000000).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Thông tin:
                  </h2>
                  <p className="mt-2 text-sm text-red-500 dark:text-red-200">
                    {product.description}
                    <p className="text-gray-600 dark:text-gray-400">
                      Most customers receive within 3-31 days.
                    </p>
                  </p>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <span className="text-base text-gray-600 dark:text-gray-400">
                    {product.stock} items In Stock
                  </span>
                </div>
                <div className="mb-6 "></div>
                <div className="flex flex-wrap items-center mb-6">
                  <button
                    onClick={() => {
                      if (user === null) {
                        router.push("/login");
                        message.warning(
                          "Vui lòng đăng nhập để thêm vào giỏ hàng!!",
                          1.5
                        );
                      } else {
                        const productId = product._id;
                        const productExists = itemsCart.some(
                          (item: any) => item.product._id === productId
                        );

                        if (productExists === true) {
                          increase(productId);
                          message.success(
                            {
                              content: "Thêm 1 sản phẩm vào giỏ hàng!",
                              style: {
                                marginTop: 150,
                              },
                            },
                            1.5
                          );
                        } else {
                          add({ product: product, quantity: 1 });
                          message.success(
                            {
                              content: "Đã thêm sản phẩm vào giỏ hàng!",
                              style: {
                                paddingTop: 150,
                              },
                            },
                            1.5
                          );
                        }
                      }
                    }}
                    type="button"
                    className="w-full px-4 py-3 text-center text-red-600 bg-red-100 border border-red-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-red-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Review
            </h2>
          </div>
          {user && (
            <Form
              form={commentForm}
              name="commentForm"
              // labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              onFinish={handlePostComent}
              autoComplete="off"
              // className="mb-6"
            >
              <Form.Item
                className="py-2 px-4 w-96 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-200 dark:border-gray-700"
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
                className="py-2 px-4  w-96 text-sm rounded-lg text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-200"
                name="comment"
                label={"Bình luận"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập bình luận!",
                  },
                ]}
              >
                <Input className="w-max" showCount maxLength={100} />
              </Form.Item>
              <Button
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                htmlType="submit"
              >
                Post comment
              </Button>
            </Form>
          )}

          {product?.rateInfo?.map((item: any, index: any) => (
            <article
              key={`${item._id}-${index}`}
              className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <Image
                      className="mr-2 w-6 h-6 rounded-full"
                      // src={`${API_URL}/${item.customer.}`}
                      alt={item.customer._id}
                    />
                    {item.customer.firstName} {item.customer.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime="2022-02-08" title="February 8th, 2022">
                      {item?.createdAt}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="">
                <Rate disabled value={item?.rateNumber} />
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {item.customer.comment}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const results = await axiosClient.get(`/products?active=true`);
  const products = results.data.results;
  const paths = products.map((item: any) => ({
    params: { id: item._id },
  }));

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  const results = await axiosClient.get(`/products/${params.id}`);
  const product = results.data;
  // Pass post data to the page via props
  return { props: { product } };
}
