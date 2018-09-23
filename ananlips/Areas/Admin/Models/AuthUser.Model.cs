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
    public class AuthUser : AuthUserBase<AuthUser>
    {

        [Ignore]
        public string birthday_str { get; set; }
        [Ignore]
        public string lastlogin_str { get; set; }
        #region AutoGen
        public int AddOrUpdate(int curruserid)
        {
            IDbConnection dbConn = new OrmliteConnection().openConn();
            try
            {
                //var isexist = dbConn.GetByIdOrDefault<AuthUser>(10);
                var isexist = dbConn.FirstOrDefault<AuthUser>("entryid={0}", this.entryid);
                if (isexist == null)
                {

                    this.isactive = true;
                    this.createdat = DateTime.Now;
                    this.createdby = curruserid;
                    this.updatedat = DateTime.Now;
                    this.updatedby = curruserid;
                    this.lastlogin = DateTime.Now;
                    dbConn.Insert<AuthUser>(this);
                    long lastInsertId = dbConn.GetLastInsertId();
                    dbConn.Close();
                    this.entryid = Convert.ToInt32(lastInsertId);
                    return this.entryid;
                }
                else if (isexist != null)
                {
                    this.isactive = isexist.isactive;
                    this.loginprovider = isexist.loginprovider;
                    this.logintype = isexist.logintype;
                    this.createdat = isexist.createdat;
                    this.createdby = isexist.createdby;
                    this.updatedat = DateTime.Now;
                    this.updatedby = curruserid;
                    this.lastlogin = DateTime.Now;
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