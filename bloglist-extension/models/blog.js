const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  author: { type: String },
  url: {
    type: String,
    required: true,
  },
  likes: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
