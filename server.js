
const express = require('express');
const { setupMiddleware } = require('./middleware');
const { ensureDataDir, initializeDataFiles } = require('./utils/fileSystem');

// Import route modules
const emailRoutes = require('./routes/email');
const geminiRoutes = require('./routes/gemini');
const chatHistoryRoutes = require('./routes/chatHistory');
const sessionsRoutes = require('./routes/sessions');

const app = express();
const PORT = 8000;

// Setup middleware
setupMiddleware(app);

// Setup routes
app.use('/api', emailRoutes);
app.use('/api', geminiRoutes);
app.use('/api', chatHistoryRoutes);
app.use('/api', sessionsRoutes);

// Start server
async function startServer() {
  await ensureDataDir();
  await initializeDataFiles();
  
  app.listen(PORT, () => {
    console.log(`🚀 Local Backend Server running on http://localhost:${PORT}`);
    console.log('📁 Data stored in: ./local_data');
    console.log('📧 Email notifications configured for: mysteriousmee@gmail.com');
    console.log('🔍 All login/registration notifications will be sent to your email');
    console.log('💻 Ready for HP Victus laptop development\n');
  });
}

startServer();
