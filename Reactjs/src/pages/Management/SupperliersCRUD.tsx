import {
  ClearOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Search from "antd/es/input/Search";

interface ISupplier {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

function SupperliersCRUD() {
  let API_URL = "http://localhost:9000/suppliers";

  // MODAL:
  // Modal open Create:
  const [openCreate, setOpenCreate] = useState(false);

  // Modal open Update:
  const [open, setOpen] = useState(false);

  //Model open Confirm Delete
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  //Delete Item
  const [deleteItem, setDeleteItem] = useState<ISupplier>();

  //For fillter:

  //Data fillter
  const [supplierTEST, setSupplierTEST] = useState<Array<any>>([]);

  // Change fillter (f=> f+1)
  const [supplierFilter, setSupplierFilter] = useState(API_URL);

  const [updateId, setUpdateId] = useState(0);

  //Create, Update Form setting
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  //Text of Tyography:
  const { Text } = Typography;

  //Create data
  const handleCreate = (record: any) => {
    axios
      .post(API_URL, record)
      .then((res) => {
        console.log(res.data);
        setSupplierFilter((f) => f + 1);
        setOpenCreate(false);

        message.success(" Add new Suppliers sucessfully!", 1.5);
        createForm.resetFields();
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };
  //Delete a Data
  const handleDelete = (record: any) => {
    axios
      .delete(API_URL + "/" + record._id)
      .then((res) => {
        console.log(res.statusText);
        message.success(" Delete item sucessfully!!", 1.5);
        setOpenDeleteConfirm(false);
        setSupplierFilter((f) => f + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Update a Data
  const handleUpdate = (record: any) => {
    console.log(record);
    axios
      .patch(API_URL + "/" + updateId, record)
      .then((res) => {
        console.log(res);
        setOpen(false);
        setOpenCreate(false);
        setSupplierFilter((f) => f + 1);
        message.success("Updated sucessfully!!", 1.5);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //SEARCH DEPEN ON NAME
  const [supplierName, setSuplierName] = useState("");

  // const onSearchSupplierName = (record: any) => {
  //   setSuplierName(record);
  // };
  const onSearchSupplierName = useCallback((value: any) => {
    console.log(value);
    if (value) {
      setSuplierName(value);
    } else {
      setSuplierName("");
    }
    // if (value) {
    //   setCategoryId(value);
    //   setProductsFilter((f) => f + 1);
    // } else {
    // setCategoryId("");
    //   setProductsFilter((f) => f + 1);
    // }
  }, []);

  //SEARCH DEPEN ON EMAIL
  const [supplierEmail, setSuplierEmail] = useState("");

  const onSearchProductEmail = (record: any) => {
    setSuplierEmail(record);
  };
  //SEARCH DEPEN ON PHONENUMBER
  const [supplierPhone, setSuplierPhone] = useState("");

  const onSearchProductPhone = (record: any) => {
    setSuplierPhone(record);
  };

  //SEARCH DEPEN ON ADDRESS
  const [supplierAddress, setSuplierAddress] = useState("");

  const onSearchProductAddress = (record: any) => {
    if (record) {
      setSuplierAddress(record);
    } else {
      setSuplierAddress("");
    }
  };

  //Search on Skip and Limit

  const [pages, setPages] = useState();
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const slideCurrent = (value: any) => {
    setSkip(value * 10 - 10);
    setCurrentPage(value);
  };
  //GET DATA ON FILLTER
  const URL_FILTER = `http://localhost:9000/suppliers?${[
    supplierName && `&name=${supplierName}`,
    supplierEmail && `&email=${supplierEmail}`,
    supplierPhone && `&phoneNumber=${supplierPhone}`,
    supplierAddress && `&address=${supplierAddress}`,
    skip && `&skip=${skip}`,
  ]
    .filter(Boolean)
    .join("")}&limit=10`;
  console.log(URL_FILTER);

  useEffect(() => {
    axios
      .get(URL_FILTER)
      .then((res) => {
        setSupplierTEST(res.data.results);
        setPages(res.data.amountResults);
      })
      .catch((err) => console.log(err));
  }, [URL_FILTER, supplierFilter]);

  console.log(pages);
  //Setting column
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any, index: number) => {
        return (
          <div>
            {currentPage === 1 ? index + 1 : index + currentPage * 10 - 9}
          </div>
        );
      },
    },
    {
      title: () => {
        return (
          <div>
            {supplierEmail ? (
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
              placeholder="input search text"
              onSearch={onSearchProductEmail}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    {
      title: () => {
        return (
          <div>
            {supplierName ? (
              <div className="text-danger">Name</div>
            ) : (
              <div className="secondary">Name</div>
            )}
          </div>
        );
      },
      dataIndex: "name",
      key: "_id", // key added here
      filterDropdown: () => {
        return (
          <>
            <div>
              <Select
                allowClear
                // autoClearSearchValue={!supplierId ? true : false}
                onClear={() => {
                  setSuplierName("");
                }}
                style={{ width: "125px" }}
                placeholder="Select a supplier"
                optionFilterProp="children"
                onChange={onSearchSupplierName}
                showSearch
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={supplierTEST.map((item: any, index: any) => {
                  return {
                    label: `${item.name}`,
                    value: item.name,
                  };
                })}
              />
              {/* {supplierId && (
                <span style={{ width: "20%" }}>
                  <Button
                    onClick={() => {
                      setSupplierId("");
                    }}
                    icon={<ClearOutlined />}
                  />
                </span>
              )} */}
            </div>
          </>
        );
      },
    },

    {
      title: () => {
        return (
          <div>
            {supplierPhone ? (
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
              allowClear
              placeholder="input search text"
              onSearch={onSearchProductPhone}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
    {
      title: () => {
        return (
          <div>
            {supplierAddress ? (
              <div className="text-danger">Adress</div>
            ) : (
              <div className="secondary">Adress</div>
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
              placeholder="input search text"
              onSearch={onSearchProductAddress}
              style={{ width: 200 }}
            />
          </div>
        );
      },
    },
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
              setUpdateId(record._id);
              updateForm.setFieldsValue(record);
            }}
          ></Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteItem(record);
              setOpenDeleteConfirm(true);
            }}
          ></Button>
        </Space>
      ),
      filterDropdown: () => {
        return (
          <>
            <Space direction="vertical">
              <Button
                style={{ width: "150px" }}
                onClick={() => {
                  setSuplierName("");
                  setSuplierEmail("");
                  setSuplierPhone("");
                  setSuplierAddress("");
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
                Add product
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <div className="container">
      {/* Modal Create A SUPPLIER */}

      <Modal
        title={`Create Supplier `}
        open={openCreate}
        onCancel={() => {
          setOpenCreate(false);
        }}
        onOk={() => {
          createForm.submit();
        }}
        okText="Submit"
      >
        <div className="container d-flex flex-row ">
          <Form form={createForm} name="createForm" onFinish={handleCreate}>
            <div className="row">
              <FormItem
                className="col-6"
                hasFeedback
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input Name!" }]}
              >
                <Input />
              </FormItem>
              <FormItem
                className="col-6"
                hasFeedback
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input Email!" }]}
              >
                <Input />
              </FormItem>
            </div>
            <div className="row">
              {" "}
              <FormItem
                hasFeedback
                label="Phone"
                name="phoneNumber"
                className="col-6"
              >
                <Input />
              </FormItem>
              <FormItem
                className="col-6"
                hasFeedback
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please input Email!" }]}
              >
                <Input />
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>

      {/* List and function  */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={supplierTEST}
        pagination={false}
      >
        {" "}
      </Table>

      {/* Modal confirm Delte */}
      <Modal
        open={openDeleteConfirm}
        onOk={() => handleDelete(deleteItem)}
        okText="Delete"
        okType="danger"
        onCancel={() => setOpenDeleteConfirm(false)}
      >
        <h5>Are you sure to delete?</h5>
        <strong>Product : </strong>
        <Text type="danger">{deleteItem?.name}</Text>
      </Modal>

      {/* Model Update */}
      <Modal
        open={open}
        title="Update supplier"
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form form={updateForm} name="updateForm" onFinish={handleUpdate}>
          <div className="row">
            <FormItem
              className="col-6"
              hasFeedback
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input Name!" }]}
            >
              <Input />
            </FormItem>
            <FormItem
              className="col-6"
              hasFeedback
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input />
            </FormItem>
          </div>
          <div className="row">
            {" "}
            <FormItem
              hasFeedback
              label="Phone"
              name="phoneNumber"
              className="col-6"
            >
              <Input />
            </FormItem>
            <FormItem
              className="col-6"
              hasFeedback
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input />
            </FormItem>
          </div>
        </Form>
      </Modal>
      <Pagination
        className="container text-end"
        onChange={(e) => slideCurrent(e)}
        defaultCurrent={1}
        total={pages}
      />
    </div>
  );
}

export default SupperliersCRUD;
