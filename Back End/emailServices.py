# Reference: https://docs.python.org/3/library/email.examples.html    https://docs.python.org/3/library/smtplib.html  https://pypi.org/project/python-dotenv   
#“The email functionality is implemented using Python’s built-in smtplib and email.mime libraries, following the official Python documentation

# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.message import EmailMessage

# Open the plain text file whose name is in textfile for reading.
with open(textfile) as fp:
    # Create a text/plain message
    msg = EmailMessage()
    msg.set_content(fp.read())

# me == the sender's email address
# you == the recipient's email address
msg['Subject'] = f'The contents of {textfile}'
msg['From'] = me
msg['To'] = you

# Send the message via our own SMTP server.
s = smtplib.SMTP('localhost')
s.send_message(msg)
s.quit()
