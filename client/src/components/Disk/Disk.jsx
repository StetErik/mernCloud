import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import s from './Disk.module.sass'

import arrowIcon from './../../assets/icons/arrow.svg'
import FileList from '../FileList/FileList'
import Popup from '../Popup/Popup'
import { popStack, setPopupDisplay } from '../../reducers/fileReducer'

const Disk = () => {
	const dispatch = useDispatch()
	const { currentDir } = useSelector(state => state.file)

	useEffect(() => {
		dispatch(getFiles(currentDir))
	}, [currentDir])

	const openPopupHandle = () => {
		dispatch(setPopupDisplay('flex'))
	}

	const backClickHandler = () => {
		dispatch(popStack())
	}

	const fileUploadHandler = e => {
		const files = [...e.target.files]
		files.forEach(file => {
			dispatch(uploadFile(file, currentDir))
		})
	}

	return (
		<section className={s.wrapper}>
			<h2 className={s.title}>Files</h2>
			<div className={s.btns}>
				<button
					className={[s.btn, s.btn__back].join(' ')}
					onClick={backClickHandler}
				>
					<img src={arrowIcon} alt='arrowIcon' />
				</button>
				<button
					className={[s.btn, s.btn__create].join(' ')}
					onClick={openPopupHandle}
				>
					Create new folder
				</button>
			</div>
			<label className={s.label}>
				<span>Upload File</span>
				<input onChange={fileUploadHandler} type='file' multiple />
			</label>
			<FileList />
			<Popup />
		</section>
	)
}

export default Disk
