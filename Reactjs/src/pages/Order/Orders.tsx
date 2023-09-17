import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RestOutlined,
  SearchOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
  Card,
  Image,
  Input,
} from "antd";
import { axiosClient } from "../../libraries/axiosClient";
import { useEffect, useRef, useState } from "react";
import Search from "antd/es/input/Search";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { handleCustomData } from "../../util/handleCustomData";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { functionValidate } from "../../validation/FunctionValidate";
import { customeDataValidate } from "../../validation/customDataValidate";
import { API_URL } from "../../constants/URLS";
import ProductForm from "../Form/ProductForm";
import axios from "axios";
dayjs.extend(customParseFormat);
function OrderCRUD() {
  const customizeData: any = {
    collection: "orders",
  };

  const [files, setFiles] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const timeoutSucess = useRef<any>();
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { auth } = useAuthStore((state: any) => state);

  const [openCreate, setOpenCreate] = useState(false);

  // Modal open Update:
  const [open, setOpen] = useState(false);
  const [openDetailPicture, setOpenDetailPicture] = useState(false);

  const [updateId, setUpdateId] = useState<any>();

  const onSearchItem = async (record: any) => {
    searchParams.set("limit", "10");
    searchParams.set("skip", "0");
    try {
      if (record.type && record.value) {
        searchParams.set(record.type, record.value);

        const res = await customeDataValidate({
          collection: "Product",
          searchParams,
        });

        const result: any = await functionValidate(res);

        if (result.oke) {
          await refetch();
        } else {
          message.error(result.message);
          searchParams.delete(record.type);
        }
      } else if (
        record.type &&
        (record.value === "" ||
          record.value === undefined ||
          record.value === null)
      ) {
        searchParams.delete(record.type);
        await refetch();
      }
      setCurrentPage(1);
    } catch (error: any) {
      message.error(error.message || error.reponse.data.message);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const slideCurrent = (value: any) => {
    const skipValue = (value - 1) * 10;
    searchParams.set("skip", skipValue.toString());
    refetch();
  };

  /// GET orders
  const {
    data: ordersData,
    isFetching,

    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getorders", files],
    queryFn: () => {
      return axiosClient.get(`/orders?${searchParams.toString()}`);
    },
    onError: (err: any) => {},
    retry: false,
  });

  //GET CATEGORIES
  const { data: categoriesData } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => {
      return axiosClient.get(`/categories`);
    },
    onError: (err: any) => {},
    retry: false,
  });
  //GET SUPPLIERS
  const { data: suppliersData } = useQuery({
    queryKey: ["getSuppliers"],
    queryFn: () => {
      return axiosClient.get(`/suppliers`);
    },
    onError: (err: any) => {},
    retry: false,
  });

  const { mutate, isLoading: isMutating } = useMutation(handleCustomData, {
    onSuccess: (data) => {
      if (timeoutSucess.current) {
        clearTimeout(timeoutSucess.current);
      }
      timeoutSucess.current = setTimeout(() => {
        refetch();
      }, 500);
    },
    onSettled(data: any) {
      if (data.ok) {
        message.success("Created Customer Sucessfully!!");
        refetch();
      }
      if (data.response?.data?.message) {
        message.error(data.response?.data?.message);
      }
    },
  });

  //Create data
  const handleCreate = async (record: any) => {
    delete record._id;
    record.createdBy = {
      employeeId: auth.payload._id,
      firstName: auth.payload.firstName,
      lastName: auth.payload.lastName,
    };
    record.isDeleted = false;
    record.createdDate = new Date().toISOString();
    if (record.active === undefined) {
      record.active = false;
    }

    customizeData.type = "CREATE";

    customizeData.data = record;
    mutate(customizeData);

    setOpenCreate(false);
    createForm.resetFields();
  };
  //Delete a Data
  const handleDelete = (record: any) => {
    customizeData.type = "DELETE";
    customizeData.id = record._id;
    mutate(customizeData);
  };
  //Update a Data
  const handleUpdate = (record: any) => {
    record.updatedBy = {
      employeeId: auth.payload._id,
      firstName: auth.payload.firstName,
      lastName: auth.payload.lastName,
    };
    record.updatedDate = new Date().toISOString();
    if (record.active === undefined) {
      record.active = false;
    }
    if (record.isDeleted === undefined) {
      record.isDeleted = false;
    }
    customizeData.type = "PATCH";
    customizeData.id = record._id;
    customizeData.data = record;
    mutate(customizeData);
    setOpen(false);
  };

  //Setting column
  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
      render: (text: any, record: any) => {
        return <strong>{record._id}</strong>;
      },
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Input.Search
              allowClear
              placeholder="Enter Order Id"
              onSearch={(e) => {
                const searchValue = { type: "orderId", value: e };
                onSearchItem(searchValue);
              }}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text: any, record: any) => {
        return (
          <>
            {record.customer?.firstName} {record.customer?.lastName}
          </>
        );
      },
      filterDropdown: () => {
        return (
          <div style={{ width: "150px" }}>
            <Search
              allowClear
              style={{ width: "100%" }}
              placeholder="Select one"
              onSearch={(e) => {
                const searchValue = { type: "firstName", value: e };
                onSearchItem(searchValue);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentType",
      key: "paymentType",
      filterDropdown: () => {
        return (
          <div style={{ width: "150px" }}>
            <Select
              allowClear
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a product"
              optionFilterProp="children"
              onChange={(e) => {
                const searchValue = { type: "methodPay", value: e };
                onSearchItem(searchValue);
              }}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={[
                { label: "CASH", value: "CASH" },
                { label: "MOMO", value: "MOMO" },
                { label: "VNPAY", value: "VNPAY" },
              ]}
            />
          </div>
        );
      },
    },
    {
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
      filterDropdown: () => {
        return (
          <div style={{ width: "150px" }}>
            <Select
              allowClear
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a product"
              optionFilterProp="children"
              onChange={(e) => {
                const searchValue = { type: "status", value: e };
                onSearchItem(searchValue);
              }}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={[
                { label: "WAITING", value: "WAITING" },
                { label: "ECONFIRMED", value: "ECONFIRMED" },
                { label: "COMPLETED", value: "COMPLETED" },
                { label: "CANCELED", value: "CANCELED" },
              ]}
            />
          </div>
        );
      },
    },
    {
      width: "20%",
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },

    {
      width: "10%",

      title: "Nhân viên",
      dataIndex: "employee",
      key: "employee",
      render: (text: any, record: any) => {
        return (
          <strong>
            {record.employee?.firstName} {record.employee?.lastName}
          </strong>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (text: any, record: any) => {
        const { orderDetails } = record;

        let total = 0;
        orderDetails?.forEach((od: any) => {
          let sum = od.quantity * od.product?.total;
          total = total + sum;
        });

        return (
          <strong>
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </strong>
        );
      },
    },

    //Function
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
      render: (text: any, record: any, index: any) => {
        return (
          <Space>
            <Button
              onClick={() => {
                // setSelectedOrder(record);
                // setComponentDisabled(true);
              }}
              shape="circle"
              icon={<SearchOutlined />}
            />
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
                    .post(`/orders/orderm/${record._id}/stock`)
                    .then((response) => {
                      setTimeout(() => {
                        // setRefresh((f) => f + 1);
                        refetch();

                        message.success("Hủy đơn hàng thành công !!", 1.5);
                      }, 2000);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  message.error(`SYSTEM ERROR !!!`);
                }
              }}
              title={"Bạn chắc chắn sẽ hủy đơn hàng?"}
            >
              <Button danger icon={<RestOutlined />}></Button>
            </Popconfirm>
            {record.status === "WAITING" && (
              <Popconfirm
                okText="Confirm"
                okType="danger"
                title={"Are you sure to Confirm it?"}
                onConfirm={async () => {
                  const res = await axiosClient.patch(`/orders/${record._id}`, {
                    status: "ECONFIRMED",
                  });
                  if (res?.data?._id) {
                    message.success(`CONFIRM ORDER'S SUCESSFULLY`);
                    // setRefresh((f) => f + 1);
                    refetch();
                  } else {
                    message.error(`SYSTEM ERROR !!!`);
                  }
                }}
              >
                <Button danger icon={<SendOutlined />}></Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];
  // KEEP UPDATE ID:

  useEffect(() => {
    // Check if the selected order exists in the updated dataResource
    const updatedSelectedOrder = ordersData?.data?.results.find(
      (product: any) => product._id === updateId?._id
    );
    setUpdateId(updatedSelectedOrder || null);
  }, [ordersData?.data?.results, updateId?._id]);

  // const [fileData, setFileData] = useState<any>({});

  const handleFileUpload = async ({ file }: any) => {
    const loadingMessage = message.loading("Uploading !!", 0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_URL}/upload/orders/${updateId?._id}/images`,
        formData
      );

      await refetch();
      loadingMessage();
      message.success("Upload Successful", 1.5);
      // You can add further logic to handle the success, such as updating UI or state.
    } catch (error) {
      // Handle any errors here
      console.error("Upload Error", error);
      message.error("Upload Error", 1.5);

      // You can add further logic to handle the error, such as displaying an error message.
    }
  };

  return (
    <div>
      <Modal
        title="Create Customer"
        open={openCreate}
        onCancel={() => {
          setOpenCreate(false);
        }}
        onOk={() => {
          createForm.submit();
        }}
        okType="dashed"
        okText="Submit"
      >
        <Form form={createForm} name="createForm" onFinish={handleCreate}>
          <ProductForm
            props={{
              categoriesData: categoriesData?.data?.results,
              suppliersData: suppliersData?.data?.results,
            }}
          />
          <Form.Item
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 16,
            }}
            label="Hình minh họa"
            name="file"
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              showUploadList={true}
              beforeUpload={(file) => {
                setFiles(file);
                return false;
              }}
              onRemove={() => {
                setFiles("");
              }}
            >
              {!files ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : (
                ""
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* List and function  */}

      <Table
        loading={isLoading || isFetching || isMutating}
        rowKey="_id"
        columns={columns}
        dataSource={ordersData?.data?.results}
        pagination={{
          // pageSize: 10,
          onChange: (e) => {
            slideCurrent(e);
            setCurrentPage(e);
          },
          total: ordersData?.data?.amountResults,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} items`,

          size: "small",
          current: currentPage,
        }}
        bordered
        scroll={{ x: "max-content", y: 630 }}
        rowClassName={(record) => {
          if (record.active === false && record.isDeleted === false) {
            return "bg-dark-subtle";
          } else if (record.isDeleted) {
            return "text-danger bg-success-subtle";
          } else {
            return "";
          }
        }}
      />

      {/* Model Update */}
      <Modal
        open={open}
        title="Update Product"
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
        okType="dashed"
      >
        <Form form={updateForm} name="updateForm" onFinish={handleUpdate}>
          <ProductForm
            props={{
              categoriesData: categoriesData?.data?.results,
              suppliersData: suppliersData?.data?.results,
            }}
          />
        </Form>
      </Modal>

      <Modal
        open={openDetailPicture}
        onCancel={() => setOpenDetailPicture(false)}
        onOk={() => setOpenDetailPicture(false)}
        okType="default"
      >
        {updateId && (
          <div className="text-center">
            <div className="text-center  py-2 ">
              {updateId && updateId?.name}
            </div>{" "}
            <div className="text-center  py-2 ">Avatar product:</div>{" "}
            <div className="d-flex justify-content-center">
              <Card>
                <Image
                  width={200}
                  height={200}
                  src={`${API_URL}${updateId?.imageUrl}`}
                />
              </Card>
            </div>
            <Upload
              showUploadList={false}
              name="file"
              action={`${API_URL}/upload/orders/${updateId?._id}/image`}
              headers={{ authorization: "authorization-text" }}
              onChange={async (info) => {
                console.log(`🚀🚀🚀!..info`, info);

                if (info.file.status === "uploading") {
                  message.loading("On Updating picture on data!!", 1.5);
                }

                if (info.file.response.ok === true) {
                  message.success(" Updating picture on data Okay!!", 1.5);

                  await refetch();
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<EditOutlined />} />
            </Upload>
          </div>
        )}
        <div className="listofproduct py-2">
          <div className="py-2">List of picture: </div>
          <Space>
            {updateId && (
              <>
                <Upload
                  multiple
                  customRequest={handleFileUpload}
                  showUploadList={false}
                >
                  <Space
                    className="transition ease-in-out delay-300 w-24 h-24 border-dashed rounded-lg border-2 flex flex-1 justify-center items-center hover:border-slate-500"
                    direction="vertical"
                  >
                    <Button icon={<UploadOutlined />} />
                  </Space>
                </Upload>
                {updateId?.images?.map((item: any, index: any) => {
                  return (
                    <div className="image-container" key={index}>
                      <Image
                        preview={{
                          mask: (
                            <Popconfirm
                              okText="Delete"
                              okType="danger"
                              onCancel={(e) => {
                                e?.stopPropagation();
                              }}
                              onConfirm={(e) => {
                                e?.stopPropagation();
                                const newlistPicture = updateId?.images?.filter(
                                  (field: any) => field !== item
                                );
                                axiosClient
                                  .patch(`/orders/${updateId._id}`, {
                                    images: newlistPicture,
                                  })
                                  .then((res) => {
                                    refetch();
                                  })
                                  .catch((err) =>
                                    console.log("error delte image", err)
                                  );
                              }}
                              title={"Are you sure to delete this image?"}
                            >
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="bg-slate-700 font-semibold border-3 rounded shadow hover:border-gray-500"
                                icon={
                                  <DeleteOutlined className="text-red-600" />
                                }
                                title="Delete"
                                type="ghost"
                              />
                            </Popconfirm>
                          ),
                        }}
                        height={100}
                        width={100}
                        src={`${API_URL}/${item}`}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </Space>
        </div>
      </Modal>
    </div>
  );
}

export default OrderCRUD;
