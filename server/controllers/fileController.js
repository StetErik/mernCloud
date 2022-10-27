const File = require('../models/fileModel')
const fileService = require('../services/fileService')

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body
			const file = new File({ name, type, parent, user: req.user.id })
			const parentFile = await File.findOne({
				_id: parent,
			})
			if (!parentFile) {
				file.path = name
				await fileService.createDir(file)
			} else {
				file.path = `${parentFile.path}\/${name}`
				parentFile.children.push(file._id)
				await parentFile.save()
				await fileService.createDir(file)
			}
			const createdFile = await file.save()
			res.json(createdFile)
		} catch (error) {
			res.status(400).json(error.message)
		}
	}
	async getFiles(req, res) {
		try {
			const files = await File.find({
				parent: req.query.parent,
			})
			res.json(files)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

module.exports = new FileController()
