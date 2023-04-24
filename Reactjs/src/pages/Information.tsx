import React, { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Typography,
  message,
} from "antd";
import {
  EditFilled,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

type Props = {};
const { Panel } = Collapse;
const { Text } = Typography;

//Component

const Information = (props: Props) => {
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState<any>();
  const tabListNoTitle = [
    {
      key: "setting",
      tab: "Profile setting",
    },
  ];
  const [selectItem, setSelectItem] = useState("0");
  const [updateData, setUpdateData] = useState<any>();
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const { auth } = useAuthStore((state: any) => state);

  const E_URL = `http://localhost:9000/employees?employeeId=${auth.payload._id}`;

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res) => {
        setUser(res.data.results[0]);
      })
      .catch((err) => console.log(err));
  }, [E_URL, refresh]);
  const [updateForm] = Form.useForm();

  const handleUpdate = (record: any) => {
    const confirmData = { [selectItem]: updateData[selectItem] };
    console.log("««««« confirmData »»»»»", confirmData);
    updateForm.resetFields();
    axios
      .patch(`http://localhost:9000/employees/${auth.payload._id}`, confirmData)
      .then((res) => {
        console.log(res);
        setRefresh((f) => f + 1);
        message.success("Update a data successFully!!", 1.5);
      })
      .catch((err) => console.log(err));
  };
  const contentListNoTitle: Record<string, React.ReactNode> = {
    setting: (
      <Form
        className="container px-5"
        form={updateForm}
        name="updateForm"
        onFinish={setUpdateData}
      >
        <div>
          <Collapse accordion onChange={onChange}>
            <Panel header="First Name" key="1">
              <Form.Item name="firstName" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder={`(${user?.firstName})`}
                />
              </Form.Item>
              <Popconfirm
                title="Edit profile"
                description="Are you sure to edit this Fisrt Name?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleUpdate}
              >
                <Button
                  style={{ width: "30px", right: "-4px" }}
                  type="primary"
                  htmlType="submit"
                  icon={<EditFilled />}
                  onClick={() => {
                    setSelectItem("firstName");
                  }}
                />
              </Popconfirm>
            </Panel>
            <Panel header="Last Name" key="2">
              <Form.Item name="lastName" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder={`(${user?.lastName})`}
                />
              </Form.Item>
              <Popconfirm
                title="Edit profile"
                description="Are you sure to edit this Last Name?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleUpdate}
              >
                <Button
                  style={{ width: "30px", right: "-4px" }}
                  type="primary"
                  htmlType="submit"
                  icon={<EditFilled />}
                  onClick={() => {
                    setSelectItem("lastName");
                  }}
                />
              </Popconfirm>
            </Panel>
            <Panel header="Address" key="3">
              <Form.Item name="address" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder={`(${user?.address})`}
                />
              </Form.Item>
              <Popconfirm
                title="Edit profile"
                description="Are you sure to edit this Address?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleUpdate}
              >
                <Button
                  style={{ width: "30px", right: "-4px" }}
                  type="primary"
                  htmlType="submit"
                  icon={<EditFilled />}
                  onClick={() => {
                    setSelectItem("address");
                  }}
                />
              </Popconfirm>
            </Panel>
            <Panel header="Phone Number" key="4">
              <Form.Item name="phoneNumber" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder={`(${user?.phoneNumber})`}
                />
              </Form.Item>
              <Popconfirm
                title="Edit profile"
                description="Are you sure to edit this Phone Number?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleUpdate}
              >
                <Button
                  style={{ width: "30px", right: "-4px" }}
                  type="primary"
                  htmlType="submit"
                  icon={<EditFilled />}
                  onClick={() => {
                    setSelectItem("phoneNumber");
                  }}
                />
              </Popconfirm>
            </Panel>
            <Panel header="User Name (Email)" key="5">
              <Form.Item name="email" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder={`(${user?.email})`}
                />
              </Form.Item>
              <Popconfirm
                title="Edit profile"
                description="Are you sure to edit this User Name (Email)?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleUpdate}
              >
                <Button
                  style={{ width: "30px", right: "-4px" }}
                  type="primary"
                  htmlType="submit"
                  icon={<EditFilled />}
                  onClick={() => {
                    setSelectItem("email");
                  }}
                />
              </Popconfirm>
            </Panel>
          </Collapse>
        </div>
      </Form>
    ),
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {!user ? (
          <Card style={{ width: 300, marginTop: 16 }} loading={true}></Card>
        ) : (
          <Row>
            <Col span={18} push={6}>
              <Card
                style={{ width: "100%" }}
                tabList={tabListNoTitle}
                activeTabKey={"setting"}
                // onTabChange={onTabChange}
              >
                {contentListNoTitle["setting"]}
              </Card>
            </Col>
            <Col span={5} pull={18}>
              <Card bordered={false} style={{ width: 300 }}>
                <div className="text-center">
                  <Avatar size={64} icon={<UserOutlined />} />
                  <p className="py-2">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="text-left">
                  {" "}
                  <p>
                    <MailOutlined /> <Text className="px-2">{user.email}</Text>
                  </p>
                  <p>
                    <PhoneOutlined />{" "}
                    <Text className="px-2">{user.phoneNumber}</Text>
                  </p>
                  <p>
                    <HomeOutlined />{" "}
                    <Text className="px-2">{user.address}</Text>
                  </p>
                </div>

                <Divider>More Information</Divider>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Information;
