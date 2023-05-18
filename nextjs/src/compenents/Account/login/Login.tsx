import React from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import style from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useAuthStore } from "@/hook/useAuthStore";
import { useRouter } from "next/router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const { login } = useAuthStore((state: any) => state);
  const { auth } = useAuthStore((state: any) => state);

  const router = useRouter();
  const onLogin = async (values: any) => {
    const { email, password } = values;
    login({ email, password });

    if (auth) {
      router.push("/"); // Replace '/page' with the actual path to your desired page
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`${style.root}`}>
      <Form
        className={`${style.form__border}`}
        name="normal_login"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onLogin}
        onFinishFailed={(errorInfo: any) => {
          console.log("Failed:", errorInfo);
        }}
        autoComplete="off"
      >
        <Typography.Title className="text-center">Login Form</Typography.Title>
        <Form.Item
          name="email"
          rules={[
            { type: "email" },
            { required: true, message: "Please input your username!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item shouldUpdate wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
