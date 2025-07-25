import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProjects);               // public
router.get('/:id', getProjectById);            // public
router.post('/', protect, createProject);      // protected
router.put('/:id', protect, updateProject);    // protected
router.delete('/:id', protect, deleteProject); // protected

export default router;
