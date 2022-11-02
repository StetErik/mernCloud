const Router = require('express')
const bcryptjs = require('bcryptjs')
const { validationResult, check } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('./../models/userModel')
const router = Router()
const auth = require('./../middlewares/authMiddleware')
const fileService = require('../services/fileService')
const File = require('../models/fileModel')

router.post(
	'/registration',
	check('email', 'Invalid email').isEmail(),
	check('password', 'Incorrect password').isLength({ min: 3, max: 12 }),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(401).json({ message: errors.array()[0].msg })
			}
			const { email, password } = req.body
			const candidate = await User.findOne({ email })
			if (candidate) {
				return res.status(401).json({ message: `User with email: ${email} already exists!` })
			}
			const hashPassword = await bcryptjs.hash(password, 8)
			const user = await User.create({ email, password: hashPassword })
			await fileService.createDir(req, new File({ user: user._id, name: '' }))
			res.json({ message: 'User has been created' })
		} catch (e) {
			res.status(401).json(e.message)
		}
	}
)

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({ message: "User wasn't found" })
		}
		const isCorrectPassword = await bcryptjs.compare(password, user.password)
		if (!isCorrectPassword) {
			return res.status(401).json({ message: 'Incorrect password' })
		}
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
			expiresIn: '1hr',
		})
		res.json({
			token,
			user: {
				email: user.email,
				diskSpace: user.diskSpace,
				usedSpace: user.usedSpace,
				avatar: user.avatar,
				files: user.files,
			},
		})
	} catch (e) {
		res.status(401).json(e.message)
	}
})

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id })
		if (!user) {
			return res.status(401).json({ message: "User wasn't found" })
		}
		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
			expiresIn: '1hr',
		})
		res.json({
			token,
			user: {
				email: user.email,
				diskSpace: user.diskSpace,
				usedSpace: user.usedSpace,
				avatar: user.avatar,
				files: user.files,
			},
		})
	} catch (error) {
		res.status(401).json(error.message)
	}
})

module.exports = router
