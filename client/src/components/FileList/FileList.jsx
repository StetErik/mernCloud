import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getFiles } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import File from '../File/File'
import Loader from '../Loader'
import s from './FileList.module.sass'

const FileList = () => {
	const { files, currentDir, sort, view } = useSelector(state => state.file)
	const { isLoaderVisible } = useSelector(state => state.app)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(showLoader())
		dispatch(getFiles(currentDir, sort))
	}, [currentDir, sort])

	if (isLoaderVisible) {
		return (
			<div className={s.loader}>
				<Loader />
			</div>
		)
	}
	if (view === 'list') {
		return (
			<section className={s.wrapper}>
				<div className={s.info}>
					<span className={s.icon}></span>
					<span className={s.name}>Name</span>
					<span className={s.date}>Date</span>
					<span className={s.size}>Size</span>
				</div>
				<TransitionGroup className={s.files}>
					{files.map(file => (
						<CSSTransition key={file._id} timeout={300} classNames={'file'} exit={false}>
							<File file={file} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</section>
		)
	}

	if (view === 'plate') {
		return (
			<section className={s.plate}>
				{files.map(file => (
					<File key={file._id} file={file} />
				))}
			</section>
		)
	}
}

export default FileList
