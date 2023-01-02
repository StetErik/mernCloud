import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../reducers/uploadReducer'
import UploaderFile from '../UploaderFile'
import s from './Uploader.module.sass'

const Uploader = () => {
	const dispatch = useDispatch()
	const { files } = useSelector(state => state.upload)
	const closeClickHandler = () => {
		dispatch(hideUploader())
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
