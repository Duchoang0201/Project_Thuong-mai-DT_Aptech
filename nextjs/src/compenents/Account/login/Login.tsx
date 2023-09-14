import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./index.module.css";
import { useAuthStore } from "@/hook/useAuthStore";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const onLogin = async (values: any) => {
    const { email, password } = values;
    const res = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    console.log(`🚀🚀🚀!..res`, res);
    if (res?.ok) {
      router.push("/");

      message.success("Đăng nhập thành công !!!");
    } else {
      message.error("Đăng nhập không thành công !!!");
    }
  };

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
              htmlType="submit"
              className="login-form-button bg-slate-800 text-white "
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
