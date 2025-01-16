import { Outlet } from 'react-router-dom'
import Header from '../Header.tsx/Header'

const Dashboard_outlet = () => {
    return (
        <div className='h-screen'>
            <Header />
            <div className='h-[91vh] bg-white-custom dark:bg-dark dark:text-white'>
                <div className='h-full overflow-y-auto custom-scrollbar'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard_outlet