import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology must be listed',
      },
    },
    github: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^https:\/\/(www\.)?github\.com\/.+/.test(url),
        message: 'Enter a valid GitHub URL',
      },
    },
    liveDemo: {
      type: String,
      validate: {
        validator: (url) =>
          url === '' || /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/.test(url),
        message: 'Enter a valid live demo URL',
      },
    },
    imageUrl: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
