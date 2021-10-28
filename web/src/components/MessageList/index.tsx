import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import io from "socket.io-client";

interface Messages {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const messagesQueue: Messages[] = [];

const socket = io("http://localhost:4000");
socket.on("new_message", (data: Messages) => messagesQueue.push(data));

export function MessageList() {
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api
      .get<Messages[]>("messages/last/3")
      .then((response) => setMessages(response.data));
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DOwhile2021" />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
