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
		createDir(folderName, currentDir).then(({ message, createdFolder }) => {
			setFolderName('')
			dispatch(togglePopup())
			dispatch(addFile(createdFolder))
			console.log(message)
		})
	}

	return (
		<section className={s.wrapper} onClick={closePopupHandler}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<div className={s.header}>
					<div className={s.title}>Create File</div>
					<button className={s.closeBtn} onClick={closePopupHandler}>
						X
					</button>
				</div>
				<input onChange={inputChangeHandler} value={folderName} className={s.input} placeholder='Enter file name...' />
				<button onClick={createBtnHandler} className={s.createBtn}>
					Create
				</button>
			</div>
		</section>
	)
}

export default Popup
