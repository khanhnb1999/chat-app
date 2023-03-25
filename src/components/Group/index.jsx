import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { Row, Col, Card, Avatar, Tooltip } from 'antd';
import { ListItemAvatar, ListItem, ListItemText, IconButton } from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../Container';
import http from '../../api';
import { urlImage } from '../../api'
import { toggleModal, setRooms } from '../../features/account/accountSlice';
import Modals from '../Modal';
import styles from './Group.module.scss';
const cls = classNames.bind(styles);

function Group() {
   const dispatch = useDispatch();
   const [userGroup, setUserGroup] = useState([]);
   const { rooms } = useSelector((state) => state.account.groups);
   useEffect(() => {
      (async () => {
         const { data } = await http.get('/users-group');
         setUserGroup(data)
      })();
   }, []);

   return (
      <>
         {rooms ? <Container /> :
            <div className={cls('wrapper__group')}>
               <div className={cls('group__header')}>
                  <Row justify='space-between' align="middle">
                     <Col flex='auto'>
                        <ListItem>
                           <ListItemAvatar>
                              <Avatar alt="user" />
                           </ListItemAvatar>
                           <ListItemText primary={<>Phòng chat</>} />
                        </ListItem>
                     </Col>
                     <Col flex='60px'>
                        <Tooltip title="Thêm phòng chat" placement="bottom">
                           <IconButton onClick={() => dispatch(toggleModal(true))}>
                              <Groups3Icon />
                           </IconButton>
                        </Tooltip>
                     </Col>
                  </Row>
               </div>
               <div className={cls('group__content')}>
                  <Modals />
                  <RoomComponents>
                     <div className={cls('groups')}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                           {userGroup.map((room) => (
                              <Col key={room._id} className={cls('rooms')} span={6}>
                                 <Card
                                    title={
                                       <>
                                          <h6>{room.name}</h6>
                                          <span>{room.users.length} Thành viên</span>
                                       </>
                                    }
                                    bordered={true}
                                    onClick={() => dispatch(setRooms(room))}
                                 >
                                    <Avatar.Group
                                       maxCount={2}
                                       size="large"
                                       maxStyle={{
                                          color: '#f56a00',
                                          backgroundColor: '#fde3cf',
                                       }}
                                    >
                                       {room.users.map((user) => (
                                          <Tooltip key={user._id} title={user.username} placement="top">
                                             <Avatar alt="user" src={`${urlImage}/${user.avatar}`} />
                                          </Tooltip>
                                       ))}
                                    </Avatar.Group>
                                 </Card>
                              </Col>
                           ))}
                        </Row>
                     </div>
                  </RoomComponents>
               </div>
            </div>
         }
      </>
   );
}

export default Group;

const RoomComponents = styled.div`
       .ant-card-head {
              padding: 0;
       }

       .ant-card-body {
              padding: 20px 0;
       }
`