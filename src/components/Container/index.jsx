import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Col, Row, } from 'antd';
import { ListItemAvatar, ListItem, Avatar, ListItemText, Tooltip, AvatarGroup } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { showReply } from '../../features/message/messageSlice';
import http from '../../api';
import ChatInput from '../ChatInput';
import { urlImage } from '../../api';
import styles from './Container.module.scss';
const cls = classNames.bind(styles);

function Container() {
   const dispatch = useDispatch();
   const scrollRef = useRef();
   const socket = useRef();
   const { username, _id, avatar, email } = useSelector((state) => state.account.users.currentChat);
   const { id, currentUserName } = useSelector((state) => state.account.users.currentUser);
   const { content } = useSelector((state) => state.reply.replyMessage)
   const { rooms } = useSelector((state) => state.account.groups);
   const [message, setMessage] = useState([]);
   const [arrivalMessage, setArrivalMessage] = useState(null);
   useEffect(() => {
      if (username || rooms) {
         (async () => {
            const { data } = await http.post('/message', {
               from: id,
               to: _id ? _id : rooms._id, // currentChat
               rooms: rooms ? rooms._id : ''
            });
            setMessage(data)
         })()
      }
   }, [_id]);

   useEffect(() => {
      if (id) {
         socket.current = io('http://localhost:3003');
         socket.current.emit("user-online", id)
      }
   }, [id])

   const sendMessage = async (msg) => {
      await http.post('/send-message', {
         message: msg,
         from: id, // currentUser
         to: _id ? _id : rooms._id, // currentChat
         reply: content
      });
      socket.current.emit('send-message', {
         message: msg,
         from: id,
         to: _id ? _id : rooms._id,
         room: rooms ? rooms.name : '',
         reply: content
      });

      const mess = [...message];
      mess.push({ fromSelf: true, message: msg, reply: content });
      setMessage(mess)
   };

   useEffect(() => {
      if (socket.current) {
         socket.current.on("recieve-message", ({ message, reply }) => {
            setArrivalMessage({ fromSelf: false, message: message, reply: reply });
         });
         socket.current.on("rooms", ({ message, reply }) => {
            setArrivalMessage({ fromSelf: false, message: message, reply: reply });
         })
      }
   }, [])

   useEffect(() => {
      arrivalMessage && setMessage((prev) => [...prev, arrivalMessage])
   }, [arrivalMessage])

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
   }, [message]);

   return (
      <>
         {(username || rooms) &&
            <div className={cls('wrapper__container')}>
               <div className={cls('header__content')}>
                  <div className={cls('header__side')}>
                     <Row justify="space-around" align="middle">
                        <Col span={12}>
                           <ListItem>
                              <ListItemAvatar>
                                 {username ? <Avatar alt="user" src={`${urlImage}/${avatar}`} /> :
                                    <>
                                       <AvatarGroup max={3}>
                                          {rooms.users.map((val, index) => (
                                             <Avatar key={index} alt="user" src={`${urlImage}/${val.avatar}`} />
                                          ))}
                                       </AvatarGroup>
                                    </>
                                 }
                              </ListItemAvatar>
                              <ListItemText
                                 primary={
                                    <>
                                       {(username && <p>{username}</p>) ||
                                          <div className={cls('info__rooms')}>
                                             <p>{rooms.name}</p>
                                             <span>{rooms.users.length} thành viên</span>
                                          </div>
                                       }
                                    </>
                                 }
                              />
                           </ListItem>
                        </Col>
                        <Col span={12}></Col>
                     </Row>
                  </div>
               </div>
               <div className={cls('content__chats')}>
                  {username &&
                     <div className={cls('profile__users')}>
                        <div className={cls('profile')}>
                           <img src={`${urlImage}/${avatar}`} alt="profile" />
                           <p>{username}</p>
                           <span>{email}</span>
                        </div>
                     </div>
                  }
                  <div className={cls('message__container')}>
                     {
                        message.map((mess, index) => {
                           return (
                              <div ref={scrollRef} key={index} className={cls('block__message')}>
                                 <div className={cls(mess.fromSelf ? 'my__sended' : 'my__recieved')}>
                                    <div className={cls('group__message')}>
                                       {mess.reply && (
                                          <div className={cls(mess.fromSelf ? 'title__send' : 'title__recieve')}>
                                             {mess.fromSelf ?
                                                <span><ReplyIcon /> You replied to {username}</span>
                                                : <span><ReplyIcon /> {username} replied to you</span>
                                             }
                                          </div>
                                       )}
                                       <div className={cls(mess.reply ? 'reply__sended' : 'my__recieved')}>
                                          <div className={cls('tabs__content')}>
                                             <span>{mess.reply}</span>
                                          </div>
                                       </div>
                                       <div className={cls('mess__current')}>
                                          <div className={cls('item__content')}>
                                             <span>{mess.message}</span>
                                          </div>
                                          <div className={cls('icons__reply')}>
                                             <Tooltip title="Trả lời" placement="top">
                                                <IconButton
                                                   onClick={() => dispatch(showReply({
                                                      user: mess.fromSelf ? username : currentUserName,
                                                      content: mess.message,
                                                      completeReply: true
                                                   }))}
                                                >
                                                   <ReplyIcon />
                                                </IconButton>
                                             </Tooltip>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
               <div className={cls('chats__input')}>
                  <ChatInput sendMessage={sendMessage} />
               </div>
            </div>
         }
      </>
   );
}

export default Container;