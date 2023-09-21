import { API_URL } from "@/contants/URLS";
import { StarOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Row } from "antd";
import Aos from "aos";
import Image from "next/image";
import router from "next/router";
import React, { useEffect, useState } from "react";

const Products = ({ products }: any) => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="container text-center">
      <Row gutter={[24, 24]}>
        {products?.length > 0 &&
          products?.map((item: any, index: any) => {
            return (
              <Col
                data-aos="fade-up"
                data-aos-duration={1000}
                key={`${item._id}-${index + 1}`}
                sm={24}
                md={12}
                lg={6}
              >
                <div
                  onClick={() => {
                    router.push(`/products/${item._id}`);
                  }}
                >
                  <Badge.Ribbon text={item.discount > 5 ? "Giảm giá " : ""}>
                    <Card
                      className="border rounded-4 cursor-pointer"
                      bordered={false}
                      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                    >
                      <Card
                        className="border rounded-4 text-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                      >
                        <Image
                          width={400}
                          height={400}
                          alt={item.name}
                          src={`${API_URL}/${item.imageUrl}`}
                          style={{
                            width: "100%",
                            transition: " 0.5s ",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </Card>
                      <div
                        style={{ height: 40 }}
                        className={`text-center ${
                          windowWidth < 1400 ? "truncate" : ""
                        }`}
                      >
                        {item.name}
                      </div>
                      <div
                        className="text-center py-4"
                        style={{ color: "#c48c46" }}
                      >
                        <strong>
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <div className="text-start  ">
                          <StarOutlined style={{ color: "#FFC107" }} /> (
                          {Math.round(item.averageRate * 2) / 2})
                        </div>
                        <div className="text-end">{item.amountSold} Đã bán</div>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Products;
