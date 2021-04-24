const { Schema, model } = require('mongoose')

const PlaylistSchema = new Schema(
  {
    title: String,
    description: String,
  },

  { timestamps: true }
)

const Playlist = model('Playlist', PlaylistSchema)
module.exports = Playlist
