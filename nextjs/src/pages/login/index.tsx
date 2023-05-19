import React from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import style from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useAuthStore } from "@/hook/useAuthStore";

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

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className={`${style.root} `}>
      <div className={style.brand}>
        <div className={style.title}>JewelShop</div>
        <div className={style.slogan}>Nâng Tầm thời trang của bạn</div>
      </div>
      <div>
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
          <Typography.Title className="text-center">
            Login Form
          </Typography.Title>
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
          <Form.Item>
            <span className="ms-5">
              Chưa có tài khoản?{" "}
              <span className={style.link} onClick={handleRegister}>
                Đăng ký
              </span>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
