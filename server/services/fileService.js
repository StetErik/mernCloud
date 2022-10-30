const fs = require('fs')
const path = require('path')

class FileService {
	createDir(file) {
		const filePath = this.getPath(file)
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve({ message: 'File was created' })
				} else {
					return reject({ message: 'File already exists' })
				}
			} catch (error) {
				return reject({ message: 'File error' })
			}
		})
	}
	deleteFile(file) {
		const path = this.getPath(file)
		return new Promise((resolve, reject) => {
			try {
				if (file.type === 'dir') {
					fs.rmdirSync(path)
				} else {
					fs.unlinkSync(path)
				}
				return resolve({ message: 'File has been deleted' })
			} catch (e) {
				return reject({ message: 'Directory not empty' })
			}
		})
	}
	getPath(file) {
		return path.join(`${process.env.FILE_PATH}`, `${file.user}`, `${file.path}`)
	}
}

module.exports = new FileService()
