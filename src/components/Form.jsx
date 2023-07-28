/* eslint-disable */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUrlPosition} from "../hooks/useUrlPosition";

import styles from "./Form.module.css";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import {useCities} from "../contexts/CitiesContext";


export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"


function Form() {

    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
    const [geocodingError, setGeocodingError] = useState(false)
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");


    const [lat, lng] = useUrlPosition()
    const navigator = useNavigate()


    const {createCity, isLoading} = useCities()

    async function handleSubmit(e) {
        e.preventDefault()
        if (!cityName || !date) return

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng},
        }

        await createCity(newCity);
        navigator('/app/cities')

    }

    useEffect(function () {

        if (!lat && !lng) return

        async function fetchCityData() {

            try {
                setIsLoadingGeocoding(true)
                setGeocodingError(false)
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json()

                if (!data.countryCode) throw new Error('That doesnt Seem to be a City, Click Somewhere Else...')

                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setEmoji(() => convertToEmoji(data.countryCode))
            } catch (err) {
                setGeocodingError(err.message)
            } finally {
                setIsLoadingGeocoding(false)
            }
        }

        fetchCityData()
    }, [lat, lng])


    if (!lat && !lng) return <Message message='Start by Clicking Somewhere on the Map'/>

    if (isLoadingGeocoding) return <Spinner/>

    if (geocodingError) {
        return <Message message={geocodingError}/>
    }
    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>

                <DatePicker
                    id="date"
                    onChange={date => setDate(date)}
                    selected={date}
                    dateFormat='dd/MM/yyyy'

                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>

                <Button type='primary'>add</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    navigator(-1)
                }} type='back'>&larr; Back</Button>
            </div>
        </form>
    );
}

export default Form;
