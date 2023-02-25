import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
       Button, TextField, InputAdornment,
       IconButton, OutlinedInput, FormControl, InputLabel
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { showsAlert } from '../../features/notification/notificationSlice';

import http from '../../api';
import styles from './SignIn.module.scss';
const cls = classNames.bind(styles);

function SignUp() {
       const navigate = useNavigate();
       const dispatch = useDispatch()
       const [showPassword, setShowPassword] = useState(false);
       const [password, setPassword] = useState('');
       const [email, setEmail] = useState('');
       const { register, handleSubmit, formState: { errors } } = useForm();

       useEffect(() => {
              if(localStorage.getItem('chat-user')) {
                     navigate('/');
              } 
       },[])

       const onSubmit = async (user) => {
              const { data } = await http.post('/sign-in', user);
              const { email, password } = data;
              if (email) {
                     setEmail(email);
                     setPassword('');
              } else if (password) {
                     setPassword(password)
                     setEmail('');
              }
              if (data.status === true) {
                     localStorage.setItem('chat-user', JSON.stringify(data.user))
                     setEmail('');
                     setPassword('');
                     dispatch(showsAlert({
                            type: 'success',
                            content: 'Đăng nhập thành công',
                     }));
                     setTimeout((() => { navigate('/') }), 1500)
              }
       }

       return (
              <div className={cls('wrapper__box')}>
                     <div className={cls('wrapper__signin')}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                   <div className={cls('title__signin')}>
                                          <h3>ĐĂNG NHẬP</h3>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <TextField
                                                 label="Email"
                                                 type="email"
                                                 className={cls('input__values')}
                                                 {...register('email', { required: true })}
                                          />
                                          <p style={{ color: 'red' }}>
                                                 {errors.email && <>Email không được để trống </>}
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
                                                        {...register('password', { required: true, maxLength: 15, minLength: 3 })}
                                                 />
                                          </FormControl >
                                          <p style={{ color: 'red' }}>
                                                 {errors.password && <>Password không được để trống</>}
                                                 {password && <>{password}</>}
                                          </p>
                                   </div>
                                   <div className={cls('form__input')}>
                                          <Button
                                                 type='submit'
                                                 variant="contained"
                                                 className={cls('btn__success')}
                                                 style={{ width: 156, padding: 13, borderRadius: 25 }}
                                          >
                                                 Đăng nhập
                                          </Button>
                                   </div>
                                   <div className={cls('login__with')}>
                                          <div className={cls('wp__box')}>
                                                 <div className={cls('title__signin')}>
                                                        <span>Bạn chưa có tài khoản? <Link to='/sign-up'>Đăng kí</Link></span>
                                                 </div>
                                          </div>
                                   </div>
                            </form>
                     </div>
              </div>
       );
}

export default SignUp;