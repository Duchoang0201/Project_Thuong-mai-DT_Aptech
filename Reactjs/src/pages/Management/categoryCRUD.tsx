import {
  CheckCircleOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
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
} from "antd";
import { API_URL } from "../../constants/URLS";
import { axiosClient } from "../../libraries/axiosClient";
import { useRef, useState } from "react";
import Search from "antd/es/input/Search";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { handleCustomData } from "../../util/handleCustomData";
import CategoryForm from "../Form/CategoryForm";
import { customeDataValidate } from "../../validation/customDataValidate";
import { functionValidate } from "../../validation/FunctionValidate";

const BASE_URL = "/categories";
function CategoryCRUD() {
  // Inside your component
  const customizeData: any = {
    collection: "categories",
  };
  const [searchParams] = useSearchParams();
  const timeoutSucess = useRef<any>();
  const [file, setFile] = useState<any>(null);
  //Create, Update Form setting
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { auth } = useAuthStore((state: any) => state);
  const [refresh, setRefresh] = useState(0);

  const [openCreate, setOpenCreate] = useState(false);

  // Modal open Update:
  const [open, setOpen] = useState(false);

  const [deleteItem, setDeleteItem] = useState<any>();

  const onSearchItem = async (record: any) => {
    searchParams.set("limit", "10");
    try {
      if (searchParams.has("active") && searchParams.has("isDeleted")) {
        searchParams.delete("active");
        searchParams.delete("isDeleted");
      }
      if (record.type && record.value) {
        searchParams.set(record.type, record.value);

        const res = await customeDataValidate({
          collection: "Supplier",
          searchParams,
        });

        const result: any = await functionValidate(res);

        if (result.oke) {
          refetch();
        } else {
          message.error(result.message);
          searchParams.delete(record.type);
        }
      } else if (record.type && record.value === "") {
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
    data: categoriesData,
    isFetching,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["getCategories", searchParams.toString(), searchParams],
    queryFn: () => {
      customizeData.type = "GET";

      return axiosClient.get(`${BASE_URL}?${searchParams.toString()}`);
    },
  });

  const { mutate, isLoading: isMutating } = useMutation(handleCustomData, {
    onSuccess: (data) => {
      if (timeoutSucess.current) {
        clearTimeout(timeoutSucess.current);
      }
      timeoutSucess.current = setTimeout(() => {
        refetch();
      }, 2000);
    },
    onSettled(data: any) {
      if (data.ok) {
        message.success("Created Category Sucessfully!!");
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

    if (file.type) {
      customizeData.file = file;
    }
    customizeData.data = record;
    mutate(customizeData);

    setOpenCreate(false);
    setFile(null);
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
            {searchParams.get("active") || searchParams.get("isDeleted") ? (
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
              {currentPage === 1 ? index + 1 : index + currentPage * 10 - 9}
              {record.active === true && !record.isDeleted && (
                <span style={{ fontSize: "16px", color: "#08c" }}>
                  <CheckCircleOutlined /> Active
                </span>
              )}
              {record.active === false && !record.isDeleted && (
                <span className="text-danger">
                  <CloseCircleOutlined
                    style={{ fontSize: "16px", color: "#dc3545" }}
                  />{" "}
                  Unactive
                </span>
              )}

              {record.isDeleted === true && (
                <span className="text-danger">
                  <CloseCircleOutlined
                    style={{ fontSize: "16px", color: "#dc3545" }}
                  />{" "}
                  Deleted
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
                onClear={() => {
                  searchParams.delete("active");
                  searchParams.delete("isDeleted");
                  refetch();
                }}
                style={{ width: "125px" }}
                placeholder="Select a supplier"
                optionFilterProp="children"
                showSearch
                onChange={(e) => {
                  let searchValue: any = {};
                  if (e === "active") {
                    searchValue.type = "active";
                    searchValue.value = "true";
                  }
                  if (e === "unActive") {
                    searchValue = {};
                    searchValue.type = "active";
                    searchValue.value = "false";
                  }
                  if (e === "isDeleted") {
                    searchValue = {};

                    searchValue.type = "isDeleted";
                    searchValue.value = "true";
                  }
                  onSearchItem(searchValue);
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "unActive",
                    label: "Unactive",
                  },
                  {
                    value: "isDeleted",
                    label: "Deleted",
                  },
                ]}
              />
            </div>
          </>
        );
      },
      width: "11%",
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
    //Name
    {
      title: () => {
        return (
          <div>
            {searchParams.get("name") ? (
              <div className="text-danger">Name</div>
            ) : (
              <div className="secondary">Name</div>
            )}
          </div>
        );
      },
      dataIndex: "name",
      key: "name",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              placeholder="Enter name"
              onSearch={(e: any) => {
                const valueSearch = { type: "name", value: e };
                onSearchItem(valueSearch);
              }}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },

    //Desciption
    {
      title: () => {
        return (
          <div>
            {searchParams.get("description") ? (
              <div className="text-danger">Description</div>
            ) : (
              <div className="secondary">Description</div>
            )}
          </div>
        );
      },
      dataIndex: "description",
      key: "description",
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Search
              allowClear
              placeholder="Enter description"
              onSearch={(e: any) => {
                const valueSearch = { type: "description", value: e };
                onSearchItem(valueSearch);
              }}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },

    //Note
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "10%",
    },

    //function
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
      render: (text: any, record: any) => (
        <Space>
          <Popconfirm
            okText="Delete"
            okType="danger"
            onConfirm={() => handleDelete(deleteItem)}
            title={"Are you sure to delete this product?"}
          >
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setDeleteItem(record);
              }}
            ></Button>
          </Popconfirm>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setOpen(true);
              updateForm.setFieldsValue(record);
            }}
          ></Button>
          <Upload
            showUploadList={false}
            name="file"
            action={`${API_URL}/upload/categories/${record._id}/image`}
            headers={{ authorization: "authorization-text" }}
            onChange={(info) => {
              if (info.file.status !== "uploading") {
                console.log(info.file);
                message.loading("On Updating picture on data!!", 1.5);
              }

              if (info.file.status === "done") {
                setRefresh(refresh + 1);
                message.success(`${info.file.name} file uploaded successfully`);
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
                Add Category
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {/* Modal Create A Category */}
      <Modal
        title="Create Category"
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
        <div className="container d-flex flex-row ">
          <Form form={createForm} name="createForm" onFinish={handleCreate}>
            <div className="row">
              <CategoryForm />
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
            </div>
          </Form>
        </div>
      </Modal>

      {/* List and function  */}

      <Table
        loading={isLoading || isFetching || isMutating}
        rowKey="_id"
        columns={columns}
        dataSource={categoriesData?.data?.results}
        pagination={{
          pageSize: 10,
          onChange: (e) => slideCurrent(e),
          total: categoriesData?.data?.amountResults,
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
        title="Update Category"
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
        okType="dashed"
      >
        <Form form={updateForm} name="updateForm" onFinish={handleUpdate}>
          <div className="row">
            <CategoryForm />
          </div>
        </Form>
      </Modal>

      <Upload
        maxCount={1}
        listType="picture-card"
        showUploadList={true}
        beforeUpload={(file) => {
          console.log(`🚀🚀🚀!..file`, file);
          return false;
        }}
        onRemove={() => {}}
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
    </div>
  );
}

export default CategoryCRUD;
