/* eslint-disable */

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext";
import {useGeolocation} from "../hooks/useGeolocation";
import {useUrlPosition} from "../hooks/useUrlPosition";
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent} from "react-leaflet";

import styles from "./Map.module.css"
import Button from "./Button";


export default function Map() {

    const {cities} = useCities()
    const [mapPosition, setMapPosition] = useState([49, 10])
    const {isLoading: isPositionLoading, position: geolocationPosition, getPosition} = useGeolocation()

    // const navigator = useNavigate()

    const [mapLat, mapLng] = useUrlPosition()

    useEffect(function () {

        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])

    }, [mapLat, mapLng])

    useEffect(function () {

        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
        }

    }, [geolocationPosition])


    return <div className={styles.mapContainer}>

        <Button type='position' onClick={getPosition}>
            {isPositionLoading ? 'Loading...' : 'Get Your Position'}
        </Button>
        <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true}
                      className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.emoji}</span>
                        <span>{city.cityName}</span>
                    </Popup>
                </Marker>)
            }

            <ChangeCenter position={mapPosition}/>
            <DetectClick/>
        </MapContainer>

    </div>
}


function ChangeCenter({position}) {

    const map = useMap()
    map.setView(position)
    return null

}

function DetectClick() {

    const navigator = useNavigate()
    useMapEvent({
            click: (e) => navigator(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    )

}