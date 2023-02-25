import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import MoodIcon from '@mui/icons-material/Mood';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Tooltip } from '@mui/material';
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
   hiddenReply, toggleCompleted, showReply
} from '../../features/message/messageSlice';
import styles from './ChatInput.module.scss';
const cls = classNames.bind(styles);

function ChatInput({ sendMessage }) {
   const dispatch = useDispatch();
   const { user, content, completeReply } = useSelector((state) => state.reply.replyMessage);
   const { isCompleted } = useSelector((state) => state.reply.toggleHideShow);
   const [valueMessage, setValueMessage] = useState('');

   const handleEmojiClick = ({ emoji }) => {
      let message = valueMessage;
      message += emoji;
      setValueMessage(message)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if (valueMessage.length > 0) {
         sendMessage(valueMessage);
         setValueMessage('');
         dispatch(toggleCompleted(false))
         dispatch(showReply({ user: '', content: '', completeReply: false }))
      }
   }

   return (
      <div className={cls('wrapper__chats')}>
         <div className={cls('content__box')}>
            <form className={cls('form__message')} onSubmit={(e) => handleSubmit(e)}>
               <div className={cls('replying')}>
                  {completeReply && (
                     <div className={cls('visibility__message')}>
                        <div className={cls('header__reply')}>
                           <p><ReplyIcon />Trả lời <span>{user}</span></p>
                           <p>{content}</p>
                        </div>
                        <div className={cls('message__hidden')}>
                           <Tooltip title="Xóa trả lời" placement="top">
                              <IconButton onClick={() => dispatch(hiddenReply(false))}>
                                 <ClearIcon />
                              </IconButton>
                           </Tooltip>
                        </div>
                     </div>
                  )}
                  <div className={cls('input__group')}>
                     <div className={cls('text__ip')}>
                        <input
                           type="text"
                           className={cls('input__values')}
                           onChange={(e) => setValueMessage(e.target.value)}
                           onClick={() => dispatch(toggleCompleted(false))}
                           value={valueMessage}
                           placeholder="Type a message ..."
                        />
                     </div>
                     <div className={cls('icon__ip')}>
                        <MoodIcon onClick={() => dispatch(toggleCompleted(true))} />
                        {isCompleted &&
                           <div className={cls('icon__emoji')}>
                              <EmojiComponent>
                                 <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                    autoFocusSearch={false}
                                    height={340}
                                    width={295}
                                 />
                              </EmojiComponent>
                           </div>
                        }
                     </div>
                  </div>
               </div>
               <div className={cls('send__msg')}>
                  <button type='submit'><SendIcon /></button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default ChatInput;

const EmojiComponent = styled.div`
       .Flex  {
              display:none;
       }

       .epr-body {
              &::-webkit-scrollbar {
                     width: 5px;
              }
              
              &::-webkit-scrollbar-thumb {
                     border-radius: 50px;
                     background: #888; 
              }
       }

       .epr-emoji-category-label {
              display:none;
       }

       .epr-hidden-on-search {
              display:none;
       }
`