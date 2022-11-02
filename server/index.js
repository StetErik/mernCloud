const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cors = require('./middlewares/corsMiddleware')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors)
app.use(express.static('static'))
app.use(express.json())
app.use(fileUpload({}))
app.use('/auth', require('./routes/authRoutes'))
app.use('/file', require('./routes/fileRoutes'))

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		console.log('DB was connected')
		await app.listen(PORT)
		console.log('Server is running on PORT: ' + PORT)
	} catch (e) {
		console.log(e.message)
	}
}

start().then(() => console.log('Server has been created'))
