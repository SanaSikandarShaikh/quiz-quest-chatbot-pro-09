
const express = require('express');
const fs = require('fs').promises;
const { SESSIONS_FILE } = require('../utils/fileSystem');

const router = express.Router();

// Sessions endpoints
router.get('/sessions', async (req, res) => {
  try {
    const data = await fs.readFile(SESSIONS_FILE, 'utf8');
    const sessions = JSON.parse(data);
    console.log('📋 GET Sessions - Count:', sessions.length);
    res.json(sessions);
  } catch (error) {
    console.error('Error reading sessions:', error);
    res.status(500).json({ error: 'Failed to load sessions' });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const sessions = req.body;
    await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
    console.log('💾 SAVE Sessions - Count:', sessions.length);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving sessions:', error);
    res.status(500).json({ error: 'Failed to save sessions' });
  }
});

module.exports = router;
