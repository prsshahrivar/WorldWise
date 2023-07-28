import styles from "./CityItem.module.css"
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext";


CityItem.propTypes = {
    city: PropTypes.object
}

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));


export default function CityItem({city}) {

    const {deleteCity, currentCity} = useCities()

    function handleClick(e, id) {
        e.preventDefault()
        deleteCity(id)
    }


    return <li>
        <Link to={`${city.id}/?lat=${city.position.lat}&lng=${city.position.lng}`}
              className={`${styles.cityItem} ${currentCity.id === city.id ? styles['cityItem--active'] : ''}`}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button onClick={(e) => handleClick(e, city.id)} className={styles.deleteBtn}>&times;</button>
        </Link>
    </li>

}