# Sending emails to all participants with their login details
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import html

# PUT YOUR EMAIL HERE
from_email = 'corpusieeenitk@gmail.com'

# THIS IS NOT YOUR GMAIL PASSWORD, THIS IS AN APP PASSWORD (LOOK IT UP and ENABLE IT)
password = 'mvis oqrf tazc xrxj '

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(from_email, password)



def send_email(recipient, subject, body):

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'html'))

    # ADDING IMAGE                                                              ---- NOT WORKING
    # img = open('eureka.png', 'rb')
    # p = MIMEBase('application', 'octet-stream')
    # p.set_payload((img).read())
    # encoders.encode_base64(p)
    # p.add_header('Content-Disposition', "<image1>")
    # msg.attach(p)

    text = msg.as_string()
    server.sendmail(from_email, recipient, text)
    print(f"Email sent to {recipient}")

def getDetails():
    import json
    with open('login_details.json', 'r') as f:
        return json.load(f)
    
def send_emails():
    login_details = getDetails()
    for email, details in login_details.items():
        path_to_image = '../eureka.png'
        body = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        body {{
        font-family: Arial, sans-serif;
        }}

        h2 {{
        color: #446cb3;
        }}

        table {{
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }}

        td, th {{
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }}

        tr:nth-child(even) {{
        background-color: #dddddd;
        }}
        </style>
        </head>
        <body>

        <h2>CTF Login Details</h2>

        <!-- <img src="cid:image1" width="100%" height="100%"> -->

        <table>
        <tr>
            <th>Username</th>
            <th>Password</th>
        </tr>
        <tr>
            <td>{html.escape(details['username'])}</td>
            <td>{html.escape(details['password'])}</td>
        </tr>
        </table>

        <p style="color: #446cb3;">Thank you for participating in the IEEE EUREKA CTF! If you have any questions, feel free to reply to this email.</p>

        </body>
        </html>

        """
        send_email(email, 'Revised IEEE EUREKA CTF Login Details', body)
    

send_emails()

server.quit()

