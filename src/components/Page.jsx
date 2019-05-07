import React, {Component} from 'react';
import './page.css';
import agg from '../images/agg.jpg';
import boy from '../images/boy.jpg';
import carts from '../images/carts.jpg';
import girl from '../images/girl.jpg';
import { Button } from 'antd';
export default class Page extends Component {
    render() {
        return (
            <div className="Page">
                8888888888888888888888888
                <Button>2222222222222</Button>
                <div>
                    <img src={agg} alt=""/>
                </div>
                <div>
                    <img src={boy} alt=""/>
                </div>
                <div>
                    <img src={carts} alt=""/>
                </div>
                <div>
                    <img src={girl} alt=""/>
                </div>
            </div>
        );
    }
}