import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "./index.module.css";
import { Col, Row, Card } from "antd";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import { Button, DatePicker, Form, Input, Upload } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useAuthStore } from "@/hook/useAuthStore";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

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

  const API_URL = `${URL_ENV}/customers`;
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
          .post(`${URL_ENV}/upload/customers/${_id}/image`, formData)
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
      <div className={style.container}>
        <Row>
          <Col span={14} push={10}>
            <div className={`${style.myInlineStyle}`}>
              <Card
                title="Sign Up"
                bordered={true}
                style={{ width: "100%", margin: "5% 0%" }}
              >
                <Form
                  initialValues={{ remember: true }}
                  className={`container ${style.form}`}
                  form={registerForm}
                  name="registerForm"
                  onFinish={handleCreate}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  // style={{ width: 500 }}
                >
                  <div className="row ">
                    <Form.Item
                      label="first name"
                      name="firstName"
                      hasFeedback
                      rules={[{ required: true, message: "Enter first name" }]}
                      style={{
                        width: "calc(100% - 0px)",
                      }}
                    >
                      <Input placeholder="First name" />
                    </Form.Item>
                    <Form.Item
                      name="LastName"
                      label="Last name"
                      hasFeedback
                      rules={[{ required: true, message: "Enter last name" }]}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,

                          message: "Enter password",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      label="Phone"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Phone number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Birthday"
                      name="birthday"
                      rules={[
                        { required: true, message: "Please enter Birthday" },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="Ảnh" name="file">
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
              </Card>
            </div>
          </Col>
          <Col span={10} pull={14} className={` ${style.column} `}>
            <div className={style.brand}>
              <div className={style.title}>JewelShop</div>
              <div className={style.slogan}>Nâng Tầm thời trang của bạn</div>
            </div>
          </Col>
        </Row>
      </div>
      {/* //responsive */}
      <div className={style.container2}>
        <div className={`${style.myInlineStyle}`}>
          <Card
            title="Sign Up"
            bordered={true}
            style={{ width: "100%", margin: "5% 2%" }}
          >
            <Form
              initialValues={{ remember: true }}
              className={`container ${style.form}`}
              form={registerForm}
              name="registerForm"
              onFinish={handleCreate}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              layout="horizontal"
              style={{ width: " 100%" }}
            >
              <div className={`row ${style.table} `}>
                <Form.Item
                  name="firstName"
                  label=" first name"
                  hasFeedback
                  rules={[{ required: true, message: "Enter password" }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>

                <Form.Item
                  name="LastName"
                  label=" last name"
                  hasFeedback
                  rules={[{ required: true, message: "Enter password" }]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>

                {/* ///////////////// */}

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
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Phone"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Phone number",
                    },
                  ]}
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
                <Form.Item label="Ảnh" name="file">
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
                  style={{ width: "50%" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Register;
