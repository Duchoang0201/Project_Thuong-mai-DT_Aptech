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
  Row,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import {
  EditFilled,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

type Props = {};
const { Panel } = Collapse;
const { Text } = Typography;

//Component

const Information = (props: Props) => {
  const [user, setUser] = useState<any>();
  const tabListNoTitle = [
    // {
    //   key: "article",
    //   tab: "article",
    // },
    // {
    //   key: "app",
    //   tab: "General",
    // },
    {
      key: "setting",
      tab: "Setting",
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const { auth } = useAuthStore((state: any) => state);

  const E_URL = `http://localhost:9000/employees?employeeId=${auth.payload._id}`;

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res) => {
        setUser(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);
  const [updateForm] = Form.useForm();

  const handleUpdate = (record: any) => {
    console.log(record);
  };
  const contentListNoTitle: Record<string, React.ReactNode> = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    setting: (
      <Form
        className="container px-5"
        form={updateForm}
        name="updateForm"
        onFinish={handleUpdate}
      >
        <div>
          <Collapse onChange={onChange}>
            <Panel header="First Name" key="1">
              <Form.Item name="firstName" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input First Name"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
            <Panel header="Last Name" key="2">
              <Form.Item name="lastName" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input First Name"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
            <Panel header="Address" key="3">
              <Form.Item name="address" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input Address"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
            <Panel header="Phone Number" key="4">
              <Form.Item name="phoneNumber" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input Phone Number"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
            <Panel header="User Name (Email)" key="5">
              <Form.Item name="email" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input Email"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
            <Panel header="Account Password" key="6">
              <Form.Item name="password" noStyle>
                <Input
                  style={{ width: 160 }}
                  placeholder="Please input Password"
                />
              </Form.Item>
              <Button
                style={{ width: "30px", right: "-4px" }}
                type="primary"
                htmlType="submit"
                icon={<EditFilled />}
              />
            </Panel>
          </Collapse>
        </div>
      </Form>
    ),
  };
  updateForm.setFieldsValue(auth.payload);

  //Function change Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("setting");
  // const onTabChange = (key: string) => {
  //   if (key === "setting") {
  //     setActiveTabKey(key);
  //   } else {
  //     setActiveTabKey(key);
  //   }
  // };

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {!user ? (
          <Card style={{ width: 300, marginTop: 16 }} loading={true}></Card>
        ) : (
          <Row>
            <Col span={18} push={5}>
              <Card
                style={{ width: "100%" }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                // onTabChange={onTabChange}
              >
                {contentListNoTitle[activeTabKey]}
              </Card>
            </Col>
            <Col span={5} pull={18}>
              <Card bordered={false} style={{ width: 300 }}>
                <div className="text-center">
                  <Avatar size={64} icon={<UserOutlined />} />
                  <p className="py-2">
                    {auth?.payload.firstName} {auth?.payload.lastName}
                  </p>
                </div>
                <div className="text-left">
                  {" "}
                  <p>
                    <MailOutlined />{" "}
                    <Text className="px-2">{auth?.payload.email}</Text>
                  </p>
                  <p>
                    <PhoneOutlined />{" "}
                    <Text className="px-2">{auth?.payload.phoneNumber}</Text>
                  </p>
                  <p>
                    <HomeOutlined />{" "}
                    <Text className="px-2">{auth?.payload.address}</Text>
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
