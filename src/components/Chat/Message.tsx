"use client";

import { userCredentialsFromName } from "@/utils/helperFunction";
import { Typography } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import MarkdownComponent from "../Markdown";
import { IconContainer, MessageContainer, PromptContainer } from "./style";

const { Paragraph } = Typography;

type Props = {
  message: any;
  loading: boolean;
};

function Message({ message, loading }: Props) {
  const isUser = message?.role === "user";
  const { data: session, status }: any = useSession();
  console.log("🚀 ~ Message ~ status:", status);
  console.log("🚀 ~ Message ~ session:", session);
  return (
    <MessageContainer role={message?.role}>
      {isUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "#000",
              opacity: "0.6",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            You
          </span>
          <IconContainer>
            {userCredentialsFromName(session?.user?.details?.name)}
          </IconContainer>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Image
            src={"/assets/Logos/simplaiLogo.svg"}
            height={25}
            width={25}
            alt=""
          />
          <span
            style={{
              color: "#000",
              opacity: "0.6",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            SimplAI
          </span>
        </div>
      )}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "2px",
          }}
        >
          <Image
            src={"/assets/Images/chatLoading.gif"}
            alt="loading"
            width={40}
            height={28}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Generating answers for you...
          </span>
        </div>
      ) : (
        <PromptContainer role={message?.role}>
          <span>
            {message?.content ? (
              <>
                <MarkdownComponent markdown={message?.content} />
              </>
            ) : (
              ""
            )}
          </span>
        </PromptContainer>
      )}
    </MessageContainer>
  );
}

export default Message;
