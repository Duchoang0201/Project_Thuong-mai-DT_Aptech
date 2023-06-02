import { useAuthStore } from "@/hook/useAuthStore";
import numeral from "numeral";

import {
  DeleteOutlined,
  RestOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {};

const AccountOrders = (props: Props) => {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const { auth }: any = useAuthStore((state: any) => state);
  const [userOrders, setUserOrders] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [refresh, setRefresh] = useState(0);
  //TableLoading

  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTable(false);
    }, 1000); // 5000 milliseconds = 5 seconds
  }, []);

  useEffect(() => {
    // Check if the selected order exists in the updated dataResource
    const updatedSelectedOrder = userOrders?.find(
      (order: any) => order.id === selectedOrder?.id
    );
    setSelectedOrder(updatedSelectedOrder || null);
  }, [selectedOrder?.id, userOrders]);

  useEffect(() => {
    axios
      .get(`${URL_ENV}/orders/personal/${auth?.payload?._id}`)
      .then((res) => {
        setUserOrders(res.data.results);
      });
  }, [URL_ENV, auth, refresh]);

  const ordersColumn = [
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product.name",
      key: "product.name",
      render: (text: any, record: any) => {
        return <strong>{record?.product?.name}</strong>;
      },
    },
    {
      title: "Giá",
      dataIndex: "product.price",
      key: "product.price",
      render: (text: any, record: any) => {
        return (
          <div>
            {(record?.product?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "product.discount",
      key: "product.discount",
      render: (text: any, record: any) => {
        return <div>{numeral(record?.product?.discount).format("0,0")}%</div>;
      },
    },
  ];

  const columns: any = [
    {
      width: "7%",

      title: "No",
      dataIndex: "numberOrder",
      key: "numberOrder",
      render: (text: any, record: any, index: number) => <div>{index + 1}</div>,
    },
    {
      width: "10%",

      title: "Phương thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
      responsive: ["lg"],
    },
    {
      width: "7%",
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => {
        return text === "WAITING" ? (
          <div className="text-primary">{text}</div>
        ) : (
          <div className="text-danger">{text}</div>
        );
      },
      responsive: ["lg"],
    },
    {
      width: "20%",

      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      responsive: ["md"],
    },
    {
      width: "10%",
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (text: any, record: any) => {
        const { orderDetails } = record;

        let total = 0;
        orderDetails.forEach((od: any) => {
          let sum = od.quantity * od.product.total;
          total = total + sum;
        });
        total = Number(total.toFixed(2));
        return (
          <strong>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
        );
      },
      responsive: ["md"],
    },
    {
      width: "7%",

      title: "Chi tiết đơn hàng",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (text: any, record: any) => {
        return (
          <Space className="text-end">
            <Button
              onClick={() => {
                setSelectedOrder(record);
              }}
              shape="circle"
              icon={<SearchOutlined />}
            />
            <Popconfirm
              okText="Delete"
              okType="danger"
              onConfirm={async () => {
                console.log(record._id);

                const handleChangeStock: any = await axios
                  .post(`${URL_ENV}/products/orderm/${record._id}/stock`)
                  .then((response) => {
                    console.log(response.data.message);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                if (handleChangeStock.data) {
                  await axios
                    .patch(`${URL_ENV}/orders/${record._id}`, {
                      status: "CANCELED",
                    })
                    .then((res) =>
                      setTimeout(() => {
                        setRefresh((f) => f + 1);
                      }, 2000)
                    )
                    .catch((err) => {
                      console.log("««««« err »»»»»", err);
                    });
                } else {
                  message.error(`SYSTEM ERROR !!!`);
                }
              }}
              title={"Bạn chắc chắn sẽ hủy đơn hàng?"}
            >
              <Button danger icon={<RestOutlined />}></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <div className="container rounded-end-circle ">
        <Table
          scroll={{ y: 400 }}
          loading={loadingTable}
          rowKey={"_id"}
          dataSource={userOrders}
          columns={columns}
          pagination={false}
        />
      </div>
      <Modal
        width={"100%"}
        onCancel={() => {
          setSelectedOrder(null);
        }}
        onOk={() => {
          setSelectedOrder(null);
        }}
        open={selectedOrder}
      >
        <Col>
          {selectedOrder && (
            <Card title="Order Detail">
              <div>
                {/* Description of order */}
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Trạng thái">
                    {selectedOrder.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ giao hàng">
                    {selectedOrder.shippingAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Khách hàng">
                    {selectedOrder.customer?.firstName}{" "}
                    {selectedOrder.customer?.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nhân viên">
                    {selectedOrder.employee?.firstName}{" "}
                    {selectedOrder.employee?.lastName}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />

                {/* Table include product of orderDetails */}
                <Table
                  rowKey="_id"
                  dataSource={selectedOrder.orderDetails}
                  columns={ordersColumn}
                  pagination={false}
                />
              </div>
            </Card>
          )}
        </Col>
      </Modal>
    </div>
  );
};

export default AccountOrders;
