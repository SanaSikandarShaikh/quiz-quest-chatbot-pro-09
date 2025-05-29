
const fs = require('fs').promises;
const path = require('path');

// Local storage paths
const DATA_DIR = path.join(__dirname, '..', 'local_data');
const CHAT_HISTORY_FILE = path.join(DATA_DIR, 'chat_history.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Initialize data files
async function initializeDataFiles() {
  try {
    await fs.access(CHAT_HISTORY_FILE);
  } catch {
    await fs.writeFile(CHAT_HISTORY_FILE, JSON.stringify([]));
  }
  
  try {
    await fs.access(SESSIONS_FILE);
  } catch {
    await fs.writeFile(SESSIONS_FILE, JSON.stringify([]));
  }
}

module.exports = {
  DATA_DIR,
  CHAT_HISTORY_FILE,
  SESSIONS_FILE,
  ensureDataDir,
  initializeDataFiles
};
