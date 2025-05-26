const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    // required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Blocked'],
    default: 'Pending'
  },
  dueDate: {
    type: Date
  },
  tags: {
    type: [String]
  },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  attachments: [
    {
      fileName: String,
      fileUrl: String
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  createdAt: { 
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// taskSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });
module.exports = mongoose.model('Task', taskSchema);
