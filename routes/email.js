
const express = require('express');
const { createEmailTransporter } = require('../config/email');

const router = express.Router();

// Registration email sending endpoint
router.post('/send-email', async (req, res) => {
  const { to_email, from_name, from_email, subject, message } = req.body;
  
  console.log('\n📧 REGISTRATION EMAIL NOTIFICATION REQUEST');
  console.log('==================');
  console.log('Timestamp:', new Date().toISOString());
  console.log('User:', from_email);
  console.log('Name:', from_name);
  console.log('Sending to: mysteriousmee@gmail.com');
  console.log('==================\n');

  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: 'mysteriousmee@gmail.com',
      to: 'mysteriousmee@gmail.com', // Send to your email
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🔔 New User Registration
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">User Details:</h3>
            <p><strong>📝 Name:</strong> ${from_name}</p>
            <p><strong>📧 Email:</strong> ${from_email}</p>
            <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This user has successfully registered on your platform.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Sent from your registration system
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('✅ REGISTRATION EMAIL SENT SUCCESSFULLY to mysteriousmee@gmail.com');
    console.log('Registration notification sent for user:', from_email);
    console.log('==================\n');
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ REGISTRATION EMAIL SENDING ERROR:', error.message);
    console.log('⚠️ Continuing without email notification');
    res.json({ success: true, message: 'Registration completed (email notification failed)' });
  }
});

// Login email sending endpoint
router.post('/send-login-email', async (req, res) => {
  const { to_email, from_name, from_email, subject, message } = req.body;
  
  console.log('\n🔐 LOGIN EMAIL NOTIFICATION REQUEST');
  console.log('==================');
  console.log('Timestamp:', new Date().toISOString());
  console.log('User Email:', from_email);
  console.log('User Name:', from_name);
  console.log('Sending to: mysteriousmee@gmail.com');
  console.log('==================\n');

  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: 'mysteriousmee@gmail.com',
      to: 'mysteriousmee@gmail.com', // Send to your email
      subject: `🔐 User Login: ${from_name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            🔐 User Login Notification
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Login Details:</h3>
            <p><strong>📝 Name:</strong> ${from_name}</p>
            <p><strong>📧 Email:</strong> ${from_email}</p>
            <p><strong>🕐 Login Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>🌐 Login Location:</strong> HP Victus Laptop - Localhost</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This user has successfully logged into your platform from localhost.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Sent from your local development server
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('✅ LOGIN EMAIL SENT SUCCESSFULLY to mysteriousmee@gmail.com');
    console.log('Login notification sent for user:', from_email);
    console.log('==================\n');
    
    res.json({ success: true, message: 'Login email sent successfully' });
  } catch (error) {
    console.error('❌ LOGIN EMAIL SENDING ERROR:', error.message);
    console.log('⚠️ Login will continue without email notification');
    res.json({ success: true, message: 'Login successful (email notification failed)' });
  }
});

module.exports = router;
