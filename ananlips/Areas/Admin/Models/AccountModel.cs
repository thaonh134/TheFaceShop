using ananlips.ConstantValue;
using ananlips.Service;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;

namespace ananlips.Areas.Admin.Models
{
    public class LogOnModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string CaptchaCode { get; set; }
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class ChangePasswordModel
    {
        public string UserNameChange { get; set; }
        public string OldPass { get; set; }
        public string NewPass { get; set; }
        public string RepeatNewPass { get; set; }

        

        public int ChangePassword()
        {

            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("@UserName", this.UserNameChange));
            param.Add(new SqlParameter("@Password", this.RepeatNewPass));
            return new SqlHelper().ExecuteNoneQuery("p_Auth_User_ChangePass", param);
        }
        
    }
}