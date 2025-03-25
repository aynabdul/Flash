import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter outside the handler to reuse it
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { name, phone, email, message, recipient } = await request.json();

    // Validate the required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient || 'flashpakistan@gmail.com',
      subject: `Inquiry from FLASH Website - ${name}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: err.message
      },
      { status: 500 }
    );
  }
} 