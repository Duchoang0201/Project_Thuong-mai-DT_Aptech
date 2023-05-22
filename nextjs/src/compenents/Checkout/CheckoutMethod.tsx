import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Row, Space, Statistic } from "antd";

import Image from "next/image";
import axios from "axios";
type Props = {};
const CheckoutMethod = (props: Props) => {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const [methodPay, setMethodPay] = useState<any>();
  useEffect(() => {
    axios.get(`${URL_ENV}/features`).then((res) => {
      setMethodPay(res.data.results);
    });
  }, [URL_ENV]);

  return (
    <div>
      {" "}
      <h3 className=" py-2 text-center">Thủ tục thanh toán</h3>
      <Divider orientation="left"> Phương thức thanh toán cho phép</Divider>
      <Row className="py-3 ">
        {methodPay?.map((item: any) => (
          <Col style={{ width: "90%" }} key={item._id} xs={24} xl={8}>
            {" "}
            <Card className="border border-primary" style={{ width: "90%" }}>
              <div className="d-flex justify-content-between">
                <div className="content">
                  {" "}
                  <Space>
                    <Statistic title={item.title} value={item.summary} />
                  </Space>
                </div>
                <Button
                  icon={
                    <Image
                      alt={item.title}
                      src={`${URL_ENV}${item.imageUrl}`}
                      width={50}
                      height={50}
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  }
                  style={{
                    height: 60,
                    width: 60,
                  }}
                />
              </div>
            </Card>
          </Col>
        ))}

        {/* <Col xs={24} xl={8}>
          {" "}
          <Card className="border border-primary" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between">
              <div className="content">
                {" "}
                <Space>
                  <Statistic title="Tiền mặt" value={"Thanh toán đơn giản"} />
                </Space>
              </div>
              <Button
                icon={
                  <Image
                    alt=""
                    src=""
                    style={{ fontSize: "24px", color: "white" }}
                  />
                }
                style={{ height: 60, width: 60, backgroundColor: "#1890ff" }}
              />
            </div>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default CheckoutMethod;
