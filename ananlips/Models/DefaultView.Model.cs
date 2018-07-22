using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Linq;
using ananlips.Service;
using ServiceStack.OrmLite;
using ananlips.Areas.Admin.Models;
using AutoMapper;
using System.Data.SqlClient;
using System.Dynamic;

namespace ananlips.Models
{
	public class DefaultView
	{
        #region getList Data 
        public class FE_Product
        {

            public int ProductId { get; set; }
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public string ProductName { get; set; }
            public string CategoryName { get; set; }
            public string SubCategoryName { get; set; }
            public string ProductImg { get; set; }
            public double Discount { get; set; }
            public double PriceAmount { get; set; }
            public double Price { get; set; }



            public string Brand { get; set; }
            public string Origin { get; set; }
            public string Unit { get; set; }
            public double Unitquantity { get; set; }
            public int Viewcount { get; set; }
            public int Sellcount { get; set; }
            public string Comments { get; set; }
            public static List<FE_Product> GetByCategory(string categoryid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var lst_item = dbConn.Select<Product>("isactive={0} and categoryid = {1}", 1, categoryid);
                    var mapped = Mapper.Map<List<FE_Product>>(lst_item);
                    var result = mapped;
                    return result;

                }
                catch (Exception ex)
                {
                    return new List<FE_Product>();
                }
            }
            public static SearchResult SearchByCategory(SearchRequest request, string categoryid)
            {
                var result = new SearchResult();
                try
                {
                    List<SqlParameter> param = new List<SqlParameter>();
                    param.Add(new SqlParameter("@page", request.pagenum));
                    param.Add(new SqlParameter("@pagesize", request.pagesize));
                    param.Add(new SqlParameter("@categoryid", categoryid));
                    param.Add(new SqlParameter("@wherecondition", ""));
                    param.Add(new SqlParameter("@curruserid", 0));
                    param.Add(new SqlParameter("@sort", GetSortString(request)));

                    var data = new SqlHelper().ExecuteQuery("p_Product_FESearchByCategory", param);
                    result.pagenum = request.pagenum;
                    result.dataresult = Mapper.Map<List<FE_Product>>(CustomModel.ConvertDataTable<Product>(data));
                    result.total = data.Rows.Count > 0 ? Convert.ToInt32(data.Rows[0]["rowcount"]) : 0;
                    return result;

                }
                catch (Exception ex)
                {
                    result.pagenum = request.pagenum;
                    result.dataresult = null;
                    result.total = 0;
                    return result;
                }
            }
            public static SearchResult SearchBySubCategory(SearchRequest request, string subcategoryid)
            {
                var result = new SearchResult();
                try
                {
                    List<SqlParameter> param = new List<SqlParameter>();
                    param.Add(new SqlParameter("@page", request.pagenum));
                    param.Add(new SqlParameter("@pagesize", request.pagesize));
                    param.Add(new SqlParameter("@subcategoryid", subcategoryid));
                    param.Add(new SqlParameter("@wherecondition", ""));
                    param.Add(new SqlParameter("@curruserid", 0));
                    param.Add(new SqlParameter("@sort", GetSortString(request)));

                    var data = new SqlHelper().ExecuteQuery("p_Product_FESearchBySubcategory", param);
                    result.pagenum = request.pagenum;
                    result.dataresult = Mapper.Map<List<FE_Product>>(CustomModel.ConvertDataTable<Product>(data));
                    result.total = data.Rows.Count > 0 ? Convert.ToInt32(data.Rows[0]["rowcount"]) : 0;
                    return result;

                }
                catch (Exception ex)
                {
                    result.pagenum = request.pagenum;
                    result.dataresult = null;
                    result.total = 0;
                    return result;
                }
            }

            public static string GetSortString(SearchRequest request)
            {
                var sortby =string.IsNullOrEmpty(request.sorttype)?"":( request.sorttype == "-1" ? "ASC" : "DESC");
                var orderby = request.orderby;
                return " ORDER BY "+ orderby+" "+ sortby;
            }
            public static List<FE_Product> GetBySubCategory(string subcategoryid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var lst_item = dbConn.Select<Product>("isactive={0} and subcategoryid = {1}", 1, subcategoryid);
                    var mapped = Mapper.Map<List<FE_Product>>(lst_item);
                    var result = mapped;
                    return result;

                }
                catch (Exception ex)
                {
                    return new List<FE_Product>();
                }
            }

            public static FE_Product GetDetail(string productid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var item = dbConn.FirstOrDefault<Product>("isactive={0} and entryid = {1}", 1, productid);
                    var mapped = Mapper.Map<FE_Product>(item);
                    var result = mapped;
                    return result;

                }
                catch (Exception ex)
                {
                    return new FE_Product();
                }
            }

            public static List<FE_Product> GetBestSell()
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var lst_item = dbConn.Select<Product>("isactive={0}", 1).OrderByDescending(x=>x.sellcount).Take(6).ToList();
                    var mapped = Mapper.Map<List<FE_Product>>(lst_item);
                    var result = mapped;
                    return result;

                }
                catch (Exception ex)
                {
                    return new List<FE_Product>();
                }
            }
        }
        public class FE_Category
        {
            public int CategoryId { get; set; }
            public string CategoryName { get; set; }
            public static FE_Category GetDetail(string categoryid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var item = dbConn.FirstOrDefault<Category>("isactive={0} and entryid = {1}", 1, categoryid);
                   if(item==null) return new FE_Category();
                    return Mapper.Map<FE_Category>(item); 

                }
                catch (Exception ex)
                {
                    return new FE_Category();
                }
            }

        }
        public class FE_SubCategory
        {
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public string SubCategoryName { get; set; }
            public static FE_SubCategory GetDetail(string subcategoryid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var item = dbConn.FirstOrDefault<SubCategory>("isactive={0} and entryid = {1}", 1, subcategoryid);
                    if (item == null) return new FE_SubCategory();
                    return Mapper.Map<FE_SubCategory>(item);

                }
                catch (Exception ex)
                {
                    return new FE_SubCategory();
                }
            }

            public static List<FE_SubCategory> GetByCategory(string categoryid)
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var item = dbConn.Select<SubCategory>("isactive={0} and categoryid = {1}", 1, categoryid);
                    if (item == null) return new List<FE_SubCategory>();
                    return Mapper.Map<List<FE_SubCategory>>(item);

                }
                catch (Exception ex)
                {
                    return new List<FE_SubCategory>();
                }
            }

        }
        #endregion


        #region Menu front end
        public class FE_MenuSubItem
        {
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public string SubCategoryName { get; set; }
            public List<FE_Product> ProductItems { get; set; }
        }

        public class FE_MenuItem
        {
            public int CategoryId { get; set; }
            public string CategoryName { get; set; }
            public List<FE_MenuSubItem> MenuSubItems { get; set; }

            public static List<FE_MenuItem> GetMenu()
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var lst_cate = dbConn.Select<Category>("isactive={0}", 1);
                    var lst_subcate = dbConn.Select<SubCategory>("isactive={0}", 1);

                    var result= new List<FE_MenuItem>();
                    foreach(var item in lst_cate)
                    {
                        var entryItem = new FE_MenuItem();
                        entryItem.CategoryId = item.entryid;
                        entryItem.CategoryName = item.entryname;
                        entryItem.MenuSubItems=new List<FE_MenuSubItem>();
                        foreach (var subitem in lst_subcate)
                        {
                            if(item.entryid == subitem.categoryid)
                            {
                                var entrysubitem = new FE_MenuSubItem();
                                entrysubitem.CategoryId = subitem.categoryid;
                                entrysubitem.SubCategoryId = subitem.entryid;
                                entrysubitem.SubCategoryName = subitem.entryname;

                                entryItem.MenuSubItems.Add(entrysubitem);

                            }

                        }
                        result.Add(entryItem);
                    }

                    return result;
                }
                catch(Exception ex)
                {

                    return new List<FE_MenuItem>();
                }
            }

            public static List<FE_MenuItem> GetHomeItem()
            {
                try
                {
                    IDbConnection dbConn = new OrmliteConnection().openConn();
                    var lst_cate = dbConn.Select<Category>("isactive={0}", 1);
                    var result = new List<FE_MenuItem>();
                    foreach (var item in lst_cate)
                    {
                        var entryItem = new FE_MenuItem();
                        entryItem.CategoryId = item.entryid;
                        entryItem.CategoryName = item.entryname;
                        entryItem.MenuSubItems = new List<FE_MenuSubItem>();

                        var lst_subcate = dbConn.Select<SubCategory>("isactive={0} and categoryid = {1}", 1, item.entryid).ToList();

                        foreach (var subitem in lst_subcate)
                        {
                            if (item.entryid == subitem.categoryid)
                            {
                                var entrysubitem = new FE_MenuSubItem();
                                entrysubitem.CategoryId = subitem.categoryid;
                                entrysubitem.SubCategoryId = subitem.entryid;
                                entrysubitem.SubCategoryName = subitem.entryname;
                                var lst_item = dbConn.Select<Product>("isactive={0} and subcategoryid = {1}", 1, subitem.entryid).Take(8).ToList();
                                if (lst_item != null && lst_item.Count > 4 && lst_item.Count < 8) lst_item = lst_item.Take(4).ToList();
                                var lst_product = Mapper.Map<List<FE_Product>>(lst_item);
                                entrysubitem.ProductItems = lst_product;
                                entryItem.MenuSubItems.Add(entrysubitem);

                            }

                        }
                        result.Add(entryItem);
                    }

                    return result;
                }
                catch (Exception ex)
                {

                    return new List<FE_MenuItem>();
                }
            }
        }
        #endregion

       
        #region Bill process
        public class FE_Bill
        {
            public int BillId { get; set; }
            public int Userid { get; set; }

            public int Deliveryid { get; set; }
            public string FullNname { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public double PriceAmount { get; set; }
            public int Quantity { get; set; }
            public string Comments { get; set; }
            public List<FE_BillDetail> BillDetails { get; set; }
            public DateTime createdat { get; set; }

            public static FE_Bill GetBillSection()
            {
              
                if (HttpContext.Current.Session["FE_Bill"] == null) 
                    SetBillSection(new FE_Bill());
                return (FE_Bill)HttpContext.Current.Session["FE_Bill"];
            }

            public static void SetBillSection(FE_Bill item)
            {
                HttpContext.Current.Session["FE_Bill"] = item;
            }
            public static void AddItemToBillSection(FE_BillDetail item)
            {
                try
                {
                    if (item.Quantity == 0) item.Quantity = 1;
                   var product= FE_Product.GetDetail(item.ProductId.ToString());
                    if (product == null) return;
                  var itemBill=  FE_Bill.GetBillSection();
                    if (itemBill.BillDetails == null) itemBill.BillDetails = new List<FE_BillDetail>();

                    var matches = itemBill.BillDetails.Where(p => p.ProductId == product.ProductId).ToList();
                    if (matches.Count > 0)
                    {
                        matches.ForEach(c => c.Quantity = c.Quantity + item.Quantity);
                    }
                    else
                    {
                        var itemBillDetail = new FE_BillDetail();
                        itemBillDetail.ProductId = product.ProductId;
                        itemBillDetail.ProductName = product.ProductName;
                        itemBillDetail.ProductImg = product.ProductImg;

                        itemBillDetail.Quantity = item.Quantity;
                        itemBillDetail.PriceAmount = product.PriceAmount;
                        itemBillDetail.Discount = product.Discount;
                        itemBillDetail.Price = product.Price;

                        itemBill.BillDetails.Add(itemBillDetail);
                    }

                    itemBill.Quantity = 0;
                    itemBill.PriceAmount = 0;
                    foreach (var itemBillDetail in itemBill.BillDetails)
                    {
                        itemBill.PriceAmount += (itemBillDetail.Quantity * itemBillDetail.PriceAmount);
                        itemBill.Quantity += itemBillDetail.Quantity;
                    }
                    HttpContext.Current.Session["FE_Bill"] = itemBill;

                }
                catch (Exception ex)
                {

                }
            }
            public static void UpdateBillItem(List<FE_BillDetail> lstItem)
            {
                try
                {
                    var itemBill = FE_Bill.GetBillSection();
                   itemBill.BillDetails = new List<FE_BillDetail>();
                    foreach (var item in lstItem)
                    {
                        if (item.Quantity == 0) item.Quantity = 1;
                        var product = FE_Product.GetDetail(item.ProductId.ToString());
                        if (product == null) continue;

                        var itemBillDetail = new FE_BillDetail();
                        itemBillDetail.ProductId = product.ProductId;
                        itemBillDetail.ProductName = product.ProductName;
                        itemBillDetail.ProductImg = product.ProductImg;

                        itemBillDetail.Quantity = item.Quantity;
                        itemBillDetail.PriceAmount = product.PriceAmount;
                        itemBillDetail.Discount = product.Discount;
                        itemBillDetail.Price = product.Price;

                        itemBill.BillDetails.Add(itemBillDetail);

                    }



                    itemBill.Quantity = 0;
                    itemBill.PriceAmount = 0;
                    foreach (var itemBillDetail in itemBill.BillDetails)
                    {
                        itemBill.PriceAmount += (itemBillDetail.Quantity * itemBillDetail.PriceAmount);
                        itemBill.Quantity += itemBillDetail.Quantity;
                    }
                    HttpContext.Current.Session["FE_Bill"] = itemBill;

                }
                catch (Exception ex)
                {

                }
            }
            public static void RemoveItemBillSection(FE_BillDetail item)
            {
                try
                {
                    
                    var itemBill = FE_Bill.GetBillSection();
                    if (itemBill.BillDetails == null) itemBill.BillDetails = new List<FE_BillDetail>();
                    itemBill.BillDetails.RemoveAll(p => p.ProductId == item.ProductId);
                    //var matches = itemBill.BillDetails.Where(p => p.ProductId == item.ProductId).ToList() ;
                    //if (matches.Count > 0)
                    //{
                    //    itemBill.BillDetails.RemoveAll(matches);
                    //}

                    itemBill.Quantity = 0;
                    itemBill.PriceAmount = 0;
                    foreach (var itemBillDetail in itemBill.BillDetails)
                    {
                        itemBill.PriceAmount += (itemBillDetail.Quantity * itemBillDetail.PriceAmount);
                        itemBill.Quantity += itemBillDetail.Quantity;
                    }
                    HttpContext.Current.Session["FE_Bill"] = itemBill;

                }
                catch (Exception ex)
                {

                }
            }

            public static FE_Bill ConvertQuickBill(FE_QuickBillDetail item)
            {
                try
                {
                    var bill = Mapper.Map<FE_Bill>(item);
                    var billdetail = Mapper.Map<FE_BillDetail>(item);
                    bill.BillDetails = new List<FE_BillDetail>();
                    bill.BillDetails.Add(billdetail);
                    return bill;


                }
                catch (Exception ex)
                {
                    return new FE_Bill();

                }
            }
        }
        public class FE_BillDetail
        {
            public int BillId { get; set; }
            public int ProductId { get; set; }
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public string ProductName { get; set; }
            public string CategoryName { get; set; }
            public string SubCategoryName { get; set; }
            public string ProductImg { get; set; }
            public double Price { get; set; }
            public double Discount { get; set; }
            public int Quantity { get; set; }
            public double PriceAmount { get; set; }
        }
        public class TmpBillDetail
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }

        }
        public class FE_QuickBillDetail
        {
            public int BillId { get; set; }
            public int Userid { get; set; }

            public int Deliveryid { get; set; }
            public string FullNname { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public double PriceAmount { get; set; }
            public string Comments { get; set; }

            public int ProductId { get; set; }
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public string ProductName { get; set; }
            public string CategoryName { get; set; }
            public string SubCategoryName { get; set; }
            public string ProductImg { get; set; }
            public double Price { get; set; }
            public double Discount { get; set; }
            public int Quantity { get; set; }
        }


        #endregion

        public static List<DDLModel> ListOrderProduct()
        {
            var lstResult = new List<DDLModel>();
            lstResult.Add(new DDLModel() { ID="CreatedAt",Name= "Thứ tự theo sản phẩm mới" });
            lstResult.Add(new DDLModel() { ID = "Price", Name = "Thứ tự theo giá: thấp đến cao" });
            lstResult.Add(new DDLModel() { ID = "Price desc", Name = "Thứ tự theo giá: cao xuống thấp" });
            lstResult.Add(new DDLModel() { ID = "Viewcount", Name = "Thứ tự theo mức độ phổ biến" });
            lstResult.Add(new DDLModel() { ID = "Sellcount", Name = "Thứ tự theo điểm đánh giá" });
            return lstResult;
        }
       
    }

    public static class DataTableX
    {
        public static IEnumerable<dynamic> AsDynamicEnumerable(this DataTable table)
        {
            // Validate argument here..

            return table.AsEnumerable().Select(row => new DynamicRow(row));
        }

        private sealed class DynamicRow : DynamicObject
        {
            private readonly DataRow _row;

            internal DynamicRow(DataRow row) { _row = row; }

            // Interprets a member-access as an indexer-access on the 
            // contained DataRow.
            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                var retVal = _row.Table.Columns.Contains(binder.Name);
                result = retVal ? _row[binder.Name] : null;
                return retVal;
            }
        }
    }
}