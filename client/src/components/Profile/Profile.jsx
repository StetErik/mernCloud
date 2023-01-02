import { useDispatch } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'
import s from './Profile.module.sass'

const Profile = () => {
	const dispatch = useDispatch()

	const uploadFileHandler = e => {
		dispatch(uploadAvatar(e.target.files[0]))
	}

	const deleteAvatarHandler = () => {
		dispatch(deleteAvatar())
	}

	return (
		<section className={s.wrapper}>
			<label>
				<input onChange={uploadFileHandler} type='file' accept='image/*' />
				<span>Update Avatar</span>
			</label>
			<button onClick={deleteAvatarHandler}>Delete Avatar</button>
		</section>
	)
}

export default Profile
