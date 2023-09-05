"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useChat } from "../../../../hooks/useChat";
import { API_URL } from "../../../../constants/URLS";

const Header: React.FC<any> = ({ conversation }) => {
  const { conversationData } = useChat((state: any) => state);

  return (
    <>
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            to="/messages"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          ></Link>
          <Avatar
            size={40}
            src={`${API_URL}${conversationData?.employeeInfo?.imageUrl}`}
          />

          <div className="flex flex-col">
            <div>
              {conversationData?.employeeInfo?.firstName}{" "}
              {conversationData?.employeeInfo?.lastName}
            </div>
            <div className="text-sm font-light text-neutral-500">
              Don't know
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          // onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        />
      </div>
    </>
  );
};

export default Header;
