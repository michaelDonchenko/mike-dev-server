const { Router } = require('express')
const {
  getPlaylists,
  createPlaylist,
  getAllvideos,
  createVideo,
  deletePlaylist,
  getPlaylist,
  updatePlaylist,
  deleteVideo,
  getVideo,
  updateVideo,
  getPlaylistWithVideos,
} = require('../controllers/admin')
const { userAuth } = require('../middlewares/auth-middleware')

const router = Router()

//playlist routes
router.get('/admin/playlists', userAuth, getPlaylists)
router.post('/admin/create-playlist', userAuth, createPlaylist)
router.delete('/admin/delete-playlist/:id', userAuth, deletePlaylist)
router.get('/admin/get-playlist/:id', userAuth, getPlaylist)
router.put('/admin/update-playlist/:id', userAuth, updatePlaylist)

//video routes
router.get('/admin/videos', userAuth, getAllvideos)
router.post('/admin/create-video', userAuth, createVideo)
router.delete('/admin/delete-video/:id', userAuth, deleteVideo)
router.get('/admin/get-video/:id', userAuth, getVideo)
router.put('/admin/update-video/:id', userAuth, updateVideo)

//non admin routes
router.get('/playlists', getPlaylists)
router.get('/videos', getAllvideos)
router.get('/get-playlist/:id', getPlaylistWithVideos)

module.exports = router
