const Registration_Mail = (name)=>{
    return {
        Body : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <tr>
            <td style="text-align: center;">
                <h1 style="color: #178fff;">Welcome to NoteFlect!</h1>
            </td>
        </tr>
        <tr>
            <td>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Welcome to <strong>NoteFlect</strong>! 🎉 We're thrilled to have you on board.</p>
                <p>To get started, simply log in and explore all the features we've built to help you [describe the app's main purpose or benefit].</p>
                <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:Support@NoteFlect.com" style="color: #178fff; text-decoration: none;">Support@NoteFlect.com</a>.</p>
                <p>Thank you for joining us!</p>
                <p>Best regards,<br>
                <strong>The NoteFlect Team</strong></p>
            </td>
        </tr>
    </table>
</body>
</html>`,
Subject:'Welcome to NoteFlect!',
FromEmail:'Support@NoteFlect.com'
 }
}


module.exports= {Registration_Mail }