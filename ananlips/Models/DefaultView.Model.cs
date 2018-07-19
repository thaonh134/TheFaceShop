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

namespace ananlips.Models
{
	public class DefaultView
	{
        #region getList Product by subcategory
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
            public static void AddItemToBillSection(string productid)
            {
                try
                {
                   var product= FE_Product.GetDetail(productid);
                    if (product == null) return;
                  var itemBill=  FE_Bill.GetBillSection();
                    if (itemBill.BillDetails == null) itemBill.BillDetails = new List<FE_BillDetail>();

                    var matches = itemBill.BillDetails.Where(p => p.ProductId == product.ProductId).ToList();
                    if (matches.Count > 0)
                    {
                        matches.ForEach(c => c.Quantity = c.Quantity + 1);
                    }
                    else
                    {
                        var itemBillDetail = new FE_BillDetail();
                        itemBillDetail.ProductId = product.ProductId;
                        itemBillDetail.ProductName = product.ProductName;
                        itemBillDetail.ProductImg = product.ProductImg;

                        itemBillDetail.Quantity = 1;
                        itemBillDetail.PriceAmount = product.PriceAmount;
                        itemBillDetail.Discount = product.Discount;
                        itemBillDetail.Price = product.Price;

                        itemBill.BillDetails.Add(itemBillDetail);
                    }

                    itemBill.PriceAmount = 0;
                    foreach(var itemBillDetail in itemBill.BillDetails)
                    {
                        itemBill.PriceAmount += (itemBillDetail.Quantity * itemBillDetail.PriceAmount);
                    }
                    HttpContext.Current.Session["FE_Bill"] = itemBill;

                }
                catch (Exception ex)
                {

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
            public double Quantity { get; set; }
            public double PriceAmount { get; set; }
        }

       
        #endregion
    }
}