import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './style.scss';
export default function example() {
    const [ count, setCount ] = useState(0);

    // useEffect(() => {
    //     alert('这是什么鬼');
    // });
    return (
        <div className={styles.hooksContent}>
            <p>我点。。。{count}</p>
            <Button className={styles.hooksContent} type="primary" onClick={() => setCount(count + 1)}>
                快点我！！！！！！
            </Button>
            <div className={styles.hooksContent}>
                <Button type="primary" onClick={() => setCount(count - 1)}>
                   so big！！！！！！
                </Button>
            </div>
        </div>
    );
}
