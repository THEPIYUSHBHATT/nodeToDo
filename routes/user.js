import express from 'express'
import { User } from '../models/userModel.js'
import {
 
  getMyProfile,
  login,
  logout,
  newUsers,
} from '../controllers/user.js'
import { isAuthenticated } from '../middleweares/auth.js'


const router = express.Router()



router.post('/new', newUsers)
router.post('/login', login)
router.get('/logout', logout)

router.get('/me',isAuthenticated, getMyProfile)

export default router
