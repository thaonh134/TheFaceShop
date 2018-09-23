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
    public class Category : CategoryBase<Category>
    {

        #region AutoGen
        public int AddOrUpdate(int curruserid, IDbConnection dbConn, bool isTrans)
        {
            if (dbConn == null) dbConn = new OrmliteConnection().openConn();
            try
            {
                var isexist = dbConn.GetByIdOrDefault<Category>(this.entryid);
                if (isexist == null)
                {

                    this.isactive = true;
                    this.createdat = DateTime.Now;
                    this.createdby = curruserid;
                    this.updatedat = DateTime.Now;
                    this.updatedby = curruserid;
                    dbConn.Insert<Category>(this);
                    long lastInsertId = dbConn.GetLastInsertId();
                    if (!isTrans) dbConn.Close();
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
                    dbConn.Update<Category>(this);
                    if (!isTrans) dbConn.Close();
                    return this.entryid;
                }
                else
                {
                    if (!isTrans) dbConn.Close();
                    return 0;
                }

            }
            catch (Exception ex)
            {
                if (!isTrans)
                {
                    dbConn.Close();
                    return 0;
                }

                throw new System.ArgumentException("data error", ex);
            }
        }
        #endregion
        #region MyCode
        public static List<Category> GetList(int curruserid, IDbConnection dbConn, bool isTrans)
        {
            if (dbConn == null) dbConn = new OrmliteConnection().openConn();
            try
            {
                var data = dbConn.Where<Category>(x => x.isactive == true);
                return data;
            }
            catch (Exception e)
            {
                return null;
            }
            finally { if (!isTrans) dbConn.Close(); }
        }
        #endregion
    }
}