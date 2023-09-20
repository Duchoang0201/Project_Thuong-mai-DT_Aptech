import React, { useEffect } from "react";
import { Button, Card, Col, Row, Space, Statistic } from "antd";
import Image from "next/image";

import { API_URL } from "@/contants/URLS";
import Aos from "aos";
const CheckoutMethod = ({ dataMethod }: any) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="container mx-auto">
      {" "}
      <Row className="py-3 ">
        {dataMethod?.map((item: any, index: any) => (
          <Col
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration={500 * index}
            style={{ width: "90%" }}
            key={`${item._id}-${index + 1}`}
            xs={24}
            xl={8}
          >
            {" "}
            <Card className="border mx-4 ">
              <div className="flex justify-between">
                <div className="content">
                  {" "}
                  <Space>
                    <Statistic title={item.title} value={item.summary} />
                  </Space>
                </div>
                <Button
                  icon={
                    <Image
                      className="ml-1"
                      alt={item.title}
                      src={`${API_URL}${item.imageUrl}`}
                      width={50}
                      height={50}
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
      </Row>
    </div>
  );
};

export default CheckoutMethod;
