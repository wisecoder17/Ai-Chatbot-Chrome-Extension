const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  metadata: {
    tokenCount: { type: Number },
    messageType: { type: String, enum: ['text', 'image', 'link'] },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('message', messageSchema);
