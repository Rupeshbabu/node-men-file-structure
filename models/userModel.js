const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      minlength: ["5", "Username must minimum 5 characters"],
      maxlength: ["20", "Username must maximum 20 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, 'mobile no. is required'],
      unique: true,
      maxlength: [10, "Mobile number must contain 10 chaacters"],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    profileImage: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);



// Before save save user , it will call this function, password encrypt
// userSchema.pre('save', async function (next) {
//     // Only run this function if password actually modified
//     if (!this.isModified('password')) return next();
  
//     // Hash the password with cost of 12
//     this.password = await bcrypt.hash(this.password, 12);
  
//     // Delete passwordConfirm field
//     this.passwordConfirm = undefined;
//     next();
//   });

module.exports = mongoose.model("User", userSchema);
