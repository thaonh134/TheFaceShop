using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace ananlips.ConstantValue
{
    public class Common
    {

    }
    public enum LoginType
    {
        InternalLogin = 0,
        Admin = 1,
        ExternalLogin = 2
    }
    public enum ArticleType
    {
        About = 0,
        PricingPolicy = 1,
        ShoppingGuide = 2,
        Contact = 3,
        Recruitment = 4,
        Distribution = 5,
        News = 6,

    }
    public enum TopicContact
    {
        [Description("Tư vấn")] tuvan = 1,
        [Description("Khiếu nại - Phản ánh")] khieunai = 2,
        [Description("Hợp tác với Vieko")] hoptac = 3,
        [Description("Góp ý cải tiến")] gopy = 4,

    }

    public static class EmailKeyword
    {
        public const string USERNAME = "#USERNAME#";
        public const string PASS_WORD = "#PASS_WORD#";
        public const string FIRST_NAME = "#FIRST_NAME#";
        public const string LAST_NAME = "#LAST_NAME#";
        public const string FULL_NAME = "#FULL_NAME#";
        public const string EMAIL_ADDRESS = "#EMAIL_ADDRESS#";
        public const string PHONE_NUMBER = "#PHONE_NUMBER#";
        public const string CONTENT_STR = "#CONTENT_STR#";
        public const string DATE_SEND = "#DATE_SEND#";
        public const string URL = "#URL#";


    }

}