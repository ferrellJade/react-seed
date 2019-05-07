import React, {Component} from 'react';
import imageJpg from '../images/sbBoy.jpg';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { Button } from 'antd';
import Page from './Page';
import HooksTest from './testHooks/TestOne';
export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <HooksTest />
                    <img className={styles.home} src={imageJpg} />
                    <Button type="primary"><Link to="/page">Page</Link></Button>
                </div>
                <div className={styles.title}>I am ferrell</div>
                <div className={styles.pageContent}>
                    <Page />
                </div>
            </div>
        );
    }
}