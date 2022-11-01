import s from './File.module.sass'
import fileIcon from './../../assets/icons/file.svg'
import folderIcon from './../../assets/icons/folder.svg'
import { pushStack, setCurrentDir } from '../../reducers/fileReducer'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile, downloadFile } from '../../actions/file'
import sizeFormat from '../../utils/sizeFormat'

const File = ({ file }) => {
	const dispatch = useDispatch()
	const { currentDir } = useSelector(state => state.file)
	const openDirHandler = () => {
		if (file.type === 'dir') {
			dispatch(pushStack(currentDir))
			dispatch(setCurrentDir(file._id))
		}
	}

	function downloadClickHandler(e) {
		e.stopPropagation()
		downloadFile(file)
	}

	function deleteFileHandler(e) {
		e.stopPropagation()
		dispatch(deleteFile(file))
	}

	return (
		<li className={s.item} onClick={openDirHandler}>
			<img className={s.img} src={file.type === 'dir' ? folderIcon : fileIcon} alt='icon' />
			<h6 className={s.name}>{file.name}</h6>
			{file.type !== 'dir' && (
				<button className={s.download} onClick={downloadClickHandler}>
					Download
				</button>
			)}
			<button onClick={deleteFileHandler} className={s.delete}>
				Delete
			</button>
			<span className={s.date}>{file.date.slice(0, 10)}</span>
			<span className={s.size}>{sizeFormat(file.size)}</span>
		</li>
	)
}

export default File
