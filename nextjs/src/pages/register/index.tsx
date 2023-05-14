import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "./index.module.css";

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  message,
} from "antd";
import { relative } from "path";
import { PlusOutlined } from "@ant-design/icons";
import login from "../login";
import { useAuthStore } from "@/hook/useAuthStore";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type customertype = {
  firstname: string;
  lastname: string;
  phonenumber: string;
  address: string;
  email: string;
  birthday: string;
  imageUrl: string;
  password: string;
};

function Register({}: customertype) {
  const [file, setFile] = useState<any>(null);
  const { login } = useAuthStore((state: any) => state);

  const API_URL = "http://localhost:9000/customers";
  const [registerForm] = Form.useForm();

  const handleCreate = (value: any) => {
    const newData = {
      ...value,
      birthday: `${value.birthday.$y}-${value.birthday.$M + 1}-${
        value.birthday.$D
      }`,
    };
    axios
      .post(API_URL, newData)
      .then((res) => {
        // UPLOAD FILE
        const { _id, email, password } = res.data.result;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(`http://localhost:9000/upload/customers/${_id}/image`, formData)
          .then((response) => {
            login({ email, password });
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className={`${style.myInlineStyle}`}>
          <div style={{ margin: "2% 17%" }}>
            <h2>Sign up</h2>
          </div>
          <Form
            initialValues={{ remember: true }}
            className="container"
            form={registerForm}
            name="registerForm"
            onFinish={handleCreate}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
          >
            <div className="row">
              <Form.Item
                hasFeedback
                label="Password"
                name="password"
                rules={[{ required: true, message: "Enter password" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Phone"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter Phone number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: "Please enter Birthday" }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Hình minh họa" name="file">
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "0 30%", width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
