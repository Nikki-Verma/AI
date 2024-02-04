"use client";

import { motion } from "framer-motion";

type Props = {
  message: any;
};

function Message({ message }: Props) {
  const isChatGPT = message?.role === "SimplAi";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}
      style={{
        marginBottom: "10px",
        textAlign: message?.role === "SimplAi" ? "left" : "right",
        maxWidth: "70%",
        marginLeft: message?.role === "SimplAi" ? "0" : "auto",
        marginRight: message?.role === "SimplAi" ? "auto" : "0",
      }}
    >
      <img src={message?.user?.avatar} alt="" className="h-8 w-8" />
      <p className="pt-1 text-sm">{message?.role} : </p>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: message?.role === "SimplAi" ? "#e6f7ff" : "#f0f0f0",
        }}
      >
        <span className="pt-1 text-sm">{message?.content}</span>
      </div>
    </motion.div>
  );
}

export default Message;
