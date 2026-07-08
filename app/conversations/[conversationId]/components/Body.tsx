'use client'

import { FullMessageType } from "@/app/types";
import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";


interface BodyProps{
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {
  const bottomRef= useRef<HTMLDivElement>(null);
  const messages = initialMessages;

  const {conversationId} = useConversation();

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    void axios.post(`/api/conversations/${conversationId}/seen`).catch(() => {
      // Avoid unhandled promise rejections from a fire-and-forget request.
    });
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast= {i=== messages.length -1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24"/>
     </div>
  )
}

export default Body;