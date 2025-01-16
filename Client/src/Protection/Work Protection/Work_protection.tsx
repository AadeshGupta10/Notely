import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useValidate from '../../hooks/useValidate';
import { useSelector } from 'react-redux';

const Work_protection: React.FC = () => {
    useValidate()

    const user = useSelector((state: any) => state.authentication);

    return (
        user ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default Work_protection