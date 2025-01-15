import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes, handleAuthentication } from "../utils/Store/Redux_functions";
import { verify_token } from "../Services/API/api";
import cookie from 'react-cookies';

const useValidate = () => {

    const dispatch = useDispatch()

    console.log()

    const token = cookie.load("token");

    const { data } = useQuery({
        queryKey: ["Verifying Token"],
        queryFn: verify_token,
        enabled: !!token
    });

    useEffect(() => {
        data != null &&
            (
                (data.data["notes"]).length > 0 && dispatch(fetchNotes(data.data)),
                dispatch(handleAuthentication(true))
            )
    }, [data])
}

export default useValidate;