# Sending emails to all participants with their login details
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders


def getDetails():
    import json
    with open('login_details.json', 'r') as f:
        return json.load(f)
    
def send_emails():
    login_details = getDetails()
    print(login_details['apoorva.221ec207@nitk.edu.in'])
    # for email, details in login_details.items():
    #     path_to_image = '../eureka.png'
    #     body = f"""
    #     <!DOCTYPE html>
    #     <html>
    #     <head>
    #     <style>
    #     body {{
    #     font-family: Arial, sans-serif;
    #     }}

    #     h2 {{
    #     color: #446cb3;
    #     }}

    #     table {{
    #     font-family: arial, sans-serif;
    #     border-collapse: collapse;
    #     width: 100%;
    #     }}

    #     td, th {{
    #     border: 1px solid #dddddd;
    #     text-align: left;
    #     padding: 8px;
    #     }}

    #     tr:nth-child(even) {{
    #     background-color: #dddddd;
    #     }}
    #     </style>
    #     </head>
    #     <body>

    #     <h2>CTF Login Details</h2>

    #     <!-- <img src="cid:image1" width="100%" height="100%"> -->

    #     <table>
    #     <tr>
    #         <th>Username</th>
    #         <th>Password</th>
    #     </tr>
    #     <tr>
    #         <td>{details['username']}</td>
    #         <td>{details['password']}</td>
    #     </tr>
    #     </table>

    #     <p style="color: #446cb3;">Thank you for participating in the IEEE EUREKA CTF! If you have any questions, feel free to reply to this email.</p>

    #     </body>
    #     </html>

    #     """


send_emails()