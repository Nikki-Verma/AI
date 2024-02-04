"use client"

import React, { useState } from 'react'
import { Container } from './style'
import useChatStream from '@/Hooks/useChatStream';
import { useSession } from 'next-auth/react';
import Chat from '../Chat/Chat';
import ChatInput from '../Chat/ChatInput';

const ChatBot = () => {

  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stopStream,
    conversationId,
    setConversationId,
  } = useChatStream({});


  return (
    <Container>
      <Chat messages={messages} />
      <ChatInput
        submitHandler={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        loading={isLoading}
      />
      
    </Container>
  )
}

export default ChatBot
