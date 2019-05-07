// import 'antd/dist/antd.min.css';
import './styles/main.scss';
import './styles/common.scss';
import './styles/btn.scss';
import './styles/reset.scss';
import React from 'react';
import Root from './router/Root';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

render( 
    <LocaleProvider locale={zhCN}> 
        <Root /> 
    </LocaleProvider>, 
    document.getElementById('app')
);