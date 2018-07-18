using ananlips.Areas.Admin.Models.AutoGen;
using ananlips.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using ServiceStack.OrmLite;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using ServiceStack.DataAnnotations;
namespace ananlips.Areas.Admin.Models
{
    public class BillDetail: BillDetailBase<BillDetail>
    {
      	
		#region AutoGen
public int AddOrUpdate(int curruserid)
{
    IDbConnection dbConn = new OrmliteConnection().openConn();
    try
    {
        //var isexist = dbConn.FirstOrDefault <BillDetail>(this.entryid);
        var isexist = dbConn.GetByIdOrDefault <BillDetail> (this.entryid);
        if (isexist == null)
        {

            this.isactive = true;
            this.createdat = DateTime.Now;
            this.createdby = curruserid;
            this.updatedat = DateTime.Now;
            this.updatedby = curruserid;
            dbConn.Insert<BillDetail>(this);
            long lastInsertId = dbConn.GetLastInsertId();
            dbConn.Close();
            this.entryid = Convert.ToInt32(lastInsertId);
            return this.entryid;
        }
        else if (isexist != null)
        {
            this.isactive = isexist.isactive;
            this.createdat = isexist.createdat;
            this.createdby = isexist.createdby;
            this.updatedat = DateTime.Now;
            this.updatedby = curruserid;
            dbConn.Update<BillDetail>(this);
            dbConn.Close();
            return this.entryid;
        }
        else
            return 0;
    }
    catch (Exception ex)
    {
        return 0;
    }
}
#endregion
#region MyCode

#endregion
}
}