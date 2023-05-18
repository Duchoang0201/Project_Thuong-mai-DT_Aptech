import React, { useEffect, useState } from "react";
import { Badge, Dropdown, MenuProps, Space } from "antd";
import { Menu, Input } from "antd";
import Style from "./Navbar.module.css";
import { useRouter } from "next/router";
import {} from "react-icons/ai";
import { useAuthStore } from "@/hook/useAuthStore";
import {
  HomeOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { useCartStore } from "@/hook/useCountStore";

const { Search } = Input;
type Props = {};

function NavBar({}: Props) {
  const { auth }: any = useAuthStore((state: any) => state);
  const { items: itemsCart }: any = useCartStore((state: any) => state);
  const E_URL = `http://localhost:9000/customers/${auth?.payload?._id}`;

  const [user, setUser] = useState<any>();

  console.log("««««« user »»»»»", user);
  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res: any) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [E_URL]);

  const handleNavigation = (path: any) => {
    router.push(path);
  };
  const items: MenuProps["items"] = [
    {
      label: "Trang sức",
      key: "Trangsuc",
      children: [
        {
          type: "group",
          label: "Vàng",
          children: [
            {
              label: "Nhẫn vàng",
              key: "setting:1",
            },
            {
              label: "Vòng vàng",
              key: "setting:2",
            },
            {
              label: "Dây chuyền vàng",
              key: "setting:3",
            },
          ],
        },
        {
          type: "group",
          label: "Bạc",
          children: [
            {
              label: "Nhẫn bạc",
              key: "setting:4",
            },
            {
              label: "Vòng bạc",
              key: "setting:5",
            },
            {
              label: "Dây chuyền bạc",
              key: "setting:6",
            },
          ],
        },
      ],
    },
    {
      label: "Đồng hồ",
      key: "app",
      children: [
        {
          type: "group",
          label: "Vàng",
          children: [
            {
              label: "Đồng hồ vàng",
              key: "setting:1",
            },
          ],
        },
        {
          type: "group",
          label: "Bạc",
          children: [
            {
              label: "Đồng hồ bạc",
              key: "setting:2",
            },
          ],
        },
      ],
    },
    {
      label: "Hot trong tháng",
      key: "Hot",
    },
    {
      label: "Khuyến mãi",
      key: "Discount",
    },
    {
      label: "Thương hiệu",
      key: "Us",
    },
  ];

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
          <ul className={`nav justify-content-center`}>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/phone");
              }}
            >
              <div className={Style.icon}>
                <div>
                  <PhoneOutlined />
                  <span className={Style.icon}>Điện Thoại</span>
                </div>
              </div>
            </li>
            <li
              className={Style.listTopItem2}
              onClick={() => {
                handleNavigation("/Branch");
              }}
            >
              <div className={Style.icon}>
                <div>
                  <HomeOutlined />
                  <span className={`style.icon`}>Chi nhánh</span>
                </div>
              </div>
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
                <li className={Style.listTopItem2}>
                  <Link className="nav-link" href="/login">
                    Đăng nhập
                  </Link>
                </li>
                <li className={Style.listTopItem2}>
                  <Link className="nav-link" href="/register">
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={Style.menuAnt}>
          <Menu style={{ width: "35%" }} mode="horizontal" items={items} />
          <Search
            placeholder="input search text"
            style={{ margin: "10px", width: 200 }}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
