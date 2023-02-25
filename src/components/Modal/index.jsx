import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Row, Col } from 'antd';
import { Button, Tooltip, Modal, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';

import { toggleModal, setNameGroup, setUsersGroup } from '../../features/account/accountSlice';
import { showsAlert } from '../../features/notification/notificationSlice';
import http from '../../api';
import { urlImage } from '../../api'
import styles from './Modal.module.scss';
const cls = classNames.bind(styles);

function Modals() {
       const dispatch = useDispatch();
       const { isCompleted,users,disable,nameGroup } = useSelector((state) => state.account.groups);
       const { id } = useSelector((state) => state.account.users.currentUser);
       const [contacts, setContacts] = useState([]);

       useEffect(() => {
              (async () => {
                     if (id) {
                            const { data } = await http.get(`/users/${id}`);
                            setContacts(data);
                     }
              })()
       }, []);

       const handleAddUserRoom = async () => {
              const { data } = await http.post('/add-user-room',{
                     name: nameGroup,
                     userId: id,
                     users: users
              });
              if(data.status === true) {
                     dispatch(toggleModal(false));
                     dispatch(showsAlert({
                            type: 'success',
                            content: 'Tạo nhóm thành công',
                     }));
              }
       }

       return (
              <>
                     <Modal
                            open={isCompleted}
                            onClose={() => dispatch(toggleModal(false))}
                     >
                            <div className={cls('modal')}>
                                   <form>
                                          <div>
                                                 <Row justify='space-between' align="middle" className={cls('header__modal')}>
                                                        <Col flex='auto'>
                                                               <p>Thêm nhóm chat</p>
                                                        </Col>
                                                        <Col flex='30px'>
                                                               <Tooltip placement="bottom">
                                                                      <IconButton onClick={() => dispatch(toggleModal(false))}>
                                                                             <ClearIcon />
                                                                      </IconButton>
                                                               </Tooltip>
                                                        </Col>
                                                 </Row>
                                          </div>
                                          <div className={cls('body__modal')}>
                                                 <div>
                                                        <input
                                                               type="text"
                                                               onChange={(e) => dispatch(setNameGroup(e.target.value))}
                                                               className='form-control mt-3 mb-3'
                                                               placeholder='Nhập tên nhóm...'
                                                        />
                                                 </div>
                                                 <Row justify='space-between'>
                                                        <Col span={12}>
                                                               <div>
                                                                      <h6>Thêm bạn vào nhóm</h6>
                                                               </div>
                                                               <div className={cls('list__users')}>
                                                                      {contacts.map((user) => (
                                                                             <Row key={user._id} justify='space-between' align="middle">
                                                                                    <Col span={2}>
                                                                                           <input
                                                                                                  className="form-check-input"
                                                                                                  type="checkbox" id={user._id}
                                                                                                  onChange={() => dispatch(setUsersGroup(user))}
                                                                                           />
                                                                                    </Col>
                                                                                    <Col span={22}>
                                                                                           <label className="form-check-label" htmlFor={user._id}>
                                                                                                  <img src={`${urlImage}/${user.avatar}`} alt="user" />
                                                                                                  <span>{user.username}</span>
                                                                                           </label>
                                                                                    </Col>
                                                                             </Row>
                                                                      ))}
                                                               </div>
                                                        </Col>
                                                        <Col span={11}>
                                                               <div>
                                                                      <h6>Đã thêm</h6>
                                                               </div>
                                                               <div className={cls('selected__users')}>
                                                                      {users && users.map((user, index) => (
                                                                             <Row justify='space-between' align="middle" className={cls('user__render')} key={index}>
                                                                                    <Col span={5}>
                                                                                           <img src={`${urlImage}/${user.avatar}`} alt="user" />
                                                                                    </Col>
                                                                                    <Col span={14}>
                                                                                           <span>{user.username}</span>
                                                                                    </Col>
                                                                                    <Col span={3}>
                                                                                           <Tooltip title={user.username} placement="right">
                                                                                                  <IconButton onClick={() => dispatch(setUsersGroup(user))}>
                                                                                                         <ClearIcon />
                                                                                                  </IconButton>
                                                                                           </Tooltip>
                                                                                    </Col>
                                                                             </Row>
                                                                      ))}
                                                               </div>
                                                        </Col>
                                                 </Row>
                                          </div>
                                          <div className={cls('footer__modal')}>
                                                 <Row justify='end' align="middle">
                                                        <Col span={4}>
                                                               <Button
                                                                      variant="light"
                                                                      className={cls('btn__gray')}
                                                                      onClick={() => dispatch(toggleModal(false))}
                                                               >
                                                                      Hủy
                                                               </Button>
                                                        </Col>
                                                        <Col >
                                                               {disable ?
                                                                      <Button variant="contained" onClick={handleAddUserRoom}>Tạo nhóm</Button>
                                                                      : <Button type='submit' disabled >Tạo nhóm</Button>
                                                               }
                                                        </Col>
                                                 </Row>
                                          </div>
                                   </form>
                            </div>
                     </Modal>
              </>
       );
}

export default Modals;