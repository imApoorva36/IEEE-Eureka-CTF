# SMTP MAILING HTML TEMPLATE

def sendEmailFromTemplate(to, subject, template, context):
    # Importing the required libraries
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from jinja2 import Environment, FileSystemLoader

    # Setting up the SMTP server
    smtp_server = "smtp.gmail.com"
    port = 465
    login = "vignarajpai@ieee.org"
    password="amdg yvqs cotq xxjw"
    
    # Setting up the MIME
    msg = MIMEMultipart('alternative')
    msg['From'] = login
    msg['To'] = to
    msg['Subject'] = subject
    
    # Setting up the Jinja2 environment
    file_loader = FileSystemLoader('templates')
    env = Environment(loader=file_loader)
    template = env.get_template(template)
    output = template.render(context)
    
    # Attaching the HTML content to the email
    msg.attach(MIMEText(output, 'html'))
    
    # Sending the email
    server = smtplib.SMTP_SSL(smtp_server, port)
    server.login(login, password)
    server.sendmail(login, to, msg.as_string())
    server.quit()
    
    print('Email sent to', to)
    
    return True

def getDetails():
    import json
    with open('login_details.json', 'r') as f:
        return json.load(f)
  
if __name__ == '__main__':
    # Testing the function
    login_details = getDetails()

    
    subject = 'CodeRed Login Credentials'
    template = 'loginCreds.html'
    
    for email in login_details:
        sendEmailFromTemplate(email, subject, template, 
                              {
                                  'username' : login_details[email]['username'],
                                  'password' : login_details[email]['password'],
                              })
        print('Email sent to', email)
    
  
  