import { Col, Row } from 'antd';
import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames/bind';

import Menu from "../Menu";
import Contact from '../Contact';
import Content from '../Content';
import Group from '../Group';
import styles from './Layout.module.scss';
const cls = classNames.bind(styles);

function Layout() {
       return (
              <div className={cls('wrapper__layout')}>
                    <div className={cls('grid__container')}>
                            <Row justify="center">
                                   <Col flex='350px' className={cls('sidebar')}>
                                          <Row>
                                                 <Col span={5}><Menu /></Col>
                                                 <Col span={19}><Contact /></Col>
                                          </Row>
                                   </Col>
                                   <Col flex='auto' className={cls('contents')}>
                                          <Routes>
                                                 <Route path='/' element={<Content />}/>
                                                 <Route path='/phong-chat' element={<Group />}/>
                                          </Routes>
                                   </Col>
                            </Row>
                    </div>
              </div>
       );
}

export default Layout;