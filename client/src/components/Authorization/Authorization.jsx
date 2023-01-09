import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Input from '../Input'
import { authPost } from '../../actions/user'
import s from './Authorization.module.sass'

const Authorization = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const [isLogin, setLogin] = useState(true)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => setLogin(pathname.includes('login')), [pathname])

	const btnHandler = () => {
		dispatch(authPost(firstName, lastName, email, password, isLogin ? 'login' : 'registration', navigate))
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
