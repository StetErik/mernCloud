const fs = require('fs')
const uuid = require('uuid')
const { join, resolve } = require('path')

const File = require('../models/fileModel')
const User = require('../models/userModel')
const fileService = require('../services/fileService')

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body
			const user = await User.findById(req.user.id)
			const file = new File({ name, type, parent, user: user._id })
			const parentFile = await File.findOne({ _id: parent })
			if (!parentFile) {
				file.path = ''
				await fileService.createDir(req.globalFilePath, file)
			} else {
				file.path = join(`${parentFile.path}`, `${parentFile.name}`)
				parentFile.children.push(file._id)
				await parentFile.save()
				await fileService.createDir(req.globalFilePath, file)
			}
			user.files.push(file._id)
			await user.save()
			const createdFile = await file.save()
			res.json(createdFile)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getFiles(req, res) {
		try {
			const { sort, parent } = req.query
			let files
			switch (sort) {
				case 'name':
					files = await File.find({ parent, user: req.user.id }).sort({ name: 1 })
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
	async existCheck(req, res) {
		try {
			const { name, parent } = req.query
			const file = await File.findOne({ name, parent: parent || null })
			res.json(!!file)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async uploadFile(req, res) {
		try {
			const { file } = req.files
			const parent = await File.findOne({ user: req.user.id, _id: req.body.parent })
			const user = await User.findOne({ _id: req.user.id })

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(500).json('Not enough disk space')
			}
			user.usedSpace += file.size
			let path = null

			if (parent) {
				path = join(`${req.globalFilePath}`, `${user._id}`, `${parent.path}`, `${parent.name}`, `${file.name}`)
			} else {
				path = join(`${req.globalFilePath}`, `${user._id}`, `${file.name}`)
			}

			if (fs.existsSync(path)) {
				return res.status(400).json('File already exists')
			}

			file.mv(path)
			const type = file.name.split('.').pop()
			let filePath = ''
			if (parent) {
				filePath = join(`${parent.path}`, `${parent.name}`)
			}
			const dbFile = new File({
				type,
				name: file.name,
				size: file.size,
				path: filePath,
				user: user._id,
				parent: parent ? parent._id : null
			})
			user.files.push(dbFile._id)
			await dbFile.save()
			await user.save()
			res.json(dbFile)
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
	async downloadFile(req, res) {
		try {
			const file = await File.findById(req.query.id)
			const path = fileService.getPath(req.globalFilePath, file)
			if (fs.existsSync(path)) {
				return res.download(path, file.name)
			}
			res.status(400).json('Download Error')
		} catch (e) {
			res.status(500).json(e.message)
		}
	}
	async deleteFile(req, res) {
		try {
			const user = await User.findById(req.user.id)
			const file = await File.findOne({ _id: req.query.id, user: user._id })
			if (!file) {
				return res.status(500).json('File has not founded')
			}
			const response = await fileService.deleteFile(req.globalFilePath, file)
			user.files = user.files.filter(fileId => fileId != file.id)
			await file.remove()
			await user.save()
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
				fs.unlinkSync(resolve() + '/static/' + user.avatar)
			}
			const avatarPath = uuid.v4() + '.' + file.name.split('.').pop()
			file.mv(resolve() + '/static/' + avatarPath)
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
			const path = resolve() + '/static/' + user.avatar
			if (fs.existsSync(path)) {
				fs.unlinkSync(path)
				user.avatar = null
				const userUpdated = await user.save()
				res.json(userUpdated)
			} else {
				res.json(user)
			}
		} catch (error) {
			res.status(500).json(error.message)
		}
	}
}

module.exports = new FileController()
