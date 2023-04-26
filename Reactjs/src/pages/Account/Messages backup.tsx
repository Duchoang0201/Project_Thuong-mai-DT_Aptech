import { Button, Card, Col, Input, List, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import axios from "axios";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import { format } from "timeago.js";
interface Conversation {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Messages: React.FC = () => {
  //Get conversation
  const [conversations, setConversations] = useState<any>([]);
  //Data
  const [dataUserMenu, setDataUserMenu] = useState<any[]>([]);

  //Get Meessage
  const [messages, setMessages] = useState<any[any]>([]);

  const [newMessages, setNewMessages] = useState<any[any]>([]);
  //Create a New Message
  //loading
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthStore((state: any) => state);

  //active tab key
  const [activeTabKey1, setActiveTabKey1] = useState<string>("");

  //Reset input
  //Get conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/conversations/${auth.payload._id}`
        );
        setConversations(res.data);
        setLoading(true);
      } catch (err) {}
    };
    getConversations();
  }, [auth.payload._id]);

  //GET Menu user to chat

  useEffect(() => {
    const friendId = conversations.flatMap((object: { members: any[] }): any =>
      object.members.filter((memberId: any) => memberId !== auth.payload._id)
    );
    const query = friendId
      .map((employeeId: string) => `employeeId=${employeeId}`)
      .join("&");
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/employees?${query}`);
        console.log("««««« res.data »»»»»", res.data);
        setDataUserMenu(res.data.results);
      } catch (error) {}
    };
    getUser();
  }, [auth.payload._id, conversations]);

  //Function Get ConversationId back

  const member1 = `${auth.payload._id}`;
  const member2 = `${activeTabKey1}`;
  function getConversationIdByMembers(
    conversations: Conversation[],
    member1: string,
    member2: string
  ): string | null {
    const conversation = conversations.find(
      (conv) => conv.members.includes(member1) && conv.members.includes(member2)
    );
    return conversation ? conversation._id : null;
  }

  const conversationId = getConversationIdByMembers(
    conversations,
    member1,
    member2
  );

  const handleSendMessages = async (e: any) => {
    e.preventDefault();
    const messageSend = {
      sender: auth.payload._id,
      text: newMessages,
      conversationId: conversationId,
    };
    try {
      const res = await axios.post(
        "http://localhost:9000/messages",
        messageSend
      );

      setMessages([...messages, res.data]);
      console.log("««««« messages »»»»»", messages);
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  };

  //GET MESSAGE
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/messages/${conversationId}`
        );
        setMessages(res.data);
      } catch (error) {}
    };
    getMessages();
  }, [activeTabKey1, conversationId, messages]);
  //For scroll when scroll down menu user
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 400) {
    }
  };

  /// PART OF CHATBOX

  const tabList = dataUserMenu
    .map((item) => ({
      key: item._id,
      tab: `${item.firstName} ${item.lastName}`,
    }))
    .filter((item: any) => item.key === activeTabKey1);
  // console.log(
  //   dataUserMenu.map((item) => ({ key: item.firstName, tab: item.lastName }))
  // );

  const contentList: Record<string, React.ReactNode> = {
    [activeTabKey1]: (
      <div onScroll={onScroll}>
        {messages.map((item: any) => (
          <>
            {item?.employee?._id === auth.payload._id ? (
              <div className="text-end">
                <h6 className="Name text-primary py-2">
                  <UserOutlined /> Me
                </h6>{" "}
                <h4
                  className="text-end px-3 border border-primary rounded-pill "
                  style={{ width: "50%", marginLeft: "520px" }}
                >
                  {item.text}
                </h4>{" "}
                <div className="messageBottom px-3">
                  {format(item.createdAt)}
                </div>
              </div>
            ) : (
              <div className="">
                <h6 className="Name text-danger py-2">
                  {" "}
                  <UserOutlined /> {item?.employee?.firstName}{" "}
                  {item?.employee?.lastName}
                </h6>
                <h4 className="text px-3 border border-danger w-50 rounded-pill ">
                  {item.text}
                </h4>{" "}
                <div className="messageBottom px-3">
                  {format(item.createdAt)}
                </div>
              </div>
            )}
          </>
        ))}
        <Space.Compact key={activeTabKey1} style={{ width: "100%" }}>
          <Input
            onChange={(e: any) => setNewMessages(e.target.value)}
            placeholder="Input text"
          />
          <Button
            onClick={handleSendMessages}
            style={{ width: "50px" }}
            icon={<SendOutlined />}
            type="primary"
          ></Button>
        </Space.Compact>
      </div>
    ),
  };
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {!loading ? (
          <Card style={{ width: 300, marginTop: 16 }} loading={true}></Card>
        ) : (
          <Row>
            <Col span={18} push={6}>
              {activeTabKey1 ? (
                <Card
                  style={{ width: "100%" }}
                  title="Chat Box"
                  extra={<a href="#">More</a>}
                  tabList={tabList}
                  activeTabKey={activeTabKey1}
                  onTabChange={onTab1Change}
                >
                  {contentList[activeTabKey1]}
                </Card>
              ) : (
                <div></div>
              )}
            </Col>
            <Col span={5} pull={18}>
              <List>
                <VirtualList
                  data={dataUserMenu}
                  height={400}
                  itemHeight={47}
                  itemKey="email"
                  onScroll={onScroll}
                >
                  {(item: any) => (
                    <List.Item key={item._id}>
                      <Button
                        onClick={() => setActiveTabKey1(item._id)}
                        className="text-start"
                        style={{ width: "300px", height: "auto" }}
                      >
                        <List.Item.Meta
                          // avatar={<Avatar src={item.picture.large} />}
                          avatar={<UserOutlined />}
                          title={
                            <div>
                              {" "}
                              {item.firstName}
                              <span> </span>
                              {item.lastName}
                            </div>
                          }
                          description={item.email}
                        />
                      </Button>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Messages;
