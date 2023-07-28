import styles from "./Button.module.css"

/* eslint-disable */
export default function Button({children, onClick, type}) {
    return <button onClick={onClick} className={`${styles.btn} ${styles[type]} `}>
        {children}
    </button>

}