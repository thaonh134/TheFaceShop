using ananlips.Service;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
/*AutoGen: ThaoNH*/
namespace ananlips.Areas.Admin.Models.AutoGen
{
    public abstract class ArticleBase<T> where T : ArticleBase<T>
    {
        [PrimaryKey]
        [AutoIncrement]
        public int entryid { get; set; }
        public string entrycode { get; set; }
        public string entryname { get; set; }

        public int articletype { get; set; }
        public string comments { get; set; }
        public bool isactive { get; set; }
        public DateTime createdat { get; set; }
        public int createdby { get; set; }
        public DateTime updatedat { get; set; }
        public int updatedby { get; set; }

        public DataSourceResult GetPage(DataSourceRequest request, string wherecondition, string status, int curruserid)
        {
            List<SqlParameter> param = new List<SqlParameter>
            {
                new SqlParameter("@page", request.Page),
                new SqlParameter("@pagesize", request.PageSize),
                new SqlParameter("@wherecondition", wherecondition),
                new SqlParameter("@status", status),
                new SqlParameter("@curruserid", curruserid),
                new SqlParameter("@sort", CustomModel.GetSortStringFormRequest(request))
            };

            DataTable data = new SqlHelper().ExecuteQuery("p_Article_Search", param);
            request.Page = 1;
            request.Filters = null;
            DataSourceResult result = data.ToDataSourceResult(request);
            result.Total = data.Rows.Count > 0 ? Convert.ToInt32(data.Rows[0]["rowcount"]) : 0;
            return result;
        }

        public List<T> GetExport(DataSourceRequest request, string whereCondition, string status, int curruserid)
        {
            List<SqlParameter> param = new List<SqlParameter>
            {
                new SqlParameter("@Page", 1),
                new SqlParameter("@PageSize", CustomModel.GetExportPageSize()),
                new SqlParameter("@wherecondition", whereCondition),
                new SqlParameter("@status", status),
                new SqlParameter("@curruserid", curruserid),
                new SqlParameter("@sort", CustomModel.GetSortStringFormRequest(request))
            };
            return CustomModel.ConvertDataTable<T>(new SqlHelper().ExecuteQuery("p_Article_Search", param));
        }
        public static T GetById(int entryid, IDbConnection dbConn, bool isTrans)
        {
            if (dbConn == null)
            {
                dbConn = new OrmliteConnection().openConn();
            }

            try
            {
                T data = dbConn.GetByIdOrDefault<T>(entryid);
                return data;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (!isTrans)
                {
                    dbConn.Close();
                }
            }
        }
        public static T GetByCode(string entrycode, IDbConnection dbConn, bool isTrans)
        {
            if (dbConn == null)
            {
                dbConn = new OrmliteConnection().openConn();
            }

            try
            {
                T data = dbConn.FirstOrDefault<T>("entrycode={0}", entrycode);
                return data;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (!isTrans)
                {
                    dbConn.Close();
                }
            }
        }
    }
}