const Playlist = require('../models/Playlist')
const Video = require('../models/Video')

exports.createPlaylist = async (req, res) => {
  const { title, description } = req.body

  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      })
    }

    await Playlist.create({
      title,
      description,
    })

    return res.status(201).json({
      success: true,
      message: 'Playlist created succefully.',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      playlists,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.deletePlaylist = async (req, res) => {
  const id = req.params.id

  try {
    const playlist = await Playlist.findByIdAndDelete(id)

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found, could not delete.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Playlist deleted succefully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.getPlaylist = async (req, res) => {
  const id = req.params.id
  try {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found.',
      })
    }

    return res.status(200).json({
      success: true,
      playlist,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.updatePlaylist = async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found.',
      })
    }

    return res.status(200).json({
      success: true,
      playlist,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.createVideo = async (req, res) => {
  const { title, url, playlistId } = req.body
  try {
    if (!url || !playlistId || !title) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      })
    }
    await Video.create({
      title,
      url,
      relatedPlaylist: playlistId,
    })

    return res.status(201).json({
      success: true,
      message: 'Video created succefully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.getAllvideos = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6
    const page = req.query.page ? parseInt(req.query.page) : 1

    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const count = await Video.find().countDocuments().exec()

    return res.status(200).json({
      success: true,
      videos,
      count: count,
      pages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.deleteVideo = async (req, res) => {
  const id = req.params.id

  try {
    const video = await Video.findByIdAndDelete(id)

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found, could not delete.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Video deleted succefully',
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.getVideo = async (req, res) => {
  const id = req.params.id

  try {
    const video = await Video.findById(id)

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      })
    }

    return res.status(200).json({
      success: true,
      video,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.updateVideo = async (req, res) => {
  const id = req.params.id
  const { title, url, playlistId } = req.body
  try {
    if (!url || !playlistId || !title) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      })
    }

    const video = await Video.findByIdAndUpdate(
      id,
      { title, url, relatedPlaylist: playlistId },
      { new: true }
    )

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found.',
      })
    }

    return res.status(200).json({
      success: true,
      video,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}

exports.getPlaylistWithVideos = async (req, res) => {
  const id = req.params.id
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.limit ? parseInt(req.query.limit) : 6

  try {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found.',
      })
    }

    const relatedVideos = await Video.find({ relatedPlaylist: id })
      .sort({
        createdAt: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const count = await Video.find({ relatedPlaylist: id })
      .countDocuments()
      .exec()

    return res.status(200).json({
      success: true,
      playlist,
      relatedVideos,
      count: count,
      pages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    })
  }
}
