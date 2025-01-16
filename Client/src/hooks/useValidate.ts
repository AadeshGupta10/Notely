import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNotes, handleAuthentication } from "../utils/Store/Redux_functions";
import { verify_token } from "../Services/API/api";

const useValidate = () => {

    const dispatch = useDispatch()

    const { data, isSuccess } = useQuery({
        queryKey: ["Verifying Token"],
        queryFn: verify_token,
    });

    useEffect(() => {

        if (isSuccess) {
            (data.data["notes"]).length > 0 && dispatch(fetchNotes(data.data)),
                dispatch(handleAuthentication(true))
        }
    }, [isSuccess, data])
}

export default useValidate;