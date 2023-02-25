import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Col, Row  } from 'antd';
import classNames from 'classnames/bind';
import {useDispatch } from 'react-redux';
import { showsAlert } from '../../features/notification/notificationSlice';

import http from '../../api'
import styles from './SignUp.module.scss';
const cls = classNames.bind(styles);

function SignUp() {
       const navigate = useNavigate();
       const dispatch = useDispatch();
       const [showPassword, setShowPassword] = useState(false);
       const [userName, setUserName] = useState('');
       const [email, setEmail] = useState('');
       const { register, handleSubmit, formState: { errors } } = useForm();

       const onSubmit = async (user) => {
              const { data } = await http.post('/sign-up', user);
              localStorage.setItem('chat-user', JSON.stringify(data.user))
              const { username, email } = data;
              if(username) {
                     setUserName(username);
                     setEmail('');
              } else if(email) {
                     setEmail(email)
                     setUserName('');
              }
              if(data.status === true) {
                     setEmail('');
                     setUserName('');
                     dispatch(showsAlert({
                            type: 'success',
                            content: 'Đăng kí tài khoản thành công',
                     }));
                     setTimeout((() => { navigate('/avatar')}), 1500)
              }
       }

       return (
              <div className={cls('wrapper__box')}>
                     <div className={cls('wrapper__signup')}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                   <div className={cls('title__signup')}>
                                          <h3>ĐĂNG KÍ</h3>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <TextField
                                                 label="Username"
                                                 type="text"
                                                 className={cls('input__values')}
                                                 {...register('username', { required: true })}
                                          />
                                          <p style={{ color: 'red' }}>
                                                 {errors.username && <>Username không được để trống</>}
                                                 {userName && <>{userName}</>}
                                          </p>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <TextField
                                                 label="Email"
                                                 type="email"
                                                 className={cls('input__values')}
                                                 {...register('email', { required: true })}
                                          />
                                          <p style={{ color: 'red' }}>
                                                 {errors.email && <>Email không được để trống</>}
                                                 {email && <>{email}</>}
                                          </p>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <FormControl className={cls('input__password')}>
                                                 <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                 <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        label="Password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                               <InputAdornment position="end">
                                                                      <IconButton
                                                                             aria-label="toggle password visibility"
                                                                             onClick={() => setShowPassword(true)}
                                                                             onMouseDown={() => setShowPassword(false)}
                                                                             edge="end"
                                                                      >
                                                                             {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                      </IconButton>
                                                               </InputAdornment>
                                                        }
                                                        {...register('password', { required: true, maxLength: 15, minLength:3 })}
                                                 />
                                          </FormControl >
                                          <p style={{ color: 'red' }}>{errors.password && <>Password không được để trống</>}</p>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <Button 
                                                 type='submit' 
                                                 variant="contained" 
                                                 className={cls('btn__success')}
                                                 style={{width:156, padding:13, borderRadius:25}}
                                          >
                                                 Đăng kí
                                          </Button>
                                   </div>
                                   <div className={cls('login__with')}>
                                          <div>
                                                 <span>Hoặc đăng kí với</span>
                                          </div>
                                          <div className={cls('wp__box')}>
                                                 <Row justify="center">
                                                        <Col span={11}>
                                                               <Button variant="outlined" startIcon={<FacebookIcon />}>
                                                                      FaceBook
                                                               </Button>
                                                        </Col>
                                                        <Col span={11}>
                                                               <Button variant="outlined" startIcon={<GoogleIcon />}>
                                                                      Google
                                                               </Button>
                                                        </Col>
                                                 </Row>
                                                 <div className={cls('title__signin')}>
                                                        <span>Bạn đã có tài khoản? <Link to='/sign-in'>Đăng nhập</Link></span>
                                                 </div>
                                          </div>
                                   </div>
                            </form>
                     </div>
              </div>
       );
}

export default SignUp;