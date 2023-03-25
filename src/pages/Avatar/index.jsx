import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import avatar from '../../assets/avatar.png'
import { useDispatch } from 'react-redux';
import { showsAlert } from '../../features/notification/notificationSlice';

import http from '../../api';
import styles from './Avatar.module.scss';
const cls = classNames.bind(styles)

const Avatar = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [image, setImage] = useState(avatar);
   const [changeAvatar, setChangeAvatar] = useState('Chọn ảnh đại diện')
   const { register, handleSubmit } = useForm();

   const handleChange = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
      setChangeAvatar('Thay đổi')
   }

   const onSubmit = async (img) => {
      if (img.image.length == 0) {
         dispatch(showsAlert({
            type: 'error',
            content: 'Bạn phải chọn ảnh đại diện!!!',
         }));
      } else {
         const formData = new FormData();
         const fileName = img.image[0].name;
         formData.append('name', fileName);
         formData.append('image', img.image[0]);
         await http.post('/uploads', formData);
         const user = JSON.parse(localStorage.getItem('chat-user'));
         const { data } = await http.get(`/user/${user._id}`);
         data.avatar = fileName;
         await http.put(`/user/${user._id}`, data);
         localStorage.setItem('chat-user', JSON.stringify(data));

         dispatch(showsAlert({
            type: 'success',
            content: 'Cập nhật ảnh đại diện thành công',
         }));
         setTimeout((() => { navigate('/') }), 1500)
      }
   }

   return (
      <div className={cls('avatar')}>
         <div className={cls('wrapper__avatar')}>
            <div className={cls('title__avatar')}>
               <p>Tải lên ảnh đại diện</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
               <div className={cls('avatar__circle')} >
                  <img src={image} alt="" />
               </div>
               <div className={cls('icon__button')}>
                  <IconButton
                     color="primary"
                     aria-label="upload picture"
                     component="label"
                  >
                     <input
                        type='file'
                        className={cls('current__about')}
                        {...register('image')}
                        onChange={handleChange}
                     />
                     <span><ImageIcon />{changeAvatar}</span>
                  </IconButton>
               </div>
               <div className={cls('btn__group')}>
                  <Button type='submit' variant="contained">Tải lên</Button>
               </div>
            </form>
         </div>
      </div >
   );
};
export default Avatar;
