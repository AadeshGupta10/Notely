import { Delete, Edit, PushPinOutlined } from '@mui/icons-material'
import { FC, useState } from 'react'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { PinNote, UnPinNote } from '../../utils/Store/Redux_functions'
import { useMutation } from '@tanstack/react-query'
import { pin_unpin_note } from '../../Services/API/api'

interface Prop {
    id: string,
    title: string,
    createdAt: string
    description: string,
    tags: string[],
    pin: boolean,
    edit: () => void,
    del: () => void,
    view: () => void
}

const Cards: FC<Prop> = ({ id, title, createdAt, description, tags, pin, edit, del, view }) => {

    const [pinned, setPinned] = useState(pin)
    const dispatch = useDispatch()

    const { mutate: pinunpinMutate } = useMutation({
        mutationKey: ["Pinning and Unpinning Note"],
        mutationFn: pin_unpin_note,
        onSuccess: () => {
            pinned ? dispatch(PinNote(createdAt)) : dispatch(UnPinNote(createdAt))
        }
    })

    const handlePin = () => {
        pinunpinMutate({ "id": id, "pin": !pinned, "createdAt": createdAt });
        setPinned(!pinned);
    }

    const handleView = (e: any) => {
        view()
        e.stopPropagation()
    }

    var fulldate = (new Date(createdAt)).toString().split(" ");

    var suffix = "";

    const date = parseInt(fulldate[2]);

    if (date == 1 || date == 21 || date == 31) {
        suffix = "st";
    }
    else if (date == 2 || date == 22) {
        suffix = "nd"
    }
    else if (date == 3 || date == 23) {
        suffix = "rd"
    }
    else {
        suffix = "th"
    }

    const modifiedDate = parseInt(fulldate[2]) + suffix + "\t" + fulldate[1] + ", \t" + fulldate[3];

    const pinColor = "text-amber-500";
    const defaultColor = "text-gray-400";

    return (
        <div className='h-32 px-3 py-2 rounded-md border-1 border-gray-300 small_text transition-all cursor-pointer hover:shadow-lg overflow-hidden' onClick={(e) => handleView(e)}>
            <div className='w-full'>
                {/* title & Pin Button */}
                <div className='w-full flex justify-between items-center'>
                    <label className='text-md fw-semibold line-clamp-1'>
                        {
                            title
                        }
                    </label>
                    <Tooltip title={pinned ? "Unpin Note" : "Pin Note"} placement='bottom'>
                        <PushPinOutlined fontSize='small' className={`${pinned ? pinColor : defaultColor} hover:text-amber-300 transition-all`} onClick={(e) => {
                            e.stopPropagation(); // Prevent parent click event
                            handlePin();
                        }} />
                    </Tooltip>
                </div>
                {/* createdAt */}
                <label className='smaller_text mb-2'>
                    {
                        modifiedDate
                    }
                </label>
                {/* Content */}
                <p className='h-5 line-clamp-1 text-justify break-all'>
                    {
                        description.length > 0 ? description : <span className={defaultColor}>No Description</span>
                    }
                </p>
                {/* Tags, Edit and Delete Button */}
                <div className='flex justify-between items-center'>
                    {/* Tags */}
                    <div className='h-4 flex flex-wrap gap-2 smaller_text w-4/5 fw-medium overflow-hidden'>
                        {
                            tags.length > 0 ?
                                tags.map((tag, index) => (
                                    <span className='max-w-80 truncate' key={index}>
                                        {
                                            tag
                                        }
                                    </span>
                                ))
                                :
                                <span className={defaultColor}>No Tags</span>
                        }
                    </div>
                    {/* Edit and Delete Button */}
                    <div className='flex gap-3'>
                        <Tooltip title="Edit Note" placement="bottom">
                            <Edit fontSize='small' className={`${defaultColor} hover:text-green-600 transition-all`} onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click event
                                edit();
                            }} />
                        </Tooltip>
                        <Tooltip title="Delete Note" placement="bottom">
                            <Delete fontSize='small' className={`${defaultColor} hover:text-red-600 transition-all`} onClick={(e) => {
                                e.stopPropagation(); // Prevent parent click event
                                del();
                            }} />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards