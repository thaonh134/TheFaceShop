using Kendo.Mvc;
using Kendo.Mvc.UI;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using ananlips.Service;

namespace ananlips.Areas.Admin.Models
{
    public class DDLModel
    {
        public string ID { get; set; }
        public string Name { get; set; }

        public DDLModel()
        {
            this.ID = "";
            this.Name = "";
        }
        public DDLModel(string id, string name)
        {
            this.ID = id;
            this.Name = name;
        }
    }
    public class ImgUploadModel
    {
        public int key { get; set; }
        public string value { get; set; }

        public ImgUploadModel()
        {
            this.key = 0;
            this.value = "";
        }
        public ImgUploadModel(int id, string name)
        {
            this.key = id;
            this.value = name;
        }
    }

    
}