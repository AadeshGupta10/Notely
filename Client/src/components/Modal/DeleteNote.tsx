import { FC } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { DeleteNote as Delete } from '../../utils/Store/Redux_functions';
import { delete_note } from '../../Services/API/api';
import { useMutation } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { useForm } from 'react-hook-form';

interface props {
    close: () => void,
    createdAt: string,
    deleteTitle: string,
    id: string
}

const DeleteNote: FC<props> = ({ id, deleteTitle, createdAt, close }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, watch } = useForm()

    const { mutate, isPending } = useMutation({
        mutationKey: ["Deleting Note"],
        mutationFn: delete_note,
        onSuccess: () => {
            dispatch(Delete(createdAt)),
                close() //Closing the Modal
        }
    })

    return (
        <form onSubmit={handleSubmit(() => mutate({ "id": id, "createdAt": createdAt }))}>
            <div className='absolute top-0 right-0'>
                <Tooltip title="Close" placement='left' onClick={close}>
                    <IconButton>
                        <Close />
                    </IconButton>
                </Tooltip>
            </div>
            <label htmlFor="delete" className='form-label w-fit'>
                To comfirm delete, type "<strong>{deleteTitle}</strong>" in the box below
            </label>
            <input type="text"
                className='form-control'
                placeholder={`Type "${deleteTitle}" to Comfirm Delete`}
                autoFocus
                {...register("title")}
            />
            <button
                type='submit'
                className='btn btn-danger mt-3 w-full'
                disabled={(watch("title") !== deleteTitle) || isPending}>
                <div className='flex justify-center items-center gap-2'>
                    {
                        isPending ?
                            <>
                                <Spinner />
                                <div>Deleting Note</div>
                            </>
                            :
                            "Delete Note"
                    }
                </div>
            </button>
        </form>
    )
}

export default DeleteNote