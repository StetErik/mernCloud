const fs = require('fs')
const path = require('path')

class FileService {
	createDir(globalFilePath, file) {
		const filePath = this.getPath(globalFilePath, file)
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve()
				} else {
					return reject('Folder already exists')
				}
			} catch (error) {
				return reject('Folder creating error')
			}
		})
	}
	deleteFile(globalFilePath, file) {
		const path = this.getPath(globalFilePath, file)
		return new Promise((resolve, reject) => {
			try {
				if (file.type === 'dir') {
					fs.rmdirSync(path)
				} else {
					fs.unlinkSync(path)
				}
				return resolve({ message: 'File has been deleted' })
			} catch (e) {
				return reject({ message: 'Directory is not empty' })
			}
		})
	}
	getPath(globalFilePath, file) {
		return path.join(`${globalFilePath}`, `${file.user}`, `${file.path}`, `${file.name}`)
	}
}

module.exports = new FileService()
