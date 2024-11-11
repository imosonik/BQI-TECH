import nodemailer from 'nodemailer';

interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({ to, subject, body }: EmailParams): Promise<void> {
  if (typeof window !== 'undefined') {
    console.log('Email sending is not available on the client-side');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: {
      name: 'BQI Tech Careers',
      address: process.env.FROM_EMAIL || ''
    },
    to,
    subject,
    html: body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
