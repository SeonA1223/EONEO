// messageTye = 0이면, 문자 1이면 이미지 2이면 음성
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const ROOM_SEQ = "6caf6c54-1747-42aa-97d6-a287244cbacb";

const Chat = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws:http://localhost:8080/chatEonoe-websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("http://localhost:8080/chatEonoe-websocket"), // proxy를 통한 접속 //internet explore
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  //문제의 원인
  const subscribe = () => {
    client.current.subscribe(`/subscribe/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
    console.log("chatMessages:")
    console.log(chatMessages)
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    let messagesdata = {
        chatRoomId: '6caf6c54-1747-42aa-97d6-a287244cbacb',
        sendUserId: '2', //
        message: message,
        messageType: '0',
    };

    client.current.publish({
      destination: "/publish/chat/message",
      body: JSON.stringify(messagesdata),
    });

    setMessage("");
    console.log(messagesdata)
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};

export default Chat;