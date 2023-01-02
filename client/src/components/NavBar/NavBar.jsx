import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { searchFile } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import { logOut } from '../../reducers/userReducer'
import { resetStack } from '../../reducers/fileReducer'

import s from './NavBar.module.sass'
import avatarIcon from '../../assets/icons/avatar.svg'
import searchIcon from '../../assets/icons/search.svg'

function NavBar() {
	const { isAuth, currentUser } = useSelector(state => state.user)
	const [searchTimeout, setSearchTimeout] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const { avatar } = currentUser
	const dispatch = useDispatch()

	function dispatchSearch(value = '') {
		dispatch(showLoader())
		dispatch(resetStack())
		dispatch(searchFile(value))
	}
	function searchHandler(e) {
		setSearchValue(e.target.value)
		clearTimeout(searchTimeout)
		setSearchTimeout(
			setTimeout(() => {
				dispatchSearch(e.target.value)
			}, 500)
		)
	}
	function resetSearch() {
		setSearchValue('')
		dispatchSearch()
	}

	return (
		<section className={s.wrapper}>
			<div className={s.content}>
				<div className={s.logo}>
					<h1 className={s.title}>
						<Link to={'/auth'}>Cloud</Link>
					</h1>
				</div>
				{!isAuth ? (
					<NavLink className={s.link} to={'/auth/registration'}>
						Sign Up
					</NavLink>
				) : (
					<div className={s.bottom}>
						<label className={[s.search, searchValue.length ? s.active : ''].join(' ')}>
							<img src={searchIcon} alt='searchIcon' />
							<input value={searchValue} placeholder='Search...' onChange={searchHandler} type='text' name='search' />
							{searchValue.length ? <span onClick={resetSearch}>&times;</span> : null}
						</label>
						<Link to={'/profile'}>
							<img className={s.img} src={avatar ? `http://localhost:3030/${avatar}` : avatarIcon} alt='avatar' />
						</Link>
						<button className={s.link} onClick={() => dispatch(logOut())}>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

export default NavBar
