import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Welcome from '../Welcome';
import Container from '../Container';
import styles from './Content.module.scss';
const cls = classNames.bind(styles);

function Content() {
       const navigate = useNavigate();
       const { currentUserName, id } = useSelector((state) => state.account.users.currentUser);
       const {username} = useSelector((state) => state.account.users.currentChat);
       const [isLoading, setIsLoading] = useState(false);

       useEffect(() => {
              (async () => {
                     if (!currentUserName) {
                            navigate('/sign-in');
                     } else {
                            setIsLoading(true)
                     }
              })()
       }, []);

       return (
              <div className={cls('wrapper__content')}>
                     {isLoading && !username ? <Welcome /> : <Container />}
              </div>
       );
}

export default Content;