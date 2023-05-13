import axios from "axios";
import React from "react";

import type { MenuProps } from "antd";
import { Menu, Input, Space } from "antd";
import { useState } from "react";
import Style from "./NavBar.module.css";
import { useRouter } from "next/router";
import {
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlineDownCircle,
  AiOutlineShopping,
  AiOutlineApartment,
  AiOutlinePhone,
} from "react-icons/ai";
import { useAuthStore } from "@/hook/useAuthStore";
import {
  HomeOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
const { Search } = Input;
type Props = {};

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
    // disabled: true,
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
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: "alipay",
  // },
];

function NavBar({}: Props) {
  const { auth } = useAuthStore((state: any) => state);
  const { logout } = useAuthStore((state: any) => state);

  const [find, setFind] = useState<string>("");
  const router = useRouter();

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  const handleChange = (e: any) => {
    console.log(e);
    setFind(e);
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.titleSmall}>JewelShop</div>
        <div>
          <ul className={Style.listTop}>
            <li
              className={Style.listTopItem1}
              onClick={() => {
                handleNavigation("/phone");
              }}
            >
              <div className={Style.icon}>
                <PhoneOutlined />
              </div>
              <span>Điện Thoại</span>

              <link />
            </li>
            <li
              className={Style.listTopItem1}
              onClick={() => {
                handleNavigation("/Branch");
              }}
            >
              <div className={Style.icon}>
                <HomeOutlined />
              </div>
              <span>Chi nhánh</span>
            </li>
            <li
              className={Style.listTopIcon}
              onClick={() => {
                handleNavigation("/");
              }}
            >
              JewelShop
            </li>
            {auth && (
              <li
                className={Style.listTopItem2}
                onClick={() => {
                  handleNavigation("/cart");
                }}
              >
                <div className={Style.icon}>
                  <ShoppingCartOutlined />
                </div>
                <span>Giỏ hàng</span>
              </li>
            )}
            {auth ? (
              <li
                className={Style.listTopItem2}
                onClick={() => {
                  logout();
                }}
              >
                <div className={Style.icon}>
                  <AiOutlineLogin />
                </div>
                <span>Đăng Xuất</span>
              </li>
            ) : (
              <>
                <li
                  className={Style.listTopItem2}
                  onClick={() => {
                    handleNavigation("/login");
                  }}
                >
                  <div className={Style.icon}>
                    <AiOutlineLogin />
                  </div>
                  <span>Đăng nhập</span>
                </li>
                <li
                  className={Style.listTopItem2}
                  onClick={() => {
                    handleNavigation("/register");
                  }}
                >
                  <div className={Style.icon}>
                    <TeamOutlined />
                  </div>
                  <span>Đăng ký</span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={Style.menuAnt}>
          <Menu
            style={{ width: "35%" }}
            // onClick={onClick}
            // selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <Search
            placeholder="input search text"
            // onSearch={onSearch}
            style={{ margin: "10px", width: 200 }}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
