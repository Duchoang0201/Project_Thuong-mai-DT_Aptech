import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Input } from "antd";
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
  CarOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";

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

function NavBar({}: Props) {
  const { auth } = useAuthStore((state: any) => state);
  const { logout } = useAuthStore((state: any) => state);

  const router = useRouter();

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  // Use a state to track the initial rendering
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const renderAuthLinks = (): React.ReactNode => {
    if (!isHydrated) {
      // Server-side rendering
      return null;
    }

    if (auth) {
      return (
        <>
          <li
            className={Style.listTopItem2}
            onClick={() => {
              logout();
            }}
          >
            <div className={Style.icon}>
              <ShoppingCartOutlined />
            </div>
            <span>Giỏ Hàng</span>
          </li>
          <li
            className={Style.listTopItem2}
            onClick={() => {
              logout();
            }}
          >
            <div className={Style.icon}></div>
            <span>Đăng Xuất</span>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={Style.listTopItem2}>
            <Link href="/login">Đăng nhập</Link>
          </li>
          <li className={Style.listTopItem2}>
            <Link href="/register">Đăng ký</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <div className={`${Style.container}`}>
        <div className={`${Style.titleSmall}`}>JewelShop</div>
        <div>
          <ul className={`${Style.listTop}`}>
            <li
              className={Style.listTopItem1}
              onClick={() => {
                handleNavigation("/phone");
              }}
            >
              <div className={Style.icon}></div>
              <span>Điện Thoại</span>
            </li>
            <li
              className={Style.listTopItem1}
              onClick={() => {
                handleNavigation("/Branch");
              }}
            >
              <div className={Style.icon}></div>
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
            {renderAuthLinks()}
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
