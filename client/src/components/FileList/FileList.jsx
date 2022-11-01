import { useSelector } from 'react-redux'
import File from '../File/File'
import s from './FileList.module.sass'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const FileList = () => {
	const files = useSelector(state => state.file.files)

	return (
		<section className={s.wrapper}>
			<div className={s.info}>
				<span className={s.icon}></span>
				<span className={s.name}>Name</span>
				<span className={s.date}>Date</span>
				<span className={s.size}>Size</span>
			</div>
			{!!files.length ? (
				<TransitionGroup>
					{files.map(file => (
						<CSSTransition key={file._id} timeout={300} classNames={'file'}>
							<File file={file} />
						</CSSTransition>
					))}
				</TransitionGroup>
			) : (
				<div className={s.loader}>
					<h2>Files weren't found</h2>
				</div>
			)}
		</section>
	)
}

export default FileList
