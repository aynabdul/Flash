import { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your EmailJS template ID
const USER_ID = 'YOUR_EMAILJS_USER_ID'; // Replace with your EmailJS user ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const emailParams = {
      to_email: 'flashpakistan@gmail.com', 
      from_name: name,
      from_email: email,
      phone: phone,
      message: message,
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}