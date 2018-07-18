using System.ComponentModel.DataAnnotations;

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

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class ChangePasswordModel
    {
        public string UserNameChange { get; set; }
        public string OldPass { get; set; }
        public string NewPass { get; set; }
        public string RepeatNewPass { get; set; }

        public bool GetUserByUserNameAndPassword(string userName, string password)
        {
           
            return true;
        }

        public int ChangePassword()
        {
                    
            return  1;
        }
        
    }
}