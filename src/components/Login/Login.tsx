import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { login } from '../../store/asyncActions/asyncUserActions'
import { Input } from '../../UI/Input/Input'
import s from './Login.module.scss'

const Login = () => {
    const dispatch = useDispatch()
    const { authError, user } = useTypeSelector((state) => state)
    const [loginOrEmail, setLoginOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginOrEmail(e.target.value)
    }

    const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginHandler = () => dispatch(login(loginOrEmail, password))

    return (
        <div className={`${s.container}`}>
            <h2 className="authorization__container-title">Login</h2>
            <Input className={s.input} value={loginOrEmail} placeholder='Login or Email' onChange={loginInputHandler} icon={<i className="fas fa-search"></i>} />
            <Input className={`${s.input} mt-1`} value={password} placeholder='Password' onChange={passwordInputHandler} icon={<i className="fas fa-search"></i>} />
            <p className='m-0'>
                You have account? 
                <Link to="/registration"><span className={`${s.registrRedirect} ml-1`}>Registration</span></Link>
            </p>
            <div className='pt-1 pb-1'>
                <p>{authError}</p>
            </div>
            <button className={`${s.button} mt-1`} onClick={loginHandler}>Login</button>
        </div>
    )
}

export default Login
