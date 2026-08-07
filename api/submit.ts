import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { fullName, email, phone, businessName, category, attachmentBase64, attachmentName, attachmentType } = req.body;

  if (!fullName || !email || !phone || !attachmentBase64) {
    return res.status(400).json({ error: 'Missing required fields or screenshot' });
  }

  try {
    // IMPORTANT: In your Vercel Dashboard, go to Settings -> Environment Variables
    // Add EMAIL_USER (e.g. your-business@gmail.com)
    // Add EMAIL_PASS (The 16-character Gmail App Password you generated)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Assuming Gmail, change if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: 'sudheer@buildbharatsp.com',
      subject: `New Synergy Partner Registration: ${fullName}`,
      html: `
        <h2>New Partner Registration Details</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
        <p><strong>Category:</strong> ${category || 'N/A'}</p>
        <p>A payment screenshot has been attached to this email.</p>
      `,
      attachments: [
        {
          filename: attachmentName || 'payment-screenshot.png',
          content: attachmentBase64.split('base64,')[1], // Remove the data url prefix if present
          encoding: 'base64',
          contentType: attachmentType || 'image/png'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: (error as Error).message });
  }
}
