const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, unique: true, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: null },
  status: { type: String, enum: ['active', 'expired', 'archived'], default: 'active' },
  conversationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }],
});

module.exports = mongoose.model('session', sessionSchema);
