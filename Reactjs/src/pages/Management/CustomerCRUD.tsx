import {
  CheckCircleOutlined,
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  DatePicker,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { axiosClient } from "../../libraries/axiosClient";
import { useRef, useState } from "react";
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
import CustomerForm from "../Form/CustomerForm";
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
function CustomerCRUD() {
  const customizeData: any = {
    collection: "customers",
  };

  const [file, setFile] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const timeoutSucess = useRef<any>();
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { auth } = useAuthStore((state: any) => state);

  const [openCreate, setOpenCreate] = useState(false);

  // Modal open Update:
  const [open, setOpen] = useState(false);

  const [deleteItem, setDeleteItem] = useState<any>();

  const onSearchItem = async (record: any) => {
    searchParams.set("limit", "10");
    try {
      if (record.type && record.value) {
        searchParams.set(record.type, record.value);

        const res = await customeDataValidate({
          collection: "Customer",
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
    } catch (error: any) {
      console.log(`🚀🚀🚀!..error`, error.message);
      message.error(error.message || error.reponse.data.message);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const slideCurrent = (value: any) => {
    // setSkip(value * 10 - 10);
    const skipValue = (value * 10 - 10).toString();
    searchParams.set("skip", skipValue);
    setCurrentPage(value);

    refetch();
  };

  const {
    data: customersData,
    isFetching,

    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => {
      return axiosClient.get(`/customers?${searchParams.toString()}`);
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
    //NO
    {
      title: () => {
        return (
          <div>
            {searchParams.get("Locked") ? (
              <div className="text-danger">No</div>
            ) : (
              <div className="secondary">No</div>
            )}
          </div>
        );
      },
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any, index: number) => {
        return (
          <div>
            <Space>
              {" "}
              {currentPage === 1 ? index + 1 : index + currentPage * 10 - 9}
              {record.Locked === false && (
                <span style={{ fontSize: "16px", color: "#08c" }}>
                  <CheckCircleOutlined /> Active
                </span>
              )}
              {record.Locked === true && (
                <span style={{ fontSize: "16px", color: "#dc3545" }}>
                  <CheckCircleOutlined /> Locked
                </span>
              )}
            </Space>
          </div>
        );
      },
      filterDropdown: () => {
        return (
          <>
            <div>
              <Select
                allowClear
                style={{ width: "125px" }}
                placeholder="Select a supplier"
                optionFilterProp="children"
                showSearch
                onChange={(e) => {
                  const searchValue = { type: "Locked", value: e };
                  onSearchItem(searchValue);
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "false",
                    label: "Active",
                  },

                  {
                    value: "true",
                    label: "Locked",
                  },
                ]}
              />
            </div>
          </>
        );
      },
    },
    //IMAGE
    {
      width: "10%",

      title: "Picture",
      key: "imageUrl",
      dataIndex: "imageUrl",
      render: (text: any, record: any, index: any) => {
        return (
          <div>
            {record.imageUrl && (
              <img
                src={`${API_URL}${record.imageUrl}`}
                style={{ height: 60 }}
                alt="record.imageUrl"
              />
            )}
          </div>
        );
      },
    },
    //Email
    {
      title: () => {
        return (
          <div>
            {searchParams.get("email") ? (
              <div className="text-danger">Email</div>
            ) : (
              <div className="secondary">Email</div>
            )}
          </div>
        );
      },
      dataIndex: "email",
      key: "email",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              onSearch={(e) => {
                const searchValue = { type: "email", value: e };
                onSearchItem(searchValue);
              }}
              placeholder="Enter email"
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //First Name
    {
      title: () => {
        return (
          <div>
            {searchParams.get("firstName") ? (
              <div className="text-danger">First name</div>
            ) : (
              <div className="secondary">First name</div>
            )}
          </div>
        );
      },
      dataIndex: "firstName",
      key: "firstName",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              placeholder="Enter first name"
              onSearch={(e) => {
                const searchValue = { type: "firstName", value: e };
                onSearchItem(searchValue);
              }}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //Last Name
    {
      title: () => {
        return (
          <div>
            {searchParams.get("lastName") ? (
              <div className="text-danger">Last name</div>
            ) : (
              <div className="secondary">Last name</div>
            )}
          </div>
        );
      },
      dataIndex: "lastName",
      key: "lastName",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              onSearch={(e) => {
                const searchValue = { type: "lastName", value: e };
                onSearchItem(searchValue);
              }}
              placeholder="Enter last name"
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //Phone number
    {
      title: () => {
        return (
          <div>
            {searchParams.get("phoneNumber") ? (
              <div className="text-danger">Phone Number</div>
            ) : (
              <div className="secondary">Phone Number</div>
            )}
          </div>
        );
      },
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              onSearch={(e) => {
                const searchValue = { type: "phoneNumber", value: e };
                onSearchItem(searchValue);
              }}
              allowClear
              placeholder="Enter phone number"
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //Address
    {
      title: () => {
        return (
          <div>
            {searchParams.get("address") ? (
              <div className="text-danger">Address</div>
            ) : (
              <div className="secondary">Address</div>
            )}
          </div>
        );
      },
      dataIndex: "address",
      key: "address",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              onSearch={(e) => {
                const searchValue = { type: "address", value: e };
                onSearchItem(searchValue);
              }}
              placeholder="Enter address"
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    //Birthday
    {
      title: () => {
        return (
          <div>
            {searchParams.get("birthdayFrom") ||
            searchParams.get("birthdayTo") ? (
              <div className="text-danger">Birthday</div>
            ) : (
              <div className="secondary">Birthday</div>
            )}
          </div>
        );
      },
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday: any) => {
        const formattedBirthday = dayjs(birthday).format("DD/MM/YYYY");
        return <span>{formattedBirthday}</span>;
      },
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <RangePicker
              allowClear
              defaultValue={[
                dayjs("01/01/1900", dateFormat),
                dayjs("01/01/2023", dateFormat),
              ]}
              format={dateFormat}
              onChange={async (e: any) => {
                const searchValues: any[] = [
                  { type: "birthdayFrom", value: null },
                  { type: "birthdayTo", value: null },
                ];
                if (e === null) {
                  searchValues.forEach((searchValue) => {
                    onSearchItem(searchValue);
                  });
                }
                const data = await e?.map((date: any) =>
                  dayjs(date).format("YYYY/MM/DD")
                );

                searchValues.push({ type: "birthdayFrom", value: data[0] });
                searchValues.push({ type: "birthdayTo", value: data[1] });

                searchValues.forEach((searchValue) => {
                  onSearchItem(searchValue);
                });
              }}
            />
          </div>
        );
      },
    },
    //Note

    { title: "Note", dataIndex: "note", key: "note", width: "10%" },

    //function
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
      render: (text: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setOpen(true);
              record.birthday = dayjs(record.birthday);
              updateForm.setFieldsValue(record);
            }}
          ></Button>
          <Popconfirm
            okText="Delete"
            okType="danger"
            onConfirm={() => handleDelete(deleteItem)}
            title={"Are you sure to delete this product?"}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setDeleteItem(record);
              }}
            ></Button>
          </Popconfirm>
          <Upload
            showUploadList={false}
            name="file"
            action={`${API_URL}/upload/customers/${record._id}/image`}
            headers={{ authorization: "authorization-text" }}
            onChange={(info) => {
              if (info.file.status !== "uploading") {
                console.log(info.file);
                message.loading("On Updating picture on data!!", 1.5);
              }

              if (info.file.status === "done") {
                setTimeout(() => {
                  refetch();
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                }, 2000);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
        </Space>
      ),
      filterDropdown: () => {
        return (
          <>
            <Space direction="vertical">
              <Button
                style={{ width: "150px" }}
                onClick={async () => {
                  const arrValue: any = [];
                  await searchParams.forEach((value, key) => {
                    arrValue.push({ value: "", type: key });
                  });

                  await arrValue.map(async (item: any) => {
                    await onSearchItem(item);
                  });
                }}
                icon={<ClearOutlined />}
              >
                Clear filter
              </Button>
              <Button
                style={{ width: "150px" }}
                onClick={() => {
                  setOpenCreate(true);
                }}
                icon={<PlusCircleOutlined />}
              >
                Add Customer
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

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
          <CustomerForm />
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
                setFile(file);
                return false;
              }}
              onRemove={() => {
                setFile("");
              }}
            >
              {!file ? (
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
        dataSource={customersData?.data?.results}
        pagination={{
          pageSize: 10,
          onChange: (e) => slideCurrent(e),
          total: customersData?.data?.amountResults,
        }}
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
        title="Update Supplier"
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
        okType="dashed"
      >
        <Form form={updateForm} name="updateForm" onFinish={handleUpdate}>
          <CustomerForm />
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerCRUD;
