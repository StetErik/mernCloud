import s from './File.module.sass'
import fileIcon from './../../assets/icons/file.svg'
import folderIcon from './../../assets/icons/folder.svg'
import { pushStack, setCurrentDir } from '../../reducers/fileReducer'
import { useDispatch, useSelector } from 'react-redux'

const File = ({ file }) => {
	const dispatch = useDispatch()
	const { currentDir } = useSelector(state => state.file)
	const openDirHandler = () => {
		dispatch(pushStack(currentDir))
		dispatch(setCurrentDir(file._id))
	}

	return (
		<li className={s.item} onClick={openDirHandler}>
			<img
				className={s.img}
				src={file.type === 'dir' ? folderIcon : fileIcon}
				alt='icon'
			/>
			<h6 className={s.name}>{file.name}</h6>
			<span className={s.date}>{file.date.slice(0, 10)}</span>
			<span className={s.size}>{+file.size}</span>
		</li>
	)
}

export default File
