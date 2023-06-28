import React from "react";
import { Button, Result } from "antd";
import router from "next/router";
import { useSaveOrderId } from "@/hook/useSaveOrderId";

type Props = {};

const CheckoutPayment = (props: Props) => {
  const { orderId } = useSaveOrderId((state: any) => state);
  return (
    <>
      <Result
        status="success"
        title="Cảm ơn quý khách đã mua hàng, đơn hàng thành công đang trong giai đoạn xử lý!"
        subTitle={`Order number: ${orderId} Cloud server configuration takes 1-5 minutes, please wait.`}
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
