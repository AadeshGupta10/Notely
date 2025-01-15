import { Close } from '@mui/icons-material';
import { FC, useEffect, useRef, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form';
import { EditNote } from '../../utils/Store/Redux_functions';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { edit_note } from '../../Services/API/api';
import Spinner from '../Spinner/Spinner';

interface prop {
    close: () => void,
    createdAt: string,
    id: string
}

const AddNote: FC<prop> = ({ id, close, createdAt }) => {

    const ref = useRef<any>();

    const [tags, setTags] = useState<string[]>([])

    const dispatch = useDispatch();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const data = useSelector((state: any) => state.data);

    const [newNoteData, setNewNoteData] = useState();

    const { mutate, isPending } = useMutation({
        mutationKey: ["Editing Note"],
        mutationFn: edit_note,
        onSuccess: () => {
            dispatch(EditNote(newNoteData)),
                close() //Closing the Modal
        }
    })

    useEffect(() => {
        const info = (data.filter((item: any) => item.createdAt == createdAt))[0];
        setValue("title", info.title);
        setValue("description", info.description);
        setTags(info.tags);
    }, [])

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
        setNewNoteData({ ...e, "createdAt": createdAt });
        mutate({ ...e, "id": id });
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit((e) => handleNote({ ...e, "tags": tags }))}>
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
            <button className='my-1 btn btn-dark' type='submit' ref={(e) => ref.current = e} disabled={isPending}>
                <div className='flex justify-center items-center gap-2'>
                    {
                        isPending ?
                            <>
                                <Spinner />
                                <div>Editing Note</div>
                            </>
                            :
                            "Edit Note"
                    }
                </div>
            </button>
        </form>
    )
}

export default AddNote