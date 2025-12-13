# Reference: https://docs.python.org/3/library/email.examples.html    https://docs.python.org/3/library/smtplib.html  https://pypi.org/project/python-dotenv   
#“The email functionality is implemented using Python’s built-in smtplib and email.mime libraries, following the official Python documentation

# Import smtplib for the actual sending function

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_claimed_email(to_email, student_name, item_name, teacher_name="Admin", office_address="Room 101, Main Building"):
    """
    Send a professional HTML email to user when their item is claimed.
    """

    # Current date & time
    claimed_time = datetime.now().strftime("%d %b %Y, %I:%M %p")

    # Create message container
    msg = MIMEMultipart("alternative")
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = f"Your item '{item_name}' has been claimed!"

    # Plain text fallback
    text = f"""
Hello {student_name},

Your item '{item_name}' has been marked as CLAIMED in our Lost & Found system.

Item: {item_name}
Status: CLAIMED
Claimed by: {teacher_name}
Claimed on: {claimed_time}
Office: {office_address}

Thank you for using our service!

Regards,
Lost & Found Team
"""

    # HTML email body
    html = f"""
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #1a73e8;">Lost & Found Notification</h2>
      <p>Hello <strong>{student_name}</strong>,</p>
      <p style="font-size: 1.1em;">
        Your item <strong>{item_name}</strong> has been <span style="color: #28a745; font-weight: bold;">CLAIMED</span> in our Lost & Found system.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Item</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">{item_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd; color: #28a745; font-weight: bold;">CLAIMED</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Claimed by</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">{teacher_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Claimed on</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">{claimed_time}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Office</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">{office_address}</td>
        </tr>
      </table>

      <p style="margin-top: 15px;">Thank you for using our service!</p>
      <p style="color: #555;">Regards,<br>Lost & Found Team</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 0.8em; color: #999;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  </body>
</html>
"""

    # Attach parts
    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    try:
        # Connect to Gmail SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Secure the connection
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Email sent to {to_email}")
        return True
    except Exception as e:
        print("Error sending email:", e)
        return False

