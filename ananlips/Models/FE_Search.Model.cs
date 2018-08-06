using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ananlips.Models
{
	public class SearchRequest
	{
        public SearchRequest()
        {
            pagenum = 1;
            pagesize = 18;
            orderby = "";
            sorttype = "";
        }
        public int pagenum { get; set; }
        public int pagesize { get; set; }
        public string orderby { get; set; }
        public string sorttype { get; set; }
    }
    public class SearchResult
    {
        public dynamic dataresult { get; set; }
        public int total { get; set; }
        public int pagenum { get; set; }

    }
}