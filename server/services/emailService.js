const nodemailer = require("nodemailer");
const { emailConfig } = require("../config/config");

async function sendWelcomeEmail(email, firstName, password) {
  try {
    const transporter = nodemailer.createTransport({
      // Configure the email service here (e.g. Gmail, Mailgun, etc.)
      // Example configuration for Gmail:
      service: "gmail",
      auth: {
        user: "mahmoudmansouri2001@gmail.com",
        pass: "vpkdobrootesfiid",
      },
    });

    const mailOptions = {
      from: "mahmoudmansouri2001@gmail.com",
      to: email,
      subject: "Welcome to the Platform",
      text: `Hello ${firstName},\n\nYou have been added to the platform. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after your first login.\n\nBest regards,\nThe Platform Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("epmail sent");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
}

async function sendCourseEnrollmentConfirmation(studentEmail, courseDetails) {
  const subject = "Course Enrollment Confirmation";
  const text = `Dear student,

You have successfully enrolled in the course "${courseDetails.title}".

Course details:
- Date: ${courseDetails.date}
- Time: ${courseDetails.time}
- Duration: ${courseDetails.duration}
${
  courseDetails.isOnline
    ? `- Link: ${courseDetails.link}`
    : `- Location: ${courseDetails.location}`
}

Thank you for choosing our platform.

Best regards,
Learning Platform Team`;

  await sendEmail(studentEmail, subject, text);
}

module.exports = {
  sendEmail,
  sendCourseEnrollmentConfirmation,
  sendWelcomeEmail,
};
