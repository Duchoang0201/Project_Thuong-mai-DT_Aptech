import numeral from "numeral";

import { RestOutlined, SearchOutlined } from "@ant-design/icons";
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
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { axiosClient } from "@/libraries/axiosConfig";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/libraries/axiosAuth";

type Props = {};

const AccountOrders = (props: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const axiosAuth = useAxiosAuth();
  const [userOrders, setUserOrders] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  //TableLoading

  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    // Check if the selected order exists in the updated dataResource
    const updatedSelectedOrder = userOrders?.find(
      (order: any) => order.id === selectedOrder?.id
    );
    setSelectedOrder(updatedSelectedOrder || null);
  }, [selectedOrder?.id, userOrders]);

  useEffect(() => {
    if (user) {
      axiosAuth.get(`/orders/personal/${user?._id}`).then((res) => {
        setUserOrders(res.data.results);
        setLoadingTable(false);
      });
    }
  }, [axiosAuth, user, user?._id]);

  const ordersColumn = [
    {
      width: "10%",
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      width: "30%",

      title: "Tên sản phẩm",
      dataIndex: "product.name",
      key: "product.name",
      render: (text: any, record: any) => {
        return <strong>{record?.product?.name}</strong>;
      },
    },
    {
      width: "10%",

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
      width: "10%",

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
      width: "8%",
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: any) => {
        return text === "WAITING" ? (
          <div className="">{text}</div>
        ) : text === "ECONFIRMED" ? (
          <div className="text-primary">{text}</div>
        ) : text === "COMPLETED" ? (
          <div className="text-success">{text}</div>
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
              type="dashed"
              onClick={() => {
                setSelectedOrder(record);
              }}
              shape="circle"
              icon={<SearchOutlined />}
            />
            {(record.status === "WAITING" ||
              record.status === "ECONFIRMED") && (
              <>
                <Popconfirm
                  okText="Delete"
                  okType="danger"
                  onConfirm={async () => {
                    const handleCanceled: any = await axiosClient.patch(
                      `/orders/${record._id}`,
                      {
                        status: "CANCELED",
                      }
                    );

                    if (handleCanceled?.data?._id) {
                      await axiosClient
                        .post(`/products/orderm/${record._id}/stock`)
                        .then((response) => {})
                        .catch((error) => {
                          console.error(error);
                        });
                    } else {
                      message.error(`SYSTEM ERROR !!!`);
                    }
                  }}
                  title={"Bạn chắc chắn sẽ hủy đơn hàng?"}
                >
                  <Button type="dashed" danger icon={<RestOutlined />}></Button>
                </Popconfirm>
              </>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <div className="container rounded-end-circle ">
        <Table
          scroll={{ x: true, y: 400 }}
          loading={loadingTable}
          rowKey={"_id"}
          dataSource={userOrders}
          columns={columns}
          pagination={false}
        />
      </div>
      <Modal
        okType="dashed"
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
                  <Descriptions.Item label="Mã đơn hàng">
                    {selectedOrder._id}
                  </Descriptions.Item>
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
                  scroll={{ x: "max-content", y: "max-content" }}
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
