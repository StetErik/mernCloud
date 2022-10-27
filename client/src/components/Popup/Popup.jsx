import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file'
import { setPopupDisplay } from '../../reducers/fileReducer'
import s from './Popup.module.sass'

const Popup = () => {
	const dispatch = useDispatch()
	const { popupDisplay, currentDir } = useSelector(state => state.file)
	const [dirName, setDirName] = useState('')

	const handlePopupDisplay = () => {
		dispatch(setPopupDisplay('none'))
	}

	const createDirHandle = async () => {
		dispatch(createDir(currentDir, dirName))
		setDirName('')
	}

	return (
		<section
			className={s.wrapper}
			style={{ display: popupDisplay }}
			onClick={handlePopupDisplay}
		>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<div className={s.header}>
					<div className={s.title}>Create File</div>
					<button className={s.closeBtn} onClick={handlePopupDisplay}>
						X
					</button>
				</div>
				<input
					className={s.input}
					placeholder='Enter file name...'
					value={dirName}
					onChange={e => setDirName(e.target.value)}
				/>
				<button className={s.createBtn} onClick={createDirHandle}>
					Create
				</button>
			</div>
		</section>
	)
}

export default Popup
