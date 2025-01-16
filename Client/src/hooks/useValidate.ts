import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes, handleAuthentication } from "../utils/Store/Redux_functions";
import { verify_token } from "../Services/API/api";

const useValidate = () => {

    const dispatch = useDispatch()

    const token = localStorage.getItem("token");

    const { data, isSuccess } = useQuery({
        queryKey: ["Verifying Token"],
        queryFn: verify_token,
        enabled: !!token
    });

    useEffect(() => {

        console.log(token);

        if (isSuccess && data && !!token) {
            (data.data["notes"]).length > 0 && dispatch(fetchNotes(data.data)),
                dispatch(handleAuthentication(true))
        }
    }, [isSuccess, token])
}

export default useValidate;