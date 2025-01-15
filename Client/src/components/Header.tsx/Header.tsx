import { Close, Menu } from '@mui/icons-material';
import { useState } from 'react'
import Menu_items from './Menu_items';
import { useSelector } from 'react-redux';
// import IconMoon from '../Icons/IconMoon';
// import IconSun from '../Icons/IconSun';
// import { flushSync } from 'react-dom';

const Header = () => {

    const auth = useSelector((state: any) => state.authentication);
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(prev => !prev)
    }

    // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // const toggleDarkMode = async () => {
    //     flushSync(() => {
    //         setIsDarkMode(prev => !prev);
    //     });
    // };

    // useEffect(() => {
    //     const theme = localStorage.getItem("theme")

    //     if (theme == "true") {
    //         setIsDarkMode(true)
    //     }
    //     else {
    //         setIsDarkMode(false)
    //     }
    // }, [])

    // useEffect(() => {
    //     // Updating the Redux Store and Local Theme Storage 

    //     localStorage.setItem("theme", JSON.stringify(isDarkMode));

    //     if (isDarkMode) {
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [isDarkMode]);

    return (
        <>
            <div className={`bg-white-custom dark:bg-dark min-h-[9vh] flex justify-between items-center shadow-md dark:shadow-gray-700 gap-4 ${auth && "flex-wrap relative"} ${menu && "py-3"} sticky top-0`}>
                <img src="/notely_light.png"
                    alt="notely"
                    className='w-32 h-5 object-contain object-center' />

                {
                    auth ?
                        <>
                            <div className='pr-6 dark:text-white flex justify-center items-center gap-4 md:hidden'>
                                {/* <Theme toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> */}
                                {
                                    menu ? <Close onClick={handleMenu} /> : <Menu onClick={handleMenu} />
                                }
                            </div>
                            <>
                                {
                                    menu &&
                                    <div className='w-full absolute bg-white-custom dark:bg-dark shadow-md py-3 top-[9vh] flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-4 transition-all md:hidden'>
                                        <Menu_items authenticated={auth} />
                                    </div>
                                }
                                <div className='hidden md:flex justify-center items-center gap-10 transition-all pe-6'>
                                    {/* <Theme toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> */}
                                    <Menu_items authenticated={auth} />
                                </div>
                            </>
                        </>
                        :
                        <div className='pe-6'>
                            {/* <Theme toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> */}
                            <Menu_items authenticated={auth} />
                        </div>
                }
            </div>
        </>
    )
}

export default Header

// interface Prop {
//     toggleDarkMode: () => void,
//     isDarkMode: boolean
// }

// const Theme: React.FC<Prop> = ({ toggleDarkMode, isDarkMode }) => {
//     return (
//         <button type='button'
//             className='w-[40px] h-[22px] rounded-full bg-gray-200 ring-1 ring-gray-300 dark:bg-gray-700 dark:ring-gray-600 outline-none'
//             onClick={toggleDarkMode}
//         >
//             <span
//                 className={`flex items-center justify-center w-[20px] h-[20px] bg-gray-50 dark:bg-dark text-gray-600 dark:text-white shadow rounded-full transition-transform ${isDarkMode ? 'translate-x-[19px]' : 'translate-x-[0px]'}`}>
//                 {
//                     isDarkMode ? <IconMoon /> : <IconSun />
//                 }
//             </span>
//         </button>
//     )
// }
