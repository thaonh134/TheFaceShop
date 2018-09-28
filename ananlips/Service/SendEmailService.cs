using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
namespace ananlips.Service
{
    public class SendEmailService
    {
        public void SendEmail(string recipientEmail, string subject, string content)
        {
            //var client = new SendGridClient(ConfigurationManager.AppSettings.Get("SendGridApiKey"));
            //var from = new EmailAddress(ConfigurationManager.AppSettings.Get("SenderEmail"), ConfigurationManager.AppSettings.Get("SenderName"));
            //var to = new EmailAddress(recipientEmail, recipientEmail);
            //var msg = MailHelper.CreateSingleEmail(from, to, subject, content, content);
            //client.SendEmailAsync(msg);



            //var client = new SendGridClient(apiKey);
            //var from = new EmailAddress("test@example.com", "Example User");
            //var subject = "Sending with SendGrid is Fun";
            //var to = new EmailAddress("test@example.com", "Example User");
            //var plainTextContent = "and easy to do anywhere, even with C#";
            //var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            //var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            //var response = await client.SendEmailAsync(msg);
        }
    }
}