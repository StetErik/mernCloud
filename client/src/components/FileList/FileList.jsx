import { useSelector } from 'react-redux'
import File from '../File/File'
import s from './FileList.module.sass'

const FileList = () => {
	const files = useSelector(state => state.file.files).map(file => (
		<File key={file._id} file={file} />
	))
	return (
		<section className={s.wrapper}>
			<div className={s.info}>
				<span className={s.icon}></span>
				<span className={s.name}>Name</span>
				<span className={s.date}>Date</span>
				<span className={s.size}>Size</span>
			</div>
			{files}
		</section>
	)
}

export default FileList
