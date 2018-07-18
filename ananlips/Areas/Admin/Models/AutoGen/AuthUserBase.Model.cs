using ananlips.Areas.Admin.Models;
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
	public abstract  class AuthUserBase<T> where T : AuthUserBase<T>
    {
	 [PrimaryKey]
    [AutoIncrement]
        public int entryid { get; set; }
        public string entrycode { get; set; }
        public string entryname { get; set; }
        
public  string fullname  { get; set; } 
public  string password  { get; set; } 
public  string visiblepassword  { get; set; } 
public  string avatarpath  { get; set; } 
public  string phone  { get; set; } 
public  string email  { get; set; } 
public  string address  { get; set; } 
public  DateTime birthday  { get; set; } 
public  string comments  { get; set; } 
public  int roleid  { get; set; } 
public  string loginprovider  { get; set; } 
public  DateTime lastlogin  { get; set; } 	
        public bool isactive { get; set; }
        public DateTime createdat { get; set; }
        public int createdby { get; set; }
        public DateTime updatedat { get; set; }
        public int updatedby { get; set; }

        public DataSourceResult GetPage(DataSourceRequest request, string wherecondition, string status, int curruserid)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("@page", request.Page));
            param.Add(new SqlParameter("@pagesize", request.PageSize));
            param.Add(new SqlParameter("@wherecondition", wherecondition));
            param.Add(new SqlParameter("@status", status));
            param.Add(new SqlParameter("@curruserid", curruserid));
             param.Add(new SqlParameter("@sort", CustomModel.GetSortStringFormRequest(request)));

            var data = new SqlHelper().ExecuteQuery("p_AuthUser_Search", param);
            request.Page = 1;
            request.Filters = null;
            var result = data.ToDataSourceResult(request);
            result.Total = data.Rows.Count > 0 ? Convert.ToInt32(data.Rows[0]["rowcount"]) : 0;
            return result;
        }

        public List<T> GetExport(DataSourceRequest request, string whereCondition, string status, int curruserid)
        {
            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("@Page", 1));
            param.Add(new SqlParameter("@PageSize", CustomModel.GetExportPageSize()));
            param.Add(new SqlParameter("@wherecondition", whereCondition));
            param.Add(new SqlParameter("@status", status));
            param.Add(new SqlParameter("@curruserid", curruserid));
            param.Add(new SqlParameter("@sort", CustomModel.GetSortStringFormRequest(request)));
    return CustomModel.ConvertDataTable<T>(new SqlHelper().ExecuteQuery("p_AuthUser_Search", param));
        }
public static T GetById(int entryid)
{
    IDbConnection dbConn = new OrmliteConnection().openConn();
    try
    {
        var data = dbConn.GetByIdOrDefault<T>(entryid);
        return data;
    }
    catch (Exception e)
    {
        return null;
    }
    finally { dbConn.Close(); }
}
public static T GetByCode(string entrycode)
{
    IDbConnection dbConn = new OrmliteConnection().openConn();
    try
    {
        var data = dbConn.FirstOrDefault<T>("entrycode={0}", entrycode);
        return data;
    }
    catch (Exception e)
    {
        return null;
    }
    finally { dbConn.Close(); }
}
}
}