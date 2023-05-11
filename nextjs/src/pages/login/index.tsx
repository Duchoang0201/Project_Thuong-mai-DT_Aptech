import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import style from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
// import "../styles/globals.css";
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const App: React.FC = () => (
  <div className={`${style.root}`}>
    <Form
      className={`${style.form__border}`}
      name="basic"
      labelCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={(errorInfo: any) => {
        console.log("Failed:", errorInfo);
      }}
      autoComplete="off"
    >
      <Typography.Title className="text-center">Login Form</Typography.Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default App;
