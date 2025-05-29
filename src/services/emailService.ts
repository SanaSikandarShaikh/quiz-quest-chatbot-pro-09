
export interface EmailData {
  to_email: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

class EmailService {
  async sendRegistrationNotification(userDetails: {
    fullName: string;
    email: string;
    registrationDate: string;
    ipAddress?: string;
  }): Promise<boolean> {
    try {
      // Prepare email data for mysteriousmee@gmail.com
      const emailData = {
        to_email: 'mysteriousmee@gmail.com', // Your Gmail address
        from_name: userDetails.fullName,
        from_email: userDetails.email,
        subject: `🔔 New Registration: ${userDetails.fullName}`,
        message: `
🔔 NEW USER REGISTRATION - HP VICTUS LAPTOP

User Details:
📝 Name: ${userDetails.fullName}
📧 Email: ${userDetails.email}
📅 Registration Date: ${new Date(userDetails.registrationDate).toLocaleString()}
🌐 IP Address: ${userDetails.ipAddress || 'Localhost'}
💻 Device: HP Victus Laptop
🖥️ Environment: Local Development (VSCode)

This user has successfully registered on your local development platform.

---
Sent from your local registration system
        `
      };

      console.log('📧 Sending registration notification email to mysteriousmee@gmail.com:', {
        user: emailData.from_email,
        name: emailData.from_name,
        timestamp: new Date().toISOString()
      });

      // Send the email notification to the backend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('✅ Registration email sent successfully to mysteriousmee@gmail.com');
        return true;
      } else {
        console.error('❌ Failed to send registration email:', response.statusText);
        // Even if email fails, don't block registration
        return true;
      }
    } catch (error) {
      console.error('❌ Error sending registration email:', error);
      // Don't block registration if email fails
      return true;
    }
  }
}

export const emailService = new EmailService();
