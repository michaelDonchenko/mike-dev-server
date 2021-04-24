const { Schema, model, Types } = require('mongoose')
const { ObjectId } = Types

const VideoSchema = new Schema(
  {
    title: String,
    url: String,
    relatedPlaylist: {
      type: ObjectId,
      ref: 'Playlist',
    },
  },

  { timestamps: true }
)

const Video = model('Video', VideoSchema)
module.exports = Video
