import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationEmail = async (to, token) => {
  const msg = {
    to: to,
    from: "noreply@yourdomain.com", // Your email domain
    subject: "Email Confirmation",
    text: `Hello,\n\nPlease confirm your email by clicking the link: https://${process.env.FRONTEND_URL}/confirm-email/${token}`,
    html: `
      <p>Hello,</p>
      <p>Please confirm your email by clicking the link:</p>
      <a href="https://${process.env.FRONTEND_URL}/confirm-email/${token}">https://${process.env.FRONTEND_URL}/confirm-email/${token}</a>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
