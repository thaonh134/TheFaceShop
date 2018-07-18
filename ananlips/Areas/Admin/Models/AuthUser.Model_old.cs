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
    public class AuthUser: AuthUserBase<AuthUser>
    {
		#region AutoGen
public int AddOrUpdate(int curruserid)
{
    IDbConnection dbConn = new OrmliteConnection().openConn();
    try
    {
        var isexist = dbConn.GetByIdOrDefault<AuthUser>(this.entryid);
        if (isexist == null)
        {

            this.isactive = true;
            this.createdat = DateTime.Now;
            this.createdby = curruserid;
            this.updatedat = DateTime.Now;
            this.updatedby = curruserid;
            dbConn.Insert<AuthUser>(this);
            long lastInsertId = dbConn.GetLastInsertId();
            dbConn.Close();
            this.entryid = Convert.ToInt32(lastInsertId);
            return this.entryid;
        }
        else if (isexist != null)
        {
            this.createdat = isexist.createdat;
            this.createdby = isexist.createdby;
            this.updatedat = DateTime.Now;
            this.updatedby = curruserid;
            dbConn.Update<AuthUser>(this);
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
        public static AuthUser GetByCode(string entrycode, string typelogin)
        {
            IDbConnection dbConn = new OrmliteConnection().openConn();
            try
            {
                var data = dbConn.FirstOrDefault<AuthUser>("entrycode={0} and loginprovider = {1}", entrycode, typelogin);
                return data;
            }
            catch (Exception e)
            {
                return null;
            }
            finally { dbConn.Close(); }
        }
#endregion
    }
}