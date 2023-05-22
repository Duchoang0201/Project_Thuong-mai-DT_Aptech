import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Space } from "antd";
import { Menu, Input } from "antd";
import Style from "./Navbar.module.css";
// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import {} from "react-icons/ai";
import { useAuthStore } from "@/hook/useAuthStore";
import Image from "next/image";

import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { useCartStore } from "../../hook/useCountStore";

const { Search } = Input;
type Props = {};

function NavBar({}: Props) {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const [refresh, setRefresh] = useState<any>();

  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);

  console.log("««««« itemsCart »»»»»", itemsCart);

  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;
  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();

  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res: any) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [E_URL, auth]);

  useEffect(() => {
    setUser(null);
  }, [refresh]);

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  const onSearch = (value: any) => {
    axios.get(`${URL_ENV}/products?productName=${value}`).then((response) => {
      router.push(`products/${response.data.results[0]._id}`);
    });
  };
  const itemsCartList = itemsCart?.map((item: any) => ({
    key: item?.product?._id,
    label: (
      <Space>
        <Image
          src={`${URL_ENV}${item.product?.imageUrl}`}
          alt={item.product?.name}
          width={50}
          height={50}
        />
        <span>{item?.product?.name}</span>
      </Space>
    ),
  }));
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
            setRefresh((f: any) => f + 1);
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
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(27,57,99,1) 19%, rgba(157,164,167,1) 51%, rgba(27,57,99,1) 78%)",
          }}
          // className={` ${Style.container}`}
          className="text-white"
        >
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
            {user ? (
              <>
                <li
                  className={Style.listTopItem2}
                  onClick={() => {
                    handleNavigation("/cart");
                  }}
                >
                  <div className={Style.icon}>
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsCartList.map((item: any, index: any) => (
                            <Menu.Item key={index}>{item.label}</Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      <Badge className="" count={itemsCart.length}>
                        <ShoppingCartOutlined
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                      </Badge>
                    </Dropdown>
                  </div>
                </li>
                <li className={Style.listTopItem2}>
                  {" "}
                  <div className={Style.icon}>
                    {" "}
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsAccount.map((item, index) => (
                            <Menu.Item key={index}>{item.label}</Menu.Item>
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
            ) : (
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

        <div className={`${Style.menuAnt}`}>
          <Menu
            mode="horizontal"
            className={`${Style.length} `}
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
            placeholder="Tìm kiếm sản phẩm"
            style={{ margin: "10px 0px", width: 150 }}
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
