import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: Number,
    required: true,
  },
  answers: {
    type: Array,
    default: [],
  },
  score: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  approved: {
    type: Boolean
  },
  answerApproved: {
    type: Boolean,
    default: false
  },
  comment: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('posts', postSchema);