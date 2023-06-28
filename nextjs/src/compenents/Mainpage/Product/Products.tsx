import { StarOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Divider, Rate, Image, Row } from "antd";
import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

type Props = {};

const Products = (props: Props) => {
  const [hotDeals, setHotDeals] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL_ENV}/products?active=true&&limit=8&&fromDiscount=3`
        );
        const data = response.data.results;
        setHotDeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container text-center">
      <Row gutter={[24, 24]}>
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <Col key={`${item._id}-${index + 1}`} sm={24} md={12} lg={6}>
              <SwiperSlide
                onClick={() => {
                  router.push(`/products/${item._id}`);
                }}
              >
                <Badge.Ribbon text={item.discount > 5 ? "Giảm giá " : ""}>
                  <Card
                    className="border rounded-4"
                    bordered={false}
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <Card
                      className="border rounded-4 text-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    >
                      <Image
                        preview={false}
                        alt={item.name}
                        src={`${URL_ENV}/${item.imageUrl}`}
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
                        windowWidth < 1400 ? "text-truncate" : ""
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
                    <div className="d-flex justify-content-between">
                      {" "}
                      <div className="text-start  ">
                        <StarOutlined style={{ color: "#FFC107" }} /> (
                        {Math.round(item.averageRate * 2) / 2})
                      </div>
                      <div className="text-end">{item.amountSold} Đã bán</div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </SwiperSlide>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Products;
