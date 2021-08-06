const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true
    },
    photoProfil: {
      type: String,
      default: "./image.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    adminName: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
      trim: true
    },
    job: {
      type: String,
      required: true,
      trim: true
    },
    benificaryRef: {
      type: [String]
    },
    Notifications: [
      {
        benificaryRef: {type: Number},
        message: {type: String}
    }],
    Messages: [
      {
        from: {type: String},
        message: {type: String}
    }],
    

  },
  {
    timestamps: true,
  }
)

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;



