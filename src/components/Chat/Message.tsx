"use client";

import { motion } from "framer-motion";
import { IconContainer, MessageContainer, PromptContainer } from "./style";
import Image from "next/image";

type Props = {
  message: any;
};

function Message({ message }: Props) {
  const isChatGPT = message?.role === "SimplAi";

  return (
    <MessageContainer
      Role = {message?.role}
    >
      {message?.role === 'user' ?
        <div style={{display : 'flex', alignItems : 'center',justifyContent : 'flex-end',gap : '10px'}}>
          <span style={{color : '#000',opacity : '0.6',fontSize : '14px',fontWeight : 500}}>
            You
          </span>
          <IconContainer>
              RS
          </IconContainer>
        </div>
        :
        <div style={{display : 'flex', alignItems : 'center',justifyContent : 'flex-end',gap : '10px'}}>
          <Image
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            "/assets/Logos/simplaiLogo.svg"
          }
          height={25}
          width={25}
          alt=""
          />
          <span style={{color : '#000',opacity : '0.6',fontSize : '14px',fontWeight : 700}}>
            Explore.ai
          </span>
        </div>
      }
      <PromptContainer
      Role = {message?.role}
      >
        <span className="pt-1 text-sm">{message?.content}</span>
      </PromptContainer>
    </MessageContainer>
  );
}

export default Message;
