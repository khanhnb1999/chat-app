import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { ListItemAvatar, ListItem, Avatar, ListItemText } from '@mui/material';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentChat } from '../../features/account/accountSlice';
import http from '../../api';
import { urlImage } from '../../api'
import logo from '../../assets/logo.png'
import styles from './Contact.module.scss';
const cls = classNames.bind(styles);


function Contact() {
   const dispatch = useDispatch();
   const { id } = useSelector((state) => state.account.users.currentUser);
   const { _id } = useSelector((state) => state.account.users.currentChat)
   const [value, setValue] = useState('');
   const [contacts, setContacts] = useState([]);

   useEffect(() => {
      (async () => {
         if (id) {
            const { data } = await http.get(`/users/${id}`);
            setContacts(data)
            setContacts((user) => user.filter((item) => item.username.includes(value)));
         }
      })()
   }, [id, value])

   return (
      <div className={cls('wrapper__contact')}>
         <div className={cls('header__contact')}>
            <Row align="middle">
               <Col span={8}>
                  <img src={logo} alt="logo" />
               </Col>
               <Col span={16}>
                  <span>CHAT-APP</span>
               </Col>
            </Row>
         </div>
         <div className={cls('search__input')}>
            <input
               type="text"
               className='form-control'
               placeholder='Tìm kiếm...'
               onChange={(e) => setValue(e.target.value)}
            />
         </div>
         <div className={cls('list__users')}>
            {contacts.map((user) => (
               <div key={user._id} className={cls(user._id == _id ? 'active__about' : '')}>
                  <ListItem button onClick={() => dispatch(setCurrentChat(user))}>
                     <ListItemAvatar>
                        <Avatar alt="user" src={`${urlImage}/${user.avatar}`} />
                     </ListItemAvatar>
                     <ListItemText
                        primary={user.username}
                     />
                  </ListItem>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Contact;