const fs = require('fs')
const File = require('../models/fileModel')
const User = require('../models/userModel')
const fileService = require('../services/fileService')
const pathNode = require('path')

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
				file.path = pathNode.join(`${parentFile.path}`, `${name}`)
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
				user: req.user.id,
			})
			res.json(files)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	async uploadFile(req, res) {
		try {
			const { file } = req.files
			const parent = await File.findOne({
				user: req.user.id,
				_id: req.body.parent,
			})

			const user = await User.findOne({ _id: req.user.id })

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(500).json({ message: 'Not enough disk space' })
			}
			user.usedSpace += file.size
			let path = null

			if (parent) {
				path = pathNode.join(`${process.env.FILE_PATH}`, `${user._id}`, `${parent.path}`, `${file.name}`)
			} else {
				path = pathNode.join(`${process.env.FILE_PATH}`, `${user._id}`, `${file.name}`)
			}

			if (fs.existsSync(path)) {
				return res.status(400).json({ message: 'File already exists' })
			}

			file.mv(path)
			const type = file.name.split('.').pop()

			const dbFile = new File({
				type,
				name: file.name,
				size: file.size,
				path: parent?.path,
				user: user._id,
				parent: parent?._id,
			})
			await dbFile.save()
			await user.save()
			res.json(dbFile)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async downloadFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id })
			const path = pathNode.join(`${process.env.FILE_PATH}`, `${req.user.id}`, `${file.path}`, `${file.name}`)
			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			return res.status(400).json({ message: 'Download Error' })
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
}

module.exports = new FileController()
