import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Badge, Dropdown, MenuProps, Space } from "antd";
import { Menu, Input, Select } from "antd";
import Style from "./Navbar.module.css";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "@/hook/useAuthStore";

import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useCartStore } from "../../hook/useCountStore";

const { Search } = Input;
type Props = {};
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

function NavBar({}: Props) {
  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);
  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;

  const [user, setUser] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [findProduct, setFindProduct] = useState<Array<any>>([]);
  const [fresh, setFresh] = useState<number>(0);

  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${URL_ENV}/products`)
      .then((res) => {
        setFindProduct(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [fresh]);

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
    console.log("value: ", value);
    const data = await axios
      .get(`${URL_ENV}/products?productName=${value}`)
      .then((response) => {
        return response.data.results;
      });

    if (typeof value !== "undefined") {
      setFindProduct(data);
      router.push(`/products/${value}`);
      setFresh((pre) => pre + 1);
    }
  };

  const hanldeClear = async () => {
    const data = await axios.get(`${URL_ENV}/products`).then((response) => {
      return response.data.results;
    });
    setFindProduct(data);
  };
  const itemsCartList = itemsCart?.map((item: any) => ({
    key: item?.product?._id,
    label: (
      <Space>
        <Image
          src={`${URL_ENV}${item?.product?.imageUrl}`}
          alt={item?.product?.name}
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
            {user && (
              <>
                <li
                  className={Style.listTopItem1}
                  onClick={() => {
                    handleNavigation("/cart");
                  }}
                >
                  <div className={`${Style.icon}`}>
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
                        />{" "}
                        <span style={{ fontSize: 20 }} className={Style.items}>
                          Giỏ hàng
                        </span>
                      </Badge>
                    </Dropdown>
                  </div>
                </li>
                <li className={Style.listTopItem1}>
                  {" "}
                  <div className={Style.icon}>
                    {" "}
                    <Dropdown
                      overlay={
                        <Menu>
                          {itemsAccount.length > 0 &&
                            itemsAccount.map((item) => (
                              <Menu.Item key={item.key}>{item.label}</Menu.Item>
                            ))}
                        </Menu>
                      }
                      className="d-flex"
                    >
                      <Badge>
                        <UserOutlined
                          style={{ fontSize: 20, cursor: "pointer" }}
                        />
                        <span style={{ fontSize: 20 }} className={Style.items}>
                          Cá nhân
                        </span>
                      </Badge>
                    </Dropdown>
                  </div>
                </li>
              </>
            )}
            {user === null && (
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

          <Select
            allowClear
            style={{ width: "125px", marginTop: "5px" }}
            placeholder="Search"
            optionFilterProp="children"
            onChange={onSearch}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={findProduct.map((item: any, index: any) => {
              return {
                label: `${item.name}`,
                value: item._id,
              };
            })}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
