import className from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import GroupsIcon from '@mui/icons-material/Groups';

import { setRooms } from '../../features/account/accountSlice';
import { urlImage } from '../../api';
import styles from './Menu.module.scss';
const cls = className.bind(styles);

function Menu() {
   const dispatch = useDispatch();
   const { currentUser } = useSelector((state) => state.account.users);
   return (
      <div className={cls("wrapper__menu")}>
         <div className={cls('user__avatar')}>
            <Button >
               <img src={`${urlImage}/${currentUser.avatar}`} alt="" style={{ width: 50, height: 50 }} />
            </Button>
         </div>
         <div className={cls('navigation')}>
            <Tooltip title="Tin nhắn" placement="right-end">
               <Link to='/'><MessageIcon /></Link>
            </Tooltip>
            <Tooltip title="Phòng chat" placement="right-end">
               <Link
                  to='/phong-chat'
                  onClick={() => dispatch(setRooms())}
               >
                  <GroupsIcon />
               </Link>
            </Tooltip>
         </div>
      </div>
   );
}

export default Menu;