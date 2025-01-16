import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useValidate from '../../hooks/useValidate';
import { useSelector } from 'react-redux';
import Loading from '../../pages/Loading/Loading';

const Work_protection: React.FC = () => {
    useValidate()

    const user = useSelector((state: any) => state.authentication);

    const isLoading = useSelector((state: any) => state.loading);

    return (
        isLoading ? <Loading /> :
            user ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default Work_protection