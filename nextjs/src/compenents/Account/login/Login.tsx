import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./index.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useAuthStore } from "@/hook/useAuthStore";
import Link from "next/link";

const Login = () => {
  const { login } = useAuthStore((state: any) => state);
  const { auth } = useAuthStore((state: any) => state);
  const [refresh, setRefresh] = useState(0);
  const router = useRouter();
  const onLogin = async (values: any) => {
    const { email, password } = values;
    login({ email, password });
  };
  useEffect(() => {}, [refresh]);

  return (
    <div className={`${style.root} `}>
      <div className={style.brand}>
        <div className={style.title}>JewelShop</div>
        <div className={style.slogan}>Nâng Tầm thời trang của bạn</div>
      </div>
      <div>
        <Form
          title="ád"
          name="basic"
          className={` login-form ${style.form__border}`}
          initialValues={{ remember: true }}
          onFinish={onLogin}
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          autoComplete="off"
        >
          <div className="text-center py-2">
            <h3>Đăng nhập tài khoản</h3>{" "}
          </div>
          <Form.Item
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 16,
            }}
            label="Email"
            name="email"
            rules={[
              { type: "email" },
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 16,
            }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="text-end py-3">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link href="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
