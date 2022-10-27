import {Link, NavLink} from 'react-router-dom'
import s from './NavBar.module.sass'
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../../actions/user'

const logo = require('./../../assets/images/logo.png')

function NavBar() {
  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <section className={s.wrapper}>
      <div className={s.content}>
        <div className={s.logo}>
          <img className={s.img} src={logo} alt='logo'/>
          <h1 className={s.title}>
            <Link to={'/auth'}>MERN CLOUD</Link>
          </h1>
        </div>
        <nav>
          <ul className={s.list}>
            {!isAuth && <li><NavLink className={s.link} to={'/auth/login'}>Login</NavLink></li>}
            {!isAuth && <li><NavLink className={s.link} to={'/auth/registration'}>Registration</NavLink></li>}
            {isAuth && <li className={s.link} onClick={() => dispatch(logOut())}>Sign Out</li>}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default NavBar