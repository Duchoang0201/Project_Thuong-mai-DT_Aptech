import axios from "axios";
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/hook/useAuthStore";
import router from "next/router";
import style from "./index.module.css";

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
  const { login, auth } = useAuthStore((state: any) => state);

  const API_URL = "http://localhost:9000/customers";
  const [registerForm] = Form.useForm();

  const handleCreate = (record: any) => {
    record.createdBy = record.record;
    record.createdDate = new Date().toISOString();
    console.log("««««« record »»»»»", record);
    axios
      .post(API_URL, record)
      .then((res) => {
        // UPLOAD FILE
        const { _id, email, password } = res.data.result;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(
              `http://localhost:9000/upload/customers/${_id}/image`,
              formData
            )
            .then((response) => {
              login({ email, password });
              router.push("/");
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={`${style.myInlineStyle}`}>
        <div style={{ margin: "2% 17%" }}>
          <h2>Sign up</h2>
        </div>

        <div className="container">
          <Form form={registerForm} name="registerForm" onFinish={handleCreate}>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
                { required: true, message: "Please input Email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="First name"
              name="firstName"
              rules={[{ required: true, message: "Please input First name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Last name"
              name="lastName"
              rules={[{ required: true, message: "Please input Last name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Phone number"
              name="phonenumber"
              rules={[
                { required: true, message: "Please input Phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input Address!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input Password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              label="Birthday"
              name="birthday"
              rules={[{ required: true, message: "Please input Birthday!" }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 8,
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
                  setFile(null);
                }}
              >
                {!file ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
