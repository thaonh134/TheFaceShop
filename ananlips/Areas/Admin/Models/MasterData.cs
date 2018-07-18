using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ananlips.Areas.Admin.Models
{
    public static class MasterData
    {
        public static string GetcurrentTimeSystem(){
            var js = new System.Web.Script.Serialization.JavaScriptSerializer();
            return js.Serialize(DateTime.Now);
        }

    }
    public static class ActiveStatus
    {
        public const bool Active = true;
        public const bool InActive = false;
        public static List<DDLModel> GetActiveStatus()
        {

            return new List<DDLModel>() { new DDLModel() { ID="true",Name= "Active" }, new DDLModel() { ID = "false", Name = "InActive" } };
        }
    }
}