import React, { useState } from "react";
import styles from "./Counter.module.css";

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.counter}>
            <button
                className={styles.button}
                onClick={() => setCount(count - 1)}
            >
                -
            </button>

            <span className={styles.value}>{count}</span>

            <button
                className={styles.button}
                onClick={() => setCount(count + 1)}
            >
                +
            </button>
        </div>
    );
};

export default Counter;
