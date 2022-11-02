const fs = require('fs')
const File = require('../models/fileModel')
const User = require('../models/userModel')
const fileService = require('../services/fileService')
const pathNode = require('path')
const uuid = require('uuid')

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body
			const file = new File({ name, type, parent, user: req.user.id })
			const parentFile = await File.findOne({ _id: parent })
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
			const { sort, parent } = req.query
			let files
			switch (sort) {
				case 'name':
					files = await File.find({ parent, user: req.user.id }).sort({ name: -1 })
					break
				case 'type':
					files = await File.find({ parent, user: req.user.id }).sort({ type: 1 })
					break
				case 'date':
					files = await File.find({ parent, user: req.user.id }).sort({ date: -1 })
					break
				case 'size':
					files = await File.find({ parent, user: req.user.id }).sort({ size: -1 })
					break
				default:
					files = await File.find({ parent, user: req.user.id })
			}
			res.json(files)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
	async uploadFile(req, res) {
		try {
			const { file } = req.files
			const parent = await File.findOne({ user: req.user.id, _id: req.body.parent })
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
			let filePath = file.name
			if (parent) {
				filePath = pathNode.join(`${parent.path}`, `${file.name}`)
			}

			const dbFile = new File({
				type,
				name: file.name,
				size: file.size,
				path: filePath,
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
			const path = fileService.getPath(file)
			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			return res.status(400).json({ message: 'Download Error' })
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
	async deleteFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id })
			if (!file) {
				return res.status(500).json({ message: 'File was not founded' })
			}
			const response = await fileService.deleteFile(file)
			await file.remove()
			res.json(response)
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
	async searchFiles(req, res) {
		try {
			const { search } = req.query
			const files = await File.find({ user: req.user.id })
			res.json(files.filter(file => file.name.includes(search)))
		} catch (e) {
			res.status(400).json(e.message)
		}
	}
	async uploadAvatar(req, res) {
		try {
			const { file } = req.files
			const user = await User.findById(req.user.id)
			if (user.avatar) {
				fs.unlinkSync(process.env.STATIC + '/' + user.avatar)
			}
			const avatarPath = uuid.v4() + '.' + file.name.split('.').pop()
			file.mv(process.env.STATIC + '/' + avatarPath)
			user.avatar = avatarPath
			const userUpdated = await user.save()
			res.json(userUpdated)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async deleteAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id)
			fs.unlinkSync(process.env.STATIC + '/' + user.avatar)
			user.avatar = null
			const userUpdated = await user.save()
			res.json(userUpdated)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
}

module.exports = new FileController()
