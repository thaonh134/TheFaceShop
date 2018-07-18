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
	public abstract  class ProductBase<T> where T : ProductBase<T>
    {
	 [PrimaryKey]
    [AutoIncrement]
        public int entryid { get; set; }
        public string entrycode { get; set; }
        public string entryname { get; set; }
        
public  string entrynamevi  { get; set; } 
public  int subcategoryid  { get; set; } 
public  int categoryid  { get; set; } 
public  string defautlimg  { get; set; } 
public  string listimgs  { get; set; } 
public  double price  { get; set; } 
public  double discount  { get; set; } 
public  double priceamount  { get; set; } 
public  string brand  { get; set; } 
public  string origin  { get; set; } 
public  string unit  { get; set; } 
public  double unitquantity  { get; set; } 
public  int viewcount  { get; set; } 
public  int sellcount  { get; set; } 
public  string comments  { get; set; } 	
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

            var data = new SqlHelper().ExecuteQuery("p_Product_Search", param);
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
    return CustomModel.ConvertDataTable<T>(new SqlHelper().ExecuteQuery("p_Product_Search", param));
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