import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import s from './Disk.module.sass'

import arrowIcon from './../../assets/icons/arrow.svg'
import FileList from '../FileList/FileList'
import Popup from '../Popup/Popup'
import { popStack, setPopupDisplay } from '../../reducers/fileReducer'
import Uploader from '../Uploader/Uploader'
import Loader from '../Loader'

const Disk = () => {
	const dispatch = useDispatch()
	const { currentDir } = useSelector(state => state.file)
	const { isUploaderVisible } = useSelector(state => state.upload)
	const [dragState, setDragState] = useState(false)
	const [sortValue, setSortValue] = useState('type')
	const { loader } = useSelector(state => state.app)

	useEffect(() => {
		dispatch(getFiles(currentDir, sortValue))
	}, [currentDir, sortValue])

	const openPopupHandle = () => {
		dispatch(setPopupDisplay('flex'))
	}

	const backClickHandler = () => {
		dispatch(popStack())
	}

	const fileUploadHandler = e => {
		const filesLocal = [...e.target.files]
		filesLocal.forEach(file => {
			dispatch(uploadFile(file, currentDir))
		})
	}

	const dragEnterHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		setDragState(true)
	}
	const dragLeaveHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		setDragState(false)
	}
	const dropHandler = event => {
		event.preventDefault()
		event.stopPropagation()
		const filesLocal = [...event.dataTransfer.files]
		filesLocal.forEach(file => {
			dispatch(uploadFile(file, currentDir))
		})
		setDragState(false)
	}
	const sortValueHandler = e => {
		setSortValue(e.target.value)
	}
	if (loader) {
		return (
			<div className={s.loader}>
				<Loader />
			</div>
		)
	}

	return !dragState ? (
		<section
			className={s.wrapper}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
		>
			<h2 className={s.title}>Files</h2>
			<div className={s.top}>
				<div className={s.btns}>
					<button className={[s.btn, s.btn__back].join(' ')} onClick={backClickHandler}>
						<img src={arrowIcon} alt='arrowIcon' />
					</button>
					<button className={[s.btn, s.btn__create].join(' ')} onClick={openPopupHandle}>
						Create new folder
					</button>
				</div>
				<label className={s.label}>
					<span>Upload File</span>
					<input onChange={fileUploadHandler} type='file' multiple />
				</label>
				<div className={s.sortBlock}>
					<span>Sort: </span>
					<select defaultValue={sortValue} onChange={sortValueHandler}>
						<option value='type'>Type</option>
						<option value='name'>Name</option>
						<option value='date'>Date</option>
						<option value='size'>Size</option>
					</select>
				</div>
			</div>
			<FileList />
			<Popup />
			{isUploaderVisible && <Uploader />}
		</section>
	) : (
		<section
			className={s.drag}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
			onDrop={dropHandler}
		>
			Drag Area
		</section>
	)
}

export default Disk
