import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Welcome.module.scss';
const cls = classNames.bind(styles);
import hello from '../../assets/hello.png';

function Welcome() {
   const { currentUserName } = useSelector((state) => state.account.users.currentUser);
   return (
      <div className={cls('wrapper__welcome')}>
         <div className={cls('content__chat')}>
            <div className={cls('avatar__gif')}>
               <img src={hello} alt="hello" />
               <span>Hello, {currentUserName} !!!</span>
               <p>Hãy chọn 1 người bạn trò chuyện nhé.</p>
            </div>
         </div>
      </div>
   );
}

export default Welcome;