const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    username: {
        type: String,
        minlength: [3, 'Too short username, 3-10 charcaters'],
        maxlength: [10, 'Too long username, 3-10 characters'],
        unique: [true, 'Username has to be unique'],
        required: [true, 'Please give an unique username'],
        
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  

const User = mongoose.model('User', userSchema)

module.exports = User