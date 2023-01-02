import { useDispatch } from 'react-redux'
import { hideFile } from '../../reducers/uploadReducer'
import s from './UploaderFile.module.sass'

const UploaderFile = ({ file }) => {
	const dispatch = useDispatch()
	const closeBtnHandler = () => {
		dispatch(hideFile(file.id))
	}

	return (
		<section className={s.wrapper}>
			<div className={s.header}>
				<span className={s.name}>{file.name}</span>
				<button onClick={closeBtnHandler} className={s.close}>
					X
				</button>
			</div>
			<div className={s.progress}>
				<span style={{ width: file.progress + '%' }} className={s.bar}></span>
				<span className={s.percent}>{file.progress}%</span>
			</div>
		</section>
	)
}

export default UploaderFile
