import { Close } from '@mui/icons-material';
import { FC, useRef, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form';
import { CreateNote } from '../../utils/Store/Redux_functions';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { add_note } from '../../Services/API/api';
import Spinner from '../Spinner/Spinner';

interface prop {
    close: () => void
}

const AddNote: FC<prop> = ({ close }) => {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const ref = useRef<any>();

    const [tags, setTags] = useState<string[]>([])

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [newNoteData, setNewNoteData] = useState();

    const scrollToBottom = () => {
        ref.current.scrollIntoView();
    };

    const handleTags = (e: any) => {
        scrollToBottom();
        e.preventDefault();
        const val = ((e.target.value).split(" ").filter((str: string) => str.length != 0)).join("_");

        if (val.trim().length != 0) {
            setTags([...tags, "#" + val]);
        }

        e.target.value = "";
    }

    const handleRemoveTags = (Tag_index: number) => {
        const filtered = tags.filter((_, index) => index != Tag_index);
        setTags(filtered);
    }

    const handleNote = (e: any) => {

        const today = new Date();

        const day = days[today.getDay()]
        const month = monthNames[today.getMonth()]
        const date = today.getDate()
        const year = today.getFullYear()
        const hr = today.getHours()
        const min = today.getMinutes()
        const sec = today.getSeconds()
        const milli = today.getMilliseconds()

        const createdAt = day + " " + month + " " + date + " " + year + " " + hr + ":" + min + ":" + sec + ":" + milli;

        setNewNoteData({ ...e, "createdAt": createdAt });
        mutate(e);
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ["Adding Note"],
        mutationFn: add_note,
        onSuccess: () => {
            dispatch(CreateNote(newNoteData)),
                close() //Closing the Modal
        }
    })

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit((e) => handleNote({ ...e, "tags": tags, "pin": false }))}>
            <div className='absolute top-0 right-0'>
                <Tooltip title="Close" placement='left' onClick={close}>
                    <IconButton>
                        <Close />
                    </IconButton>
                </Tooltip>
            </div>

            {/* title */}
            <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor="title" className='w-fit'>
                    Title
                </label>
                <input type="text"
                    id='title'
                    className='form-control'
                    placeholder='Enter Title'
                    autoFocus
                    {...register("title", {
                        required: "* Title is required",
                        minLength: 1
                    })} />
                {
                    errors.title && <label className='text-red-400 smaller_text'>
                        {typeof (errors.title.message) == "string" && errors.title.message}
                    </label>
                }
            </div>

            {/* Description */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="description" className='w-fit'>
                    Description
                </label>
                <textarea id="description"
                    className='form-control resize-none'
                    placeholder='Enter Description'
                    rows={7}
                    {...register("description", {
                        required: "* Description is Required",
                        minLength: 1
                    })} />
                {
                    errors.description && <label className='text-red-400 smaller_text'>
                        {typeof (errors.description.message) == "string" && errors.description.message}
                    </label>
                }
            </div>

            {/* Tags */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="tags" className='w-fit'>
                    Tags
                </label>

                {/* Tags */}

                {
                    tags.length > 0 &&
                    <div className='flex flex-wrap gap-2 my-1'>
                        {
                            tags.map((tag, index) => (
                                <span key={index} className='py-1 px-2 rounded-md bg-gray-200 flex justify-between items-center gap-2 cursor-default break-all'>
                                    {tag}
                                    <Close fontSize='small'
                                        onClick={() => handleRemoveTags(index)}
                                        className='cursor-pointer' />
                                </span>
                            ))}
                    </div>
                }

                {/* Tags Input */}
                <div className='flex items-center gap-2'>
                    <input type="text"
                        id="tags"
                        className='form-control'
                        placeholder='Enter Tag Name and Press Enter'
                        onKeyDown={(e) => e.key === "Enter" && handleTags(e)} />
                </div>
            </div>
            <button className='my-1 btn btn-dark' type='submit' ref={(e) => ref.current = e}>
                <div className='flex justify-center items-center gap-2'>
                    {
                        isPending ?
                            <>
                                <Spinner />
                                <div>Adding Note</div>
                            </>
                            :
                            "Add Note"
                    }
                </div>
            </button>
        </form>
    )
}

export default AddNote