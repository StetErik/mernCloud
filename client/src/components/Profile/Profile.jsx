import { useDispatch } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'
import s from './Profile.module.sass'

const Profile = () => {
	const dispatch = useDispatch()

	const uploadFileHandler = e => {
		e.preventDefault()
		e.stopPropagation()
		const file = e.target.files[0]
		dispatch(uploadAvatar(file))
	}

	return (
		<section className={s.wrapper}>
			<label>
				<input onChange={uploadFileHandler} type='file' accept='image/*' />
				<span>Update Avatar</span>
			</label>
			<button onClick={() => dispatch(deleteAvatar())}>Delete Avatar</button>
		</section>
	)
}

export default Profile
