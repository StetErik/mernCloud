import s from './Authorization.module.sass'
import Input from '../Input'
import {useState} from 'react'
import {registration} from '../../actions/user'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>Registration</h2>
      <Input type={'email'} value={email} setValue={setEmail} placeholder={'Enter E-Mail'}/>
      <Input type={'password'} value={password} setValue={setPassword} placeholder={'Enter Password'}/>
      <button className={s.btn} onClick={() => registration(email, password)}>Sing Up</button>
    </section>
  )
}

export default Registration