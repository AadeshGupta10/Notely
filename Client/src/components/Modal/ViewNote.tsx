import { FC } from "react"
import { IconButton, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material';
import { useSelector } from "react-redux";

interface prop {
    close: () => void,
    createdAt: string,
}

const ViewNote: FC<prop> = ({ close, createdAt }) => {

    const data = useSelector((state: any) => state.data);

    const info = (data.filter((item: any) => item.createdAt == createdAt))[0];

    return (
        <div className='flex flex-col gap-3'>
            <div className='absolute top-0 right-0'>
                <Tooltip title="Close" placement='left' onClick={close}>
                    <IconButton>
                        <Close />
                    </IconButton>
                </Tooltip>
            </div>

            {/* title */}
            <div className='flex flex-col gap-2 mt-3'>
                <label className='w-fit'>
                    Title
                </label>
                <input type="text"
                    className='form-control' disabled value={info.title} />
            </div>

            {/* Description */}
            <div className='flex flex-col gap-2'>
                <label className='w-fit'>
                    Description
                </label>
                <textarea
                    className='form-control resize-none'
                    rows={7}
                    disabled
                    defaultValue={info.description.trim().length == 0 ? "No Description" : info.description}>
                </textarea>
            </div>

            {/* Tags */}
            <div className='flex flex-col gap-2'>
                <label className='w-fit'>
                    Tags
                </label>

                {/* Tags */}

                {
                    info.tags.length > 0 &&
                    <div className='flex flex-wrap gap-2 my-1'>
                        {
                            info.tags.map((tag: string, index: number) => (
                                <span key={index} className='py-1 px-2 rounded-md bg-gray-200 flex justify-between items-center gap-2 cursor-default break-all'>
                                    {
                                        tag
                                    }
                                </span>
                            ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default ViewNote