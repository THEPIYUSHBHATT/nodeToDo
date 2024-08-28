import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { cookies } from '../utils/function.js'
import ErrorHandler from '../middleweares/error.js'


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler('Invalid Email or Password', 400))

   // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)
     
    if (!isMatch) return next(new ErrorHandler('Invalid Email or Password', 400))


    // If login is successful, set the cookie
    cookies(user, res, `welcome back ${user.name}`, 200)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    })
  }
}

export const newUsers = async (req, res) => {
 try {
   const { name, email, password } = req.body
   let user = await User.findOne({
     email,
   })

   if (user) return next(new ErrorHandler('User Already Exist', 400))

   const hashPassword = await bcrypt.hash(password, 10)

   user = await User.create({
     name,
     email,
     password: hashPassword,
   })

   cookies(user, res, 'registered successfully', 201)
 } catch (error) {
    next(error)
 }
}

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === 'Development' ? "lax ": 'none',
      secure: process.env.NODE_ENV === 'Development' ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    })
}
