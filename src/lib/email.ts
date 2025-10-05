import nodemailer from 'nodemailer';

// Create a test account for development
const createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// For production, use real SMTP credentials
const createProductionTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Initialize transporter function
export const getTransporter = async () => {
  if (process.env.NODE_ENV === 'production') {
    return createProductionTransporter();
  } else {
    return await createTestAccount();
  }
};

export const sendVerificationEmail = async (email: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?email=${encodeURIComponent(email)}`;
  const transporter = await getTransporter();
  
  const mailOptions = {
    from: `"Buildora" <${process.env.SMTP_USER || 'noreply@buildora.com'}>`,
    to: email,
    subject: 'Vérifiez votre adresse email - Buildora',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification Email - Buildora</title>
        <style>
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 40px 20px; }
          .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px; }
          .description { color: #6b7280; margin-bottom: 32px; line-height: 1.6; }
          .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 16px 0; }
          .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          .logo { font-size: 32px; font-weight: bold; color: white; margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">B</div>
            <h1>Buildora</h1>
          </div>
          <div class="content">
            <h2 class="title">Vérifiez votre adresse email</h2>
            <p class="description">
              Merci de vous être inscrit sur Buildora ! Pour commencer à créer vos landing pages, 
              veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous.
            </p>
            <a href="${verificationUrl}" class="button">Vérifier mon email</a>
            <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
              Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
              <a href="${verificationUrl}" style="color: #8b5cf6;">${verificationUrl}</a>
            </p>
          </div>
          <div class="footer">
            <p>Cet email a été envoyé automatiquement. Ne répondez pas à cet email.</p>
            <p>© 2024 Buildora. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
};

 