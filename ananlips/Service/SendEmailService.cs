
using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Net.Http;
using System.Collections.Generic;

namespace ananlips.Service
{
    public class SendEmailService
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task SendEmail(List<string> recipientEmails, string subjectstr, string content)
        {
            var from = ConfigurationManager.AppSettings.Get("SenderEmail");
            var key = ConfigurationManager.AppSettings.Get("SendGridApiKey");
            if (recipientEmails == null || recipientEmails.Count == 0) return;
            var emailto = new List<object>();
            foreach (var item in recipientEmails)
            {
                emailto.Add(new { email = item });
            }

            // var value = message;
            var personalizations = new
            {
                //client token
                //to = "fyltupYq9D0:APA91bESMFfqRxgtsI9Xehbc9maRC3FZ0HL2xWdehj9s1mCWkCxftoG4RxdoDsGSabuA3fHyTxSe7DqlGxzTJe-OUkZdD0bAJq_xpEe8dclWHcRjNZEr9WsQfiXmqdrDp7fn-oDLaeWUZ9XjxM4zAFVDk7viGVqqaw",
                //to =new[] { new { email = recipientEmail }, new { email = recipientEmail } },
                personalizations=new[] { new { to = emailto.ToArray() } } ,
                from = new { email = from },
                subject = subjectstr,
                content = new[]
                {
                    new{
                        type = "text/html",
                        value = content,
                    }

                },
            };
            string datapost = Newtonsoft.Json.JsonConvert.SerializeObject(personalizations);

            var http = new HttpClient();
            http.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", "Bearer " + key);
            http.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
            //http.DefaultRequestHeaders.TryAddWithoutValidation("Sender", "id=" + ConfigurationManager.AppSettings.Get("Fcm_SenderId"));
            http.DefaultRequestHeaders.TryAddWithoutValidation("content-length", datapost.Length.ToString());
            var contentstring = new StringContent(datapost, System.Text.Encoding.UTF8, "application/json");
            var response =await http.PostAsync("https://api.sendgrid.com/v3/mail/send", contentstring);



            //            var values = new Dictionary<string, string>
            //{
            //   { "thing1", "hello" },
            //   { "thing2", "world" }
            //};

            //            var content = new FormUrlEncodedContent(values);

            //            var response = await client.PostAsync("http://www.example.com/recepticle.aspx", content);

            //            //var responseString = await response.Content.ReadAsStringAsync();
            //            //var client = new SendGridClient(ConfigurationManager.AppSettings.Get("SendGridApiKey"));
            //            //    var from = new EmailAddress(ConfigurationManager.AppSettings.Get("SenderEmail"), ConfigurationManager.AppSettings.Get("SenderName"));
            //            //    var to = new EmailAddress(recipientEmail, recipientEmail);
            //            //    var msg = MailHelper.CreateSingleEmail(from, to, subject, content, content);
            //            //    client.SendEmailAsync(msg);
            //            //}
        }
    }

    public class SmsPostModel
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public int Type { get; set; }
        public string TypeName { get; set; }
        public string Topic { get; set; }
    }
}