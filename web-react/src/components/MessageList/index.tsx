import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '../../services/api';

import styles from './style.module.scss';
import logoImg from '../../assets/logoDoWhile.svg';

let messagesQueue: Message[] = [];

const socket = io('http://localhost:4000')

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage)
});

type Message = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string,
  },
};

export function MessageList() {
  const [ messages, setMessages ] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))
        messagesQueue.shift()
      }
    }, 3000);
  }, [])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data);
    })
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
      <ul className={styles.messageList}>
        {messages.map(message => {
          return (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={`Foto de ${message.user.name}`} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>)
        })}
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/Manoo-vala.png" alt="Foto do usuário" />
            </div>
            <span>Diego Fernandes</span>
          </div>
        </li>
      </ul>
    </div>
  );
}