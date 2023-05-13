import React from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import style from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useAuthStore } from "@/hook/useAuthStore";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useAuthStore((state: any) => state);
  const { auth } = useAuthStore((state: any) => state);

  const router = useRouter();
  const onLogin = async (values: any) => {
    const { email, password } = values;
    login({ email, password });

    if (auth?.payload) {
      router.push("/"); // Replace '/page' with the actual path to your desired page
    }
  };

  return (
    <div className={`${style.root}`}>
      <Form
        className={`${style.form__border}`}
        name="basic"
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
          label="Email"
          name="email"
          rules={[
            { type: "email" },
            { required: true, message: "Please input your username!" },
          ]}
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
};

export default Login;
