import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createDir } from '../../actions/file'
import { togglePopup } from '../../reducers/appReducer'
import { addFile } from '../../reducers/fileReducer'

import s from './Popup.module.sass'

const Popup = () => {
	const dispatch = useDispatch()
	const { currentDir } = useSelector(state => state.file)
	const [folderName, setFolderName] = useState('')

	const closePopupHandler = e => {
		dispatch(togglePopup())
	}
	const inputChangeHandler = e => {
		setFolderName(e.target.value)
	}
	const createBtnHandler = () => {
		createDir(folderName, currentDir).then(data => {
			setFolderName('')
			dispatch(togglePopup())
			dispatch(addFile(data))
		})
	}

	return (
		<section className={s.wrapper} onClick={closePopupHandler}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<div className={s.header}>
					<div className={s.title}>Create Folder</div>
					<button className={s.closeBtn} onClick={closePopupHandler}>
						&times;
					</button>
				</div>
				<div className={s.middle}>
					<input
						onChange={inputChangeHandler}
						value={folderName}
						className={s.input}
						placeholder='Enter folder name...'
					/>
					<button onClick={createBtnHandler} className={s.createBtn}>
						Create
					</button>
				</div>
			</div>
		</section>
	)
}

export default Popup
