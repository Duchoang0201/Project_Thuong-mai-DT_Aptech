import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  DatePicker,
  // DatePickerProps,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
} from "antd";
// import FormItemLabel from "antd/es/form/FormItemLabel";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Search } = Input;

interface ICustomers {
  fisrtName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  birthday: string;
}
const CustomerCRUD = () => {
  const API_URL = "http://localhost:9000/customers";
  const [customers, setCustomer] = useState<Array<ICustomers>>([]);
  const [totalCustomer, setTotalCustomer] = useState<Array<ICustomers>>([]);
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [updateForm] = Form.useForm();
  const [createForm] = Form.useForm();

  //get total item of data:
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        // const {data} = response;
        setTotalCustomer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totalLength = totalCustomer.length;
  const skipbutton = totalLength;
  const numberPage = [];
  console.log("total:  ", totalLength);
  //chưa tạo phân trang

  for (let i = 0; i < totalLength / 10; i++) {
    numberPage.push(i);
  }

  // if (totalLength % 10 > 0) {
  //   numberPage.push(totalLength / 10);
  // }
  //Get DATA
  useEffect(() => {
    // console.log(totalCustomer);
    axios
      .get(`${API_URL}?limit=10`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const QueryFirstName = useCallback((value: any) => {
    console.log("click!");
    axios
      .get(`${API_URL}/queryfunction?customerFirstName=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  const QueryLastName = useCallback((value: any) => {
    console.log("click");
    axios
      .get(`${API_URL}/queryfunction?customerLastName=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  const QueryAdress = useCallback((value: any) => {
    axios
      .get(`${API_URL}/queryfunction?customerAddress=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  const QueryNumberPhone = useCallback((value: any) => {
    axios
      .get(`${API_URL}/queryfunction?customerPhoneNumber=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  const QueryEmail = useCallback((value: any) => {
    axios
      .get(`${API_URL}/queryfunction?customerEmail=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  const QueryDate = useCallback((value: any) => {
    console.log(value);
    axios
      .get(`${API_URL}/queryfunction?customerDate=${value}`)
      .then((response) => {
        const { data } = response;
        setCustomer(data);
      });
  }, []);

  //Create a Data
  const handleCreate = (record: any) => {
    // const newData = {
    //   ...record,
    //   birthday: `${record.birthday.$y}-${record.birthday.$M + 1}-${
    //     record.birthday.$D
    //   } `,
    // };
    console.log(record);
    axios
      .post(API_URL, record)
      .then((res) => {
        console.log(res);
        message.success("Thêm mới danh mục thành công", 1.5);
        // createForm.resetFields();
        setRefresh((f) => f + 1);
      })
      .catch((err) => {
        console.log(err);
        message.error("Create new data unsucessfully!!", 1.5);
      });
  };
  //Delete a data
  const handleDelte = (recordID: any) => {
    axios
      .delete(API_URL + "/" + recordID)
      .then((res) => {
        console.log(res);
        setRefresh((f) => f + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Update a data
  const handleUpdate = (data: any) => {
    axios
      .patch(API_URL + "/" + updateId, data)
      .then((res) => {
        setRefresh((f) => f + 1);
        setOpen(false);
        message.success("Updated sucessfully!!", 1.5);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePage = useCallback((value: any) => {
    axios
      .get(`${API_URL}?skip=${value * 10}&limit=10`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //Format colums
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search
                placeholder="input search text"
                onSearch={QueryFirstName}
                style={{ width: 200 }}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search
                placeholder="input search text"
                onSearch={QueryLastName}
                style={{ width: 200 }}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search
                placeholder="input search text"
                onSearch={QueryNumberPhone}
                style={{ width: 200 }}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search
                placeholder="input search text"
                onSearch={QueryAdress}
                style={{ width: 200 }}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search
                placeholder="input search text"
                onSearch={QueryEmail}
                style={{ width: 200 }}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space>
              <Search onSearch={QueryDate} />
            </Space>
          </>
        );
      },
    },
    {
      title: "Function",
      dataIndex: "function",
      key: "id",
      filterDropdown: (clearFilters: any) => {
        return (
          <div style={{ width: "150px" }}>
            <Space direction="vertical">
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                Add Item
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={() => {
                  setRefresh((pre) => pre + 1);
                }}
              >
                Reset Filter
              </Button>
            </Space>
          </div>
        );
      },
      render: (text: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setOpen(true);
              console.log(record);
              setUpdateId(record._id);
              updateForm.setFieldsValue(record);
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelte(record._id)}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Modal
        width={800}
        open={openCreate}
        title="Create Customer"
        onCancel={() => setOpenCreate(false)}
        onOk={() => {
          createForm.submit();
          setOpenCreate(false);
        }}
      >
        <Form
          className="container"
          form={createForm}
          name="createForm"
          onFinish={handleCreate}
          autoComplete="off"
        >
          <div className="row">
            <Form.Item
              label="Firstname"
              name="firstName"
              className="col-4"
              hasFeedback
              rules={[{ required: true, message: "Please input Firstname!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastName"
              className="col-4"
              hasFeedback
              rules={[{ required: true, message: "Please input Lastname!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phonenumber"
              name="phoneNumber"
              className="col-4"
              hasFeedback
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              label="Address"
              name="address"
              className="col-4"
              hasFeedback
              rules={[{ required: true, message: "Please input Address!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="col-4"
              hasFeedback
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Birthday"
              name="birthday"
              className="col-4"
              hasFeedback
              rules={[{ required: true, message: "Please input Birthday!" }]}
            >
              {/* <Input /> */}
              <DatePicker />
            </Form.Item>
          </div>

          {/* <Form.Item className="text-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>

      <Table
        className="container"
        rowKey="id"
        columns={columns}
        dataSource={customers}
        pagination={false}
      ></Table>

      <div>
        {numberPage.map((item, key) => {
          return (
            <>
              <button onClick={() => handlePage(item)}>{item + 1}</button>
            </>
          );
        })}
      </div>

      <Modal
        title={`Update Customers ${updateId}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="updateForm"
          onFinish={handleUpdate}
          autoComplete="off"
        >
          <div className="row">
            <Form.Item
              label="Firstname"
              name="firstName"
              className="col-6"
              hasFeedback
              rules={[{ required: true, message: "Please input Firstname!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lastname"
              name="lastName"
              className="col-6"
              hasFeedback
              rules={[{ required: true, message: "Please input Lastname!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              label="Phonenumber"
              name="phoneNumber"
              className="col-6"
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              className="col-6"
              hasFeedback
              rules={[{ required: true, message: "Please input Address!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              label="Email"
              name="email"
              className="col-6"
              hasFeedback
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Birthday"
              name="birthday"
              className="col-6"
              hasFeedback
              rules={[{ required: true, message: "Please input Birthday!" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerCRUD;
