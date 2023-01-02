import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Input from '../Input'
import { authPost } from '../../actions/user'
import s from './Authorization.module.sass'

const Authorization = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const { pathname } = useLocation()
	const [isLogin, setLogin] = useState(true)
	const navigate = useNavigate()

	useEffect(() => (pathname.includes('login') ? setLogin(true) : setLogin(false)), [pathname])

	const btnHandler = () => {
		dispatch(authPost(email, password, isLogin ? 'login' : 'registration', navigate))
	}

	return (
		<section className={s.wrapper}>
			<div className={s.block}>
				<h2 className={s.title}>{isLogin ? 'Login' : 'Registration'}</h2>
				{!isLogin && (
					<>
						<Input type={'text'} value={firstName} setValue={setFirstName} placeholder={'First Name'} />
						<Input type={'text'} value={lastName} setValue={setLastName} placeholder={'Last Name'} />
					</>
				)}
				<Input type={'email'} value={email} setValue={setEmail} placeholder={'E-Mail'} />
				<Input type={'password'} value={password} setValue={setPassword} placeholder={'Password'} />
				<div className={s.middle}>
					<span>{isLogin ? 'Do not have account?' : 'Already have account?'}</span>
					<Link to={isLogin ? '/auth/registration' : '/auth/login'}>{isLogin ? 'Sign Up' : 'Sign In'}</Link>
				</div>
				<button className={s.btn} onClick={btnHandler}>
					{isLogin ? 'Sign In' : 'Sign Up'}
				</button>
			</div>
		</section>
	)
}

export default Authorization
