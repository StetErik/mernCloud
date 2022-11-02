const fs = require('fs')
const path = require('path')

class FileService {
	createDir(req, file) {
		const filePath = this.getPath(req, file)
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
	deleteFile(req, file) {
		const path = this.getPath(req, file)
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
	getPath(req, file) {
		return path.join(`${req.filePath}`, `${file.user}`, `${file.path}`)
	}
}

module.exports = new FileService()
