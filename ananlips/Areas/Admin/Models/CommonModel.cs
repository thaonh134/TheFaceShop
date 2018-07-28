using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ananlips.Areas.Admin.Models
{
    public class CommonModel
    {
        public class ViewDataUploadFilesResult
        {
            public string name { get; set; }
            public int size { get; set; }
            public string type { get; set; }
            public string url { get; set; }
            public string delete_url { get; set; }
            public string thumbnail_url { get; set; }
            public string delete_type { get; set; }
        }
    }
}