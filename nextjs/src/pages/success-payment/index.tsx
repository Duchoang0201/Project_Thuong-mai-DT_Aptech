import React from "react";
import { Button, Result } from "antd";
import router from "next/router";

type Props = {};

const CheckoutPayment = (props: Props) => {
  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              router.push("/");
            }}
          >
            Trở về trang chủ
          </Button>,
        ]}
      />
    </>
  );
};

export default CheckoutPayment;
