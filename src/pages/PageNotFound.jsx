import {useNavigate} from "react-router-dom";
import styles from "./PageNotFound.module.css"
import Button from "../components/Button";

export default function PageNotFound() {

    const navigator = useNavigate()

    return (
        <div className={styles.container}>

            <h1 className={styles.errorText}>404 : Page not found </h1>
            <Button type='primary' onClick={() => navigator('/')}> Home </Button>

        </div>
    );
}
