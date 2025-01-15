import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes, handleAuthentication } from "../utils/Store/Redux_functions";
import { verify_token } from "../Services/API/api";
import cookie from 'react-cookies';

const useValidate = () => {

    const dispatch = useDispatch()

    const token = cookie.load("token");
    console.log(token)

    const { data, isSuccess } = useQuery({
        queryKey: ["Verifying Token"],
        queryFn: verify_token,
        enabled: !!token
    });

    useEffect(() => {

        if (isSuccess && data && !!token) {
            (data.data["notes"]).length > 0 && dispatch(fetchNotes(data.data))
        }

        !token && dispatch(handleAuthentication(false));

    }, [isSuccess, token])
}

export default useValidate;