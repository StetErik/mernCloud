import { useDispatch, useSelector } from 'react-redux'
import { uploadHide } from '../../reducers/uploadReducer'
import UploaderFile from '../UploaderFile/UploaderFile'
import s from './Uploader.module.sass'

const Uploader = () => {
	const { files } = useSelector(state => state.upload)
	const dispatch = useDispatch()
	const closeClickHandler = () => {
		dispatch(uploadHide())
	}

	return (
		<section className={s.wrapper}>
			<div className={s.header}>
				<span className={s.title}>Downloads</span>
				<button onClick={closeClickHandler} className={s.close}>
					X
				</button>
			</div>
			{files.map(file => (
				<UploaderFile file={file} key={file.id} />
			))}
		</section>
	)
}

export default Uploader
