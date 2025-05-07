import React, { useEffect, useState } from "react";
import user_logo from "../../assets/user-circle.svg";
import Input from "../../components/input";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, user) => {
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    console.log("resData :>>", resData);
    setMessages({ messages: resData, receiver: user, conversationId });
  };

  const sendMessage = async (e) => {
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
    setMessage("");
  };

  return (
    <div className="w-screen flex">
      {/* Sidebar */}
      <div className="w-[25%] h-screen bg-[#f3f5ff]">
        <div className="flex items-center my-8 mx-14">
          <div className="border border-[#1376ff] p-[1px] rounded-full">
            <img src={user_logo} width={65} height={65} alt="User" />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user?.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-[#1476ff] text-lg mb-4">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => (
                <div
                  key={conversationId}
                  onClick={() => fetchMessages(conversationId, user)}
                  className="flex item-center py-8 border-b border-b-gray-300"
                >
                  <div className="cursor-pointer flex items-center">
                    <div>
                      <img src={user_logo} alt="" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {user?.fullName}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversation
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-[50%] h-screen flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-[#f3f5ff] h-[80px] my-14 rounded-full flex items-center px-14 shadow-lg py-2">
            <div className="cursor-pointer">
              <img src={user_logo} width={60} height={60} alt="user_logo" />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">{messages?.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
              >
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 6h6m-3 -3v6" />
              </svg>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="h-[75%] w-full overflow-y-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }, index) => {
                return (
                  <div
                    key={index}
                    className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                      id === user?.id
                        ? "bg-[#1476ff] text-white rounded-tl-xl ml-auto"
                        : "bg-[#f3f5ff] rounded-tr-xl"
                    }`}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}

        {messages?.receiver?.fullName && (
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="Type a message......"
              className="input-width"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputClassName="p-4 border-0 shadow-md bg-[#f9faff] rounded-full focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-[#f9faff] rounded-full ${
                !message & "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="30"
                height="30"
              >
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-[#f9faff] rounded-full ${
                !message & "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
              >
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar Placeholder */}
      <div className="w-[25%] h-screen bg-light px-8 py-16">
        <div className="text-[#1476ff] text-lg">People</div>
        <div>
          {users.length > 0 ? (
            users.map(({ userId, user }) => {
              return (
                <div
                  key={userId}
                  className="flex item-center py-8 border-b border-b-gray-300"
                >
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => fetchMessages("new", user)}
                  >
                    <div>
                      <img src={user_logo} alt="" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {user?.fullname}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No Conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
