const mongoose = require('mongoose')
const crypto = require('crypto')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  hasShop:{
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    default:'basic',
    emum:[
        'basic','manufacturer',
        'supervisor', 'admin',
        'finance', 'customer service',
        'business analyst', 'inventory manager',
        'logistics', 'retail' , 'delivery', 'marketing ', 'internships',
        'IT Technician' ,'Digital Operations'
    ]
},
accessToken:{
    type:String
},
meta:{
  last_login:{
    type: Date,
    default: Date.now
  },
  last_logout:{
    type: Date,
    default: Date.now
  },
  total_logins:{
    type:Number,
    default: 0
  },
  token_reset_password: {
    type: String,
    default: ""
  },
  timestamp_reset_password:{
    type:String,
    default: ""
  },
  token_auth_key: {
    type: String,
    default: ""
  }
}
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

module.exports= mongoose.model('User', UserSchema)
