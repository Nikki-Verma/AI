"use client";

import { AuthHoc } from "@/HOC/AuthHoc";
import useChatStream from "@/Hooks/useChatStream";

import { Typography } from "antd";
import Link from "next/link";

const { Text } = Typography;

const Home = (props: any) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stopStream,
  } = useChatStream({
    options: {
      url: "http://192.168.1.95:8091/api/v1/intract/data/flux",
      method: "GET",
    },
    // This means that the user input will be sent as the body of the request with the key 'prompt' add.
    method: {
      type: "query",
      key: "prompt",
    },
  });

  return (
    <div>
      {messages.map((message, index) => (
        <div key={message.id}>
          <p>
            {message.role}: {message.content}
          </p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          disabled={isLoading}
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
        <button type="button" disabled={!isLoading} onClick={stopStream}>
          Stop
        </button>
        <Link href={"/dashboard"}>Dashboard</Link>
      </form>
    </div>
  );
};

export default AuthHoc(Home);
