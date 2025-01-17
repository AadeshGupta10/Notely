import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes, handleAuthentication, handleLoading } from "../utils/Store/Redux_functions";
import { verify_token } from "../Services/API/api";

const useValidate = () => {

    const dispatch = useDispatch()

    const token = localStorage.getItem("token");

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ["Verifying Token"],
        queryFn: verify_token,
        enabled: !!token
    });

    useEffect(() => {
        dispatch(handleLoading(isLoading))
    }, [isLoading])

    useEffect(() => {
        isError &&
            (
                dispatch(handleAuthentication(false)),
                localStorage.removeItem("token")
            )
    }, [isError])

    useEffect(() => {
        if (isSuccess && !!token) {
            const notes = data.data.notes;
            (!!notes && notes.length > 0 && dispatch(fetchNotes(data.data))),
                dispatch(handleAuthentication(true))
        }
    }, [isSuccess, data, token])
}

export default useValidate;