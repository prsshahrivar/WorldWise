import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/FakeAuthContext";
import {useEffect} from "react";

/*eslint-disable*/
export default function ProtectedRoute({children}) {

    const navigator = useNavigate()
    const {isAuthenticated} = useAuth()

    useEffect(function (){

        if (!isAuthenticated) navigator('/')

    }, [isAuthenticated, navigator])

    return isAuthenticated ? children : null
}