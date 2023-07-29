/* eslint-disable */
import {createContext, useCallback, useContext, useEffect, useReducer} from "react";


const CitiesContext = createContext()
const BASE_URL = "http://localhost:8000";


const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}

function reducer(state, action) {

    switch (action.type) {

        case 'loading':
            return {...state, isLoading: true}

        case 'finish/loading':
            return {...state, isLoading: fasle}


        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }

        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created' :

            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }

        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            }

        default :
            throw new Error('Unknown Action...')

    }

}

function CitiesProvider({children}) {

    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

    // Loading Cities From API Server
    useEffect(function () {

        async function fetchCities() {

            dispatch({type: 'loading'})
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data})
            } catch (err) {
                alert('Error Occurred While Loading the Data...')
                dispatch({type: 'finish/loading'})
            }
        }

        fetchCities()

    }, [])


    // Loading One City Details From API Server and Memoize it With useCallback() (Because Its a Function)
    const getCity = useCallback (async function getCity(id) {

        if (currentCity.id === Number(id)) return;

        dispatch({type: 'loading'})

        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data})
        } catch (err) {
            alert('Error Occurred While Loading the Data...')
            dispatch({type: 'finish/loading'})
        }
    }, [currentCity.id] )


    // Posting Created City to API Server (Managing Remote State and UI State)
    async function createCity(newCity) {

        dispatch({type: 'loading'})
        try {

            const res = await fetch(`${BASE_URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            dispatch({type: 'city/created', payload: data})

        } catch (err) {
            alert('Error Occurred While Creating the City...')
            dispatch({type: 'finish/loading'})
        }
    }

    // Deleting One City From API Server
    async function deleteCity(id) {
        dispatch({type: 'loading'})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            })

            dispatch({type: 'city/deleted', payload: id})

        } catch (err) {
            alert('Error Occurred While Delete the City...')
            dispatch({type: 'finish/loading'})
        }
    }


    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}


function useCities() {

    const cities = useContext(CitiesContext)
    if (cities === undefined) throw new Error('CitiesContext was used Outside the CitiesProvider...')
    return cities

}


export {CitiesProvider, useCities}