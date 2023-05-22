import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Dropdown, MenuProps, Space } from "antd";
import { Menu, Input, Select } from "antd";
import Style from "./Navbar.module.css";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "@/hook/useAuthStore";
import findItems from "../../pages/products/findItems";
import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

import { useCartStore } from "../../hook/useCountStore";

const { Search } = Input;
type Props = {
  productsItems: any;
};
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
const API_URL_Product = `${URL_ENV}/products`;

function NavBar({ productsItems }: Props) {
  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);
  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;

  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [option, setOption] = useState<Array<any>>([]);

  const [items, setItems] = useState<Array<any>>([]);

  console.log("««««« user »»»»»", user);
  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();
  const addData = findItems((state) => state.addData);
  const curdata = findItems((state) => state.data);

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res: any) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [E_URL]);

  const handleNavigation = (path: any) => {
    // router.reload();
    router.push(path);
  };

  const onSearch = async (value: any) => {
    console.log("click");
    const data = await axios
      .get(`http://localhost:9000/products?productName=${value}`)
      .then((response) => {
        return response.data.results;
      });

    addData(data);
    console.log(curdata);
  };
  console.log(option);

  const itemsAccount = [
    {
      key: "information",
      label: (
        <div
          onClick={() => {
            router.push("/account");
          }}
        >
          <Space>
            <UserOutlined />
            <span>Information</span>
          </Space>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <Space>
            <LogoutOutlined />
            <span>Logout</span>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className={` ${Style.container}`}>
          <ul className={`${Style.listTop}`}>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/phone");
              }}
            >
              <div className="mb-2 ">
                <PhoneOutlined />
              </div>
              <div className={Style.items}>Điện Thoại</div>
            </li>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/Branch");
              }}
            >
              <div className="mb-2">
                <BranchesOutlined />
              </div>
              <span className={Style.items}>Chi nhánh</span>
            </li>
            <li
              className={`${Style.listTopIcon}`}
              onClick={() => {
                handleNavigation("/");
              }}
            >
              JewelShop
            </li>
            {auth && (
              <>
                <li
                  className={Style.listTopItem2}
                  onClick={() => {
                    handleNavigation("/cart");
                  }}
                >
                  <div className={Style.icon}>
                    <Badge count={itemsCart.length}>
                      <ShoppingCartOutlined
                        style={{ fontSize: 20, cursor: "pointer" }}
                      />
                    </Badge>
                  </div>
                </li>
                <li className={Style.listTopItem2}>
                  {" "}
                  <div className={Style.icon}>
                    {" "}
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsAccount.map((item) => (
                            <Menu.Item key={item.key}>{item.label}</Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      <Badge>
                        <UserOutlined
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                      </Badge>
                    </Dropdown>
                  </div>
                </li>
              </>
            )}
            {auth === null && (
              <>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/login");
                  }}
                >
                  <div className="mb-2">
                    <LoginOutlined />
                  </div>
                  <div className={Style.items}>Đăng nhập</div>
                </li>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/register");
                  }}
                >
                  <div className="mb-2">
                    <UserAddOutlined />
                  </div>
                  <div className={Style.items}>Đăng ký</div>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={Style.menuAnt}>
          <Menu
            mode="horizontal"
            className={Style.length}
            selectedKeys={[current]}
          >
            <Menu.Item
              key="products"
              onClick={() => handleNavigation("/products")}
            >
              Sản phẩm
            </Menu.Item>
            <Menu.Item key="collection">Bộ sưu tập </Menu.Item>
            <Menu.Item key="brand">Thương hiệu</Menu.Item>
            <Menu.Item key="contact">Liên hệ</Menu.Item>
          </Menu>
          <Search
            placeholder="input search text"
            style={{ margin: "10px 0px", width: 150 }}
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
