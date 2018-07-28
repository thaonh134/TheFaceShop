using Kendo.Mvc;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.IO;
using System.IO.Compression;
using System.Drawing;
using System.Drawing.Imaging;
using System.Configuration;
using AutoMapper;

namespace ananlips.Areas.Admin.Models
{
    public class CustomModel
    {
        ///<summary>
        ///
        ///</summary>
        public static string GetSortStringFormRequest(DataSourceRequest request)
        {
            string result = "", sortCont = "";
            if (request.Sorts.Count > 0)
            {
                foreach (SortDescriptor itemSort in request.Sorts)
                {
                    if (itemSort.SortDirection == System.ComponentModel.ListSortDirection.Ascending)
                    {
                        sortCont += itemSort.Member + " ASC, ";
                    }
                    else
                    {
                        sortCont += itemSort.Member + " DESC, ";
                    }
                }
                sortCont = sortCont.Substring(0, sortCont.Length - 2);
                result = " ORDER BY " + sortCont;
            }
            return result;
        }
        public static int GetExportPageSize()
        {
            return 99999;
        }
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();
            System.Reflection.PropertyInfo[] test = temp.GetProperties();
            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (System.Reflection.PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name.ToLower() == column.ColumnName.ToLower())
                    {
                        if (column.ColumnName == "c_vi_tri_banner")
                        {
                            int a = 1;
                        }
                        try
                        {
                            pro.SetValue(obj, dr[column.ColumnName], null);
                        }
                        catch (Exception ex)
                        {
                            try
                            {
                                if (pro.PropertyType.Name == "Int32") pro.SetValue(obj, Convert.ToInt32(dr[column.ColumnName]), null);
                                //viet them tutu cac truong hop ngoai le khac
                                if (pro.PropertyType.Name == "Double") pro.SetValue(obj, Convert.ToDouble(dr[column.ColumnName]), null);
                                if (pro.PropertyType.Name == "String") pro.SetValue(obj, dr[column.ColumnName].ToString(), null);
                            }
                            catch (Exception exConvert)
                            {

                            }

                        }

                    }
                    else
                        continue;
                }
            }
            return obj;
        }
        public static T CopyObject<T>(T Item)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();
            System.Reflection.PropertyInfo[] test = temp.GetProperties();
            foreach (System.Reflection.PropertyInfo pro in temp.GetProperties())
            {
                try
                {
                    if (pro.Name == "c_vi_tri_banner")
                    {
                        int a = 1;
                    }
                    pro.SetValue(obj, pro.GetValue(Item), null);
                }
                catch (Exception ex)
                {

                }
            }
            return obj;
        }

        public static List<DDLModel> GetActiveStatus()
        {
            return ActiveStatus.GetActiveStatus();
        }
        public static List<DDLModel> GetLanguage()
        {
            List<DDLModel> newLst = new List<DDLModel>();
            newLst.Add(new DDLModel() { ID = "en",Name="english"});
            newLst.Add(new DDLModel() { ID = "vi", Name = "vietnam" });
            return newLst;
        }
        #region base model
        ///<summary>
        ///
        ///</summary>
        public static string ConvertToUnsign(string str)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = str.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty)
                        .Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        ///<summary>
        ///Conver sang khong dau
        ///</summary>
        ///
        public static string ConvertToUnSignURL(string text, bool isReplace)
        {
            for (int i = 33; i < 48; i++)
            {
                if (i == 45 || i == 47) continue;
                text = text.Replace(((char)i).ToString(), "");
            }

            for (int i = 58; i < 65; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }

            for (int i = 91; i < 97; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }
            for (int i = 123; i < 127; i++)
            {
                text = text.Replace(((char)i).ToString(), "");
            }
            text = CustomModel.RemoveContinuousSpaces(text);
            if (isReplace)
            {
                text = text.Replace(" ", "-");
                text = text.Replace("/", "-");
            }
            text = text.Replace("---", "-");
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string strFormD = text.Normalize(System.Text.NormalizationForm.FormD);
            return regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }
        ///<summary>
        ///Xóa các khoảng trắng liên tiếp ("  " > 1 ) bên trong chuổi
        ///</summary>
        ///
        private static string RemoveContinuousSpaces(string S)
        {
            if (S.Length == 0)
                return "";

            S = S.Trim();
            while (S.Contains("  "))
                S = S.Replace("  ", " ");
            return S;
        }

        ///<summary>
        ///ResizeBitmap
        ///</summary>
        ///
        public Bitmap ResizeBitmap(Bitmap b, int nWidth, int nHeight)
        {
            Bitmap result = new Bitmap(nWidth, nHeight);
            using (Graphics g = Graphics.FromImage((System.Drawing.Image)result))
                g.DrawImage(b, 0, 0, nWidth, nHeight);
            return result;
        }


        //check property is exist in object
        public static bool ObjIsProperty(dynamic data, string key)
        {
            try
            {
                foreach (var item in ((IEnumerable<string>)data.GetDynamicMemberNames()).ToList())
                {
                    if (item == key) return true;
                }
                return false;

            }
            catch (Exception)
            {

                return false;

            }

        }

      

        public static Bitmap ResizeBitmap_v2(Bitmap b, int nWidth, int nHeight)
        {
            Bitmap result = new Bitmap(nWidth, nHeight);
            using (Graphics g = Graphics.FromImage((System.Drawing.Image)result))
                g.DrawImage(b, 0, 0, nWidth, nHeight);
            return result;
        }
        #endregion

        #region Master DDL
        //Get DDL
        ///<summary>
        ///Lấy danh sách vùng miền
        ///</summary>
        public static List<DDLModel> GetCategoryForDDL()
        {
            

            return Mapper.Map<List<DDLModel>>(Category.GetList(0, null, false)); 
        }
        //Get DDL
        ///<summary>
        ///Lấy danh sách vùng miền
        ///</summary>
        public static List<DDLModel> GetSubCategoryForDDL(int CategoryId)
        {
            return Mapper.Map<List<DDLModel>>(SubCategory.GetByCategoryId(CategoryId, null, false)) ;
        }
        #endregion
    }
}