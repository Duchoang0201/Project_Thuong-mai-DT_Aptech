import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Select,
} from "antd";

import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Search } = Input;

interface DataType {
  id: number;
  name: string;
  description: string;
  _id: string;
}

function CategoryCRUD() {
  const API_URL = "http://localhost:9000/categories";
  const [categories, setCategories] = useState<Array<DataType>>([]);
  // const [categoryId, setCategoryId] = useState<Array<DataType>>([]);
  const [refresh, setrefresh] = useState(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState(0);
  const [length, setLength] = useState<any[]>([]);

  const APIName = "http://localhost:9000/categories/categoriesItems";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setLength(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const numberPage = [];
  for (let i = 0; i < length.length / 10; i++) {
    numberPage.push(i);
  }

  useEffect(() => {
    axios
      .get(`${API_URL}?limit=10`)
      .then((res: any) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Something went wrong!");
      });
  }, [refresh]);

  // Create new Item
  const handleSumbit = (data: any) => {
    console.log(data);
    axios
      .post(API_URL, data)
      .then((res) => {
        console.log(res);
        message.success("Thêm mới danh mục thành công", 1.5);
        setrefresh((f) => f + 1);
        createForm.resetFields();
        setOpenCreate(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Create new data unsucessfully!!", 1.5);
      });
  };
  // Patch Item
  const handleUpdate = (record: any) => {
    console.log(updateId, record);
    axios
      .patch(API_URL + "/" + updateId, record)
      .then((res) => {
        console.log(res);
        message.success("Sửa danh mục thành công", 1.5);
        setrefresh((f) => f + 1);
        updateForm.resetFields();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };
  //Delte Item
  const handleDelete = (data: any) => {
    console.log(data);
    axios
      .delete(API_URL + "/" + data)
      .then((res) => {
        console.log(res.data);
        message.success("Xóa danh mục thành công", 1.5);
        setrefresh((f) => f + 1);
      })
      .catch((err) => console.log(err));
  };

  const onSearchCategory = useCallback((value: any) => {
    console.log(`${APIName}?categoryItem=${value}`);
    axios.get(`${APIName}?categoryItem=${value}`).then((response) => {
      let { data } = response;
      // data = [data];//không cần chuyển kết  quả thành mảng vì nếu cho query vào object rỗng thì nó không bị lỗi
      console.log(data);
      setCategories(data);
    });
  }, []);

  const searchDescription = useCallback((value: any) => {
    axios.get(`${APIName}?descriptionItems=${value}`).then((response) => {
      let { data } = response;
      console.log("data descript: ", data);
      // data = [data];
      setCategories(data);
    });
  }, []);

  const resetFilter = () => {
    setrefresh((pre) => pre + 1);
    message.success("Reset Filter");
  };

  const handlePage = useCallback((value: any) => {
    axios
      .get(`${API_URL}?skip=${value * 10}&limit=10`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Patch Item

  const columns = [
    {
      title: "Id",
      key: "id",
      width: "1%",
      render: (text: any, record: any, index: any) => (
        <div key={index}> {index + 1}</div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      filterDropdown: (clearFilters: any) => {
        return (
          <div style={{ width: "150px" }}>
            <Select
              allowClear
              autoClearSearchValue={!categories ? true : false}
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onSearchCategory}
              filterOption={(input, option) =>
                (option?.label ?? [])
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={categories.map((item: any, index: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",

      filterDropdown: (clearFilters: any) => {
        return (
          <div style={{ width: "150px" }}>
            <Space direction="vertical">
              <Search
                placeholder="input search text"
                onSearch={searchDescription}
                style={{ width: 200 }}
              />
            </Space>
          </div>
        );
      },
    },
    {
      title: "Function",
      dataIndex: "function",
      key: "id",
      filterDropdown: (clearFilters: any) => {
        return (
          <>
            <Space direction="vertical">
              <Button
                icon={<ClearOutlined />}
                style={{ width: "150px" }}
                onClick={resetFilter}
              >
                Clear filter
              </Button>

              <Button
                icon={<PlusOutlined />}
                style={{ width: "150px" }}
                onClick={() => {
                  setrefresh((pre) => pre + 1);
                  setOpenCreate(true);
                }}
              >
                Add category
              </Button>
            </Space>
          </>
        );
      },
      render: (text: string, record: any) => (
        <div>
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setOpen(true);
                setUpdateId(record._id);
                updateForm.setFieldsValue(record);
              }}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id)}
            />
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="container d-flex flex-row justify-content-center">
        <Modal
          title="Tạo danh mục"
          open={openCreate}
          onCancel={() => setOpenCreate(false)}
          onOk={() => createForm.submit()}
        >
          <Form
            form={createForm}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={handleSumbit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              hasFeedback
              label="Username"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              hasFeedback
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="container">
        <Table
          rowKey="id"
          dataSource={categories}
          columns={columns}
          pagination={false}
        ></Table>
      </div>
      <div>
        {numberPage.map((items, index) => {
          return <button onClick={() => handlePage(items)}>{items + 1}</button>;
        })}
      </div>

      <Modal
        open={open}
        title="Update cateroty"
        onCancel={() => setOpen(false)}
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form form={updateForm} onFinish={handleUpdate} autoComplete="off">
          <Form.Item
            hasFeedback
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CategoryCRUD;
