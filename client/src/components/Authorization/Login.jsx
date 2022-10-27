import s from './Authorization.module.sass'
import Input from './../Input'
import {useState} from 'react'
import {login} from '../../actions/user'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()

  const handleBtn = () => {
    dispatch(login(email, password)).then(() => location.href = '/auth')
    location.href = '/auth'
  }

  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>Login</h2>
      <Input type={'email'} value={email} setValue={setEmail} placeholder={'Enter E-Mail'}/>
      <Input type={'password'} value={password} setValue={setPassword} placeholder={'Enter Password'}/>
      <button className={s.btn} onClick={handleBtn}>Enter</button>
    </section>
  )
}

export default Login