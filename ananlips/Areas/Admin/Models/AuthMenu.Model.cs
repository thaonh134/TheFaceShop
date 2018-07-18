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
namespace ananlips.Areas.Admin.Models
{
    public class AuthMenu: AuthMenuBase<AuthMenu>
    {
      	
		#region AutoGen
public int AddOrUpdate(int curruserid)
{
    IDbConnection dbConn = new OrmliteConnection().openConn();
    try
    {
        var isexist = dbConn.GetByIdOrDefault<AuthMenu>(this.entryid);
        if (isexist == null)
        {

            this.isactive = true;
            this.createdat = DateTime.Now;
            this.createdby = curruserid;
            this.updatedat = DateTime.Now;
            this.updatedby = curruserid;
            dbConn.Insert<AuthMenu>(this);
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
            dbConn.Update<AuthMenu>(this);
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
        public List<AuthMenu> GetAllMenu(string lang)
        {
            IDbConnection dbConn = new OrmliteConnection().openConn();
            try
            {
                return dbConn.Select<AuthMenu>();
            }
            catch (Exception ex)
            {
                return new List<AuthMenu>();
            }

        }
        #endregion
    }
}