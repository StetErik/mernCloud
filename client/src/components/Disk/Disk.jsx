import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../actions/file'
import { togglePopup } from '../../reducers/appReducer'
import { popFromStack, setSort, setView } from '../../reducers/fileReducer'
import FileList from '../FileList'
import Popup from '../Popup'
import Uploader from '../Uploader'

import arrowIcon from './../../assets/icons/arrow.svg'
import listIcon from './../../assets/icons/list.svg'
import plateIcon from './../../assets/icons/plate.svg'
import s from './Disk.module.sass'

const Disk = () => {
	const dispatch = useDispatch()
	const { isPopupVisible } = useSelector(state => state.app)
	const { currentDir, sort } = useSelector(state => state.file)
	const { isUploaderVisible } = useSelector(state => state.upload)
	const [dragEnter, setDragEnter] = useState(false)
	const createFolderHandler = () => {
		dispatch(togglePopup())
	}
	const backClickHandler = () => {
		dispatch(popFromStack())
	}
	const filesUploader = files => {
		files.forEach(file => {
			dispatch(uploadFile(file, currentDir))
		})
	}
	const fileUploadHandler = e => {
		filesUploader([...e.target.files])
	}
	const dragEnterHandler = e => {
		e.preventDefault()
		if (!dragEnter) setDragEnter(true)
	}
	const dragLeaveHandler = e => {
		e.preventDefault()
		setDragEnter(false)
	}
	const dropHandler = e => {
		e.preventDefault()
		setDragEnter(false)
		filesUploader([...e.dataTransfer.files])
	}
	const sortChangeHandler = e => {
		dispatch(setSort(e.target.value))
	}
	const viewHandler = e => {
		if (!e.target.dataset.view) {
			dispatch(setView(e.target.parentElement.dataset.view))
		} else {
			dispatch(setView(e.target.dataset.view))
		}
	}

	return (
		<section className={s.wrapper} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}>
			{dragEnter ? (
				<section onDrop={dropHandler} onDragOver={dragEnterHandler} className={s.drag}>
					Drag Files
				</section>
			) : (
				<>
					<h2 className={s.title}>Files</h2>
					<div className={s.top}>
						<div className={s.btns}>
							<button onClick={backClickHandler} className={[s.btn, s.btn__back].join(' ')}>
								<img src={arrowIcon} alt='arrowIcon' />
							</button>
							<button className={[s.btn, s.btn__create].join(' ')} onClick={createFolderHandler}>
								Create new folder
							</button>
						</div>
						<label onChange={fileUploadHandler} className={s.label}>
							<span>Upload File</span>
							<input type='file' multiple />
						</label>
						<div className={s.sortBlock}>
							<span>Sort: </span>
							<select defaultValue={sort} onChange={sortChangeHandler}>
								<option value='type'>Type</option>
								<option value='name'>Name</option>
								<option value='date'>Date</option>
								<option value='size'>Size</option>
							</select>
						</div>
						<div className={s.views}>
							<button className={[s.viewBtns, s.plateBtn].join(' ')} onClick={viewHandler} data-view='plate'>
								<img src={plateIcon} alt='plateIcon' />
							</button>
							<button className={[s.viewBtns, s.listBtn].join(' ')} onClick={viewHandler} data-view='list'>
								<img src={listIcon} alt='listIcon' />
							</button>
						</div>
					</div>
					<FileList />
					{isPopupVisible && <Popup />}
					{isUploaderVisible && <Uploader />}
				</>
			)}
		</section>
	)
}

export default Disk
