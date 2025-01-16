import { FC, useState } from 'react'

interface props {
    authenticated: boolean
}

const Menu_items: FC<props> = ({ authenticated }) => {

    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(prev => !prev)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <>
            {
                authenticated &&
                <div className='border-2 border-gray-300 dark:border-gray-600 bg-white-custom dark:bg-dark text-[#424851] dark:text-white px-2 py-1 flex flex-col justify-between items-center gap-3 rounded-md relative user-select-none transition-all'>
                    <div className='flex justify-between items-center gap-3 cursor-pointer ps-4' onClick={handleMenu} >
                        {/* <div className='size-7 rounded-full bg-[url(Aadesh_Gupta.jpg)] bg-cover bg-center bg-no-repeat ring-1 ring-gray-300 dark:ring-gray-600' /> */}
                        <span className='fw-semibold'>Aadesh Gupta</span>
                        <img src="down_arrow.webp" alt="" className='w-3' />
                    </div>
                    {
                        menu &&
                        <div className='w-full md:border-2 md:border-gray-300 dark:border-gray-600 dark:bg-dark md:bg-white-custom md:absolute md:top-8 p-2 rounded-bl-md rounded-b-md flex flex-col justify-center items-center gap-3'>
                            <div className='font-medium'>#Creator_of_Notely</div>
                            <a className='w-full flex  justify-center items-center gap-2 text-decoration-none text-[#424851] dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-slate-200 transition-colors p-1 rounded-md'
                                href='https://www.linkedin.com/in/aadesh-gupta-599812222'
                                target='_blank'>
                                <img src="linkedin.webp" alt="" />
                                LinkedIn
                            </a>
                            <button className='w-full btn btn-danger' onClick={() => handleLogout()}>
                                Logout
                            </button>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Menu_items