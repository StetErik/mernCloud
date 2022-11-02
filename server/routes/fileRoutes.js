const Router = require('express')
const fileController = require('../controllers/fileController')
const auth = require('../middlewares/authMiddleware')

const router = new Router()

router.post('', auth, fileController.createDir)
router.post('/upload', auth, fileController.uploadFile)
router.get('', auth, fileController.getFiles)
router.get('/download', auth, fileController.downloadFile)
router.delete('', auth, fileController.deleteFile)
router.get('/search', auth, fileController.searchFiles)
router.post('/avatar', auth, fileController.uploadAvatar)
router.delete('/avatar', auth, fileController.deleteAvatar)

module.exports = router
