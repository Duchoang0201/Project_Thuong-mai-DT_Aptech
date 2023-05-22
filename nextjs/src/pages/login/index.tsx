import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
  Select,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
          name="basic"
          className={` login-form ${style.form__border}`}
          initialValues={{ remember: true }}
          onFinish={onLogin}
          onFinishFailed={(errorInfo: any) => {
            console.log("Failed:", errorInfo);
          }}
          autoComplete="off"
        >
          <Form.Item
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <a href="" onClick={handleRegister}>
              register now!
            </a>
          </Form.Item>
        </Form>
        {/* //////////////////////// */}
      </div>
    </div>
  );
};

export default Login;
