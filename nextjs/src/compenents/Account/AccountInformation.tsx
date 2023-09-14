import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Input,
  Row,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API_URL } from "@/contants/URLS";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/libraries/axiosAuth";
import { axiosClient } from "@/libraries/axiosConfig";

type Props = {};
const { Text } = Typography;
const AccountInformation = (props: Props) => {
  const axiosAuth = useAxiosAuth();
  const countTimeout = useRef<any>();

  const [refresh, setRefresh] = useState(0);
  const { data: session, status, update } = useSession();
  const user = session?.user;

  const [disabled, setDisabled] = useState(true);
  const [disabledNewPassword, setDisabledNewPassword] = useState(true);

  //SetPassword:
  const timeoutOldPass = useRef<any>();
  const timeoutNewPass = useRef<any>();
  const [oldPassWord, setOldPassWord] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //Function change data
  const handleChangeData = async (data: any) => {
    await update(data);

    axiosAuth
      .patch(`/customers/${user?._id}`, data)
      .then(async (res) => {
        if (countTimeout.current) {
          clearTimeout(countTimeout.current);
        }
        countTimeout.current = setTimeout(async () => {
          message.success(
            `Change last name to ${res.data.lastName} successfully!!`,
            1.5
          );

          setRefresh((f) => f + 1);
          setDisabled(!disabled);
        }, 2000);

        message.loading("Changing First Name !!", 1.5);
      })
      .catch((err) => console.log(err));
  };

  const arrData = [
    {
      key: 1,
      header: "First Name",
      placeholder: user?.firstName,
      field: "firstName",
    },
    {
      key: 2,
      header: "Last Name",
      placeholder: user?.lastName,
      field: "lastName",
    },
    {
      key: 3,
      header: "Address",
      placeholder: user?.address,
      field: "address",
    },
    {
      key: 4,
      header: "Phone Number",
      placeholder: user?.phoneNumber,
      field: "phoneNumber",
    },
    {
      key: 5,
      header: "User Name (Email)",
      placeholder: user?.email,
      field: "email",
    },
    // {
    //   key: 5,
    //   header: "User Name (Email)",
    //   placeholder: user?.email,
    // },
  ];
  return (
    <>
      <div
        className="flex flex-col md:flex-row"
        style={{ backgroundColor: "white" }}
      >
        <div className="w-auto md:w-1/3 ">
          <Card bordered={true} style={{ width: "100%" }}>
            <div className="text-center">
              <Avatar
                shape="square"
                size={100}
                src={`${API_URL}${user?.imageUrl}`}
              />
              <div className="py-2">
                <Upload
                  showUploadList={false}
                  name="file"
                  action={`${API_URL}/upload/customers/${user?._id}/image`}
                  headers={{ authorization: "authorization-text" }}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file);
                    }

                    if (info.file.status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      );

                      setTimeout(() => {
                        console.log("««««« run »»»»»");
                        setRefresh(refresh + 1);
                      }, 1000);
                    } else if (info.file.status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />} />
                </Upload>
              </div>
              <p className="py-2">
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className="text-left">
              {" "}
              <p>
                <MailOutlined /> <Text className="px-2">{user?.email}</Text>
              </p>
              <p>
                <PhoneOutlined />{" "}
                <Text className="px-2">{user?.phoneNumber}</Text>
              </p>
              <p>
                <HomeOutlined /> <Text className="px-2">{user?.address}</Text>
              </p>
            </div>

            <Divider>More Information</Divider>
          </Card>
        </div>
        <div className="w-auto md:w-2/3 " title="Cài đặt tài khoản">
          <Card bordered={true}>
            <div>
              <Collapse accordion>
                {arrData.map((item, index) => {
                  const dataChange: { [key: string]: any } = {};
                  return (
                    <Collapse.Panel header={item.header} key={item.key}>
                      <Row gutter={10} className="py-2">
                        <Col span={20}>
                          <Input.Search
                            disabled={disabled}
                            enterButton={<SendOutlined />}
                            placeholder={item.placeholder}
                            style={{ width: "100%" }}
                            onSearch={async (e) => {
                              dataChange[item.field] = e;
                              handleChangeData(dataChange);
                            }}
                          />
                        </Col>

                        <Col span={4}>
                          <Button
                            danger={!disabled}
                            type="dashed"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setDisabled(!disabled);
                            }}
                          />
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  );
                })}

                <Collapse.Panel header="Password" key="6">
                  Đổi mật khẩu{" "}
                  <Button
                    danger={!disabled}
                    type="dashed"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setDisabled(!disabled);
                    }}
                  />{" "}
                  <div>
                    Nhập mật khẩu cũ:
                    <div className="">
                      <div className="">
                        <Space>
                          <Input.Password
                            disabled={disabled}
                            value={oldPassWord}
                            placeholder={`********`}
                            style={{ width: "100%" }}
                            onChange={(e) => setOldPassWord(e.target.value)}
                          />
                          <Button
                            disabled={disabled}
                            onClick={async (e) => {
                              axiosClient
                                .post(`/customers/login`, {
                                  email: user?.email,
                                  password: oldPassWord,
                                })
                                .then((res) => {
                                  if (res.data.token) {
                                    message.success(
                                      "Confirmed pre password sucessfully !!, Please enter New PassWord",
                                      1.5
                                    );
                                    setOldPassWord("");

                                    if (timeoutOldPass.current) {
                                      clearTimeout(timeoutOldPass.current);
                                    }
                                    timeoutOldPass.current = setTimeout(() => {
                                      setDisabled(!disabled);
                                      setDisabledNewPassword(false);
                                    }, 2000);
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                  message.error(`${err?.response?.data} `);
                                });
                            }}
                            icon={<SendOutlined />}
                          />
                        </Space>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="py-2">
                      Mật khẩu mới:
                      <div>
                        <Space>
                          <Input.Password
                            disabled={disabledNewPassword}
                            placeholder={`********`}
                            value={newPassword}
                            style={{ width: "100%" }}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                          />
                          <Button
                            disabled={disabledNewPassword}
                            onClick={async (e: any) => {
                              axiosAuth
                                .patch(`/customers/${user?._id}`, {
                                  password: newPassword,
                                })
                                .then((res) => {
                                  message.loading("Changing Password !!", 1.5);
                                  if (timeoutNewPass.current) {
                                    clearTimeout(timeoutNewPass.current);
                                  }
                                  timeoutNewPass.current = setTimeout(() => {
                                    message.success(
                                      `Change Password  successfully!!`,
                                      1.5
                                    );
                                    setNewPassword("");
                                    setRefresh((f) => f + 1);
                                    setDisabled(true);
                                    setDisabledNewPassword(
                                      !disabledNewPassword
                                    );
                                  }, 2000);
                                })
                                .catch((err) => {
                                  console.log(err);
                                  message.error(
                                    `${err?.response?.data?.message}`
                                  );
                                });
                            }}
                            icon={<SendOutlined />}
                          />
                        </Space>
                      </div>
                    </div>
                  </div>
                </Collapse.Panel>
              </Collapse>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountInformation;
