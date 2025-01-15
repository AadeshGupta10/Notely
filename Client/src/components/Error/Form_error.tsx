import { FC } from "react"

interface prop {
    field_name: any,
    message: any
}

const Form_error: FC<prop> = ({ field_name, message }) => {
    return (
        <div>
            {
                field_name && <label className='text-red-400 smaller_text'>
                    {typeof (message) == "string" && message}
                </label>
            }
        </div>
    )
}

export default Form_error