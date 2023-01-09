import { useDispatch, useSelector } from 'react-redux'
import { deleteFile, downloadFile } from '../../actions/file'
import { pushToStack, setCurrentDir } from '../../reducers/fileReducer'
import sizeFormat from '../../utils/sizeFormat'
import fileIcon from './../../assets/icons/file.svg'
import folderIcon from './../../assets/icons/folder.svg'
import s from './File.module.sass'

const File = ({ file }) => {
	const dispatch = useDispatch()
	const { currentDir, view } = useSelector(state => state.file)

	const openDirHandler = () => {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}
	const downloadClickHandler = () => {
		downloadFile(file._id, file.name)
	}
	const deleteFileHandler = () => {
		dispatch(deleteFile(file._id))
	}
	const nameCutter = name => {
		if (name.length <= 14) return name
		let nameArr = name.split('')
		nameArr.length = 11
		return nameArr.join('') + '...'
	}

	if (view === 'list') {
		return (
			<li className={s.item}>
				<div className={s.img}>
					<img
						draggable='false'
						onClick={openDirHandler}
						src={file.type === 'dir' ? folderIcon : fileIcon}
						alt='icon'
					/>
				</div>
				<h6 onClick={openDirHandler} className={s.name}>
					{file.name}
				</h6>
				{file.type !== 'dir' && (
					<button className={s.download} onClick={downloadClickHandler}>
						Download
					</button>
				)}
				<button className={s.delete} onClick={deleteFileHandler}>
					Delete
				</button>
				<span className={s.size}>{file.type !== 'dir' ? sizeFormat(file.size) : ''}</span>
				<span className={s.date}>{file.date.slice(0, 10)}</span>
			</li>
		)
	}

	if (view === 'plate') {
		return (
			<li className={s.plate}>
				<div className={s.plate__img}>
					<img
						onClick={openDirHandler}
						draggable='false'
						src={file.type === 'dir' ? folderIcon : fileIcon}
						alt='icon'
					/>
				</div>
				<h6 onClick={openDirHandler} className={s.plate__name}>
					{nameCutter(file.name)}
				</h6>
				<div className={s.plate__btns}>
					{file.type !== 'dir' && (
						<button className={s.plate__download} onClick={downloadClickHandler}>
							Download
						</button>
					)}
					<button className={s.plate__delete} onClick={deleteFileHandler}>
						Delete
					</button>
				</div>
			</li>
		)
	}
}

export default File
