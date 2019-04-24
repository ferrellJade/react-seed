import React, {Component} from 'react';
import imageJpg from '../images/sbBoy.jpg';
import { Link } from 'react-router-dom'
export default class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/page">Page</Link></li>
                </ul>
                <div>
                    <img className="home" src={imageJpg} />
                </div>
                <div className="title">I am ferrell</div>
            </div>
        )
    }
}