
const express = require('express');
const fs = require('fs').promises;
const { CHAT_HISTORY_FILE } = require('../utils/fileSystem');

const router = express.Router();

// Chat history endpoints
router.get('/chat-history', async (req, res) => {
  try {
    const data = await fs.readFile(CHAT_HISTORY_FILE, 'utf8');
    const chatHistories = JSON.parse(data);
    console.log('📖 GET Chat Histories - Count:', chatHistories.length);
    res.json(chatHistories);
  } catch (error) {
    console.error('Error reading chat history:', error);
    res.status(500).json({ error: 'Failed to load chat history' });
  }
});

router.post('/chat-history', async (req, res) => {
  try {
    const newChatHistory = req.body;
    const data = await fs.readFile(CHAT_HISTORY_FILE, 'utf8');
    const chatHistories = JSON.parse(data);
    
    const existingIndex = chatHistories.findIndex(h => h.id === newChatHistory.id);
    
    if (existingIndex >= 0) {
      chatHistories[existingIndex] = newChatHistory;
      console.log('📝 UPDATE Chat History - ID:', newChatHistory.id);
    } else {
      chatHistories.push(newChatHistory);
      console.log('✨ NEW Chat History - ID:', newChatHistory.id);
    }
    
    await fs.writeFile(CHAT_HISTORY_FILE, JSON.stringify(chatHistories, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Failed to save chat history' });
  }
});

router.delete('/chat-history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(CHAT_HISTORY_FILE, 'utf8');
    const chatHistories = JSON.parse(data);
    const filtered = chatHistories.filter(h => h.id !== id);
    
    await fs.writeFile(CHAT_HISTORY_FILE, JSON.stringify(filtered, null, 2));
    console.log('🗑️ DELETE Chat History - ID:', id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting chat history:', error);
    res.status(500).json({ error: 'Failed to delete chat history' });
  }
});

module.exports = router;
