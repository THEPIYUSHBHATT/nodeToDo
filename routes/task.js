import express from 'express'
import {
  newTask,
  getMyTask,
  updateTask,
  deleteTask,
} from '../controllers/task.js'
import { isAuthenticated } from '../middleweares/auth.js'

const router = express.Router()

router.post('/new', isAuthenticated, newTask)
router.get('/all', isAuthenticated, getMyTask)
router
  .route('/:id')
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask)

export default router
