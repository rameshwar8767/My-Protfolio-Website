import Project from '../models/project.model.js';

/**
 * @desc    Create a new project (admin only)
 * @route   POST /api/projects
 */
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      github,
      liveDemo,
      imageUrl,
      isFeatured,
    } = req.body;

    const newProject = new Project({
      title,
      description,
      techStack,
      github,
      liveDemo,
      imageUrl,
      isFeatured,
    });

    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error('Create Project Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
};

/**
 * @desc    Get all projects (public)
 * @route   GET /api/projects
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error('Get Projects Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

/**
 * @desc    Get a single project by ID (public)
 * @route   GET /api/projects/:id
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Get Project By ID Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get project' });
  }
};

/**
 * @desc    Update a project (admin only)
 * @route   PUT /api/projects/:id
 */
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Update Project Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
};

/**
 * @desc    Delete a project (admin only)
 * @route   DELETE /api/projects/:id
 */
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
};
