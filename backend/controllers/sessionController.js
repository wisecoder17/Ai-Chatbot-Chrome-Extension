///////
const Session = require('../models/session');
const Conversation = require('../models/conversation');

exports.createSession = async (req, res) => {
  const { userId } = req.body;
  const sessionId = `session-${Date.now()}`;

  try {
    const session = new Session({
      userId,
      sessionId,
      startTime: new Date(),
      status: 'active',
      conversationIds: [],
    });

    await session.save();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.endSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await Session.findOneAndUpdate(
      { sessionId },
      { status: 'expired', endTime: new Date() },
      { new: true }
    );
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
