using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ananlips.Areas.Admin.Models;
using AutoMapper;
using static ananlips.Models.DefaultView;

namespace ananlips.AutoMap
{
   
    public class Fe_Mapper : Profile
    {
        public Fe_Mapper()
        {
            CreateMap<FE_ContactRequest, ContactRequest>()
              .ForMember(dst => dst.entryid, x => x.MapFrom(src => src.ContactRequestId))
              .ForMember(dst => dst.entrycode, x => x.MapFrom(src => src.EntryName))
              .ForMember(dst => dst.entryname, x => x.MapFrom(src => src.EntryName))
              .ForMember(dst => dst.topiccontact, x => x.MapFrom(src => src.TopicContact))
              .ForMember(dst => dst.userid, x => x.MapFrom(src => src.UserId))
              .ForMember(dst => dst.fullname, x => x.MapFrom(src => src.FullName))
              .ForMember(dst => dst.address, x => x.MapFrom(src => src.Address))
              .ForMember(dst => dst.phone, x => x.MapFrom(src => src.Phone))
              .ForMember(dst => dst.email, x => x.MapFrom(src => src.Email))
              .ForMember(dst => dst.comments, x => x.MapFrom(src => src.Comments))
              .ForMember(dst => dst.isactive, x => x.UseValue(true))
              .ForMember(dst => dst.createdat, x => x.UseValue(DateTime.UtcNow))
              .ForMember(dst => dst.createdby, x => x.MapFrom(src => src.UserId))
              .ForMember(dst => dst.updatedat, x => x.UseValue(DateTime.UtcNow))
              .ForMember(dst => dst.updatedby, x => x.MapFrom(src => src.UserId))
              ;

            CreateMap<Product, FE_Product>()
                .ForMember(dst => dst.ProductId, x => x.MapFrom(src => src.entryid))
                .ForMember(dst => dst.CategoryId, x => x.MapFrom(src => src.categoryid))
                .ForMember(dst => dst.SubCategoryId, x => x.MapFrom(src => src.subcategoryid))
                .ForMember(dst => dst.ProductName, x => x.MapFrom(src => src.entryname))
                .ForMember(dst => dst.ProductImg, x => x.MapFrom(src => src.defautlimg))
                .ForMember(dst => dst.Discount, x => x.MapFrom(src => src.discount != null ? src.discount*100:0))
                .ForMember(dst => dst.Price, x => x.MapFrom(src => src.price))
                .ForMember(dst => dst.PriceAmount, x => x.MapFrom(src => src.priceamount))

                .ForMember(dst => dst.Brand, x => x.MapFrom(src => src.brand))
                .ForMember(dst => dst.Origin, x => x.MapFrom(src => src.origin))
                .ForMember(dst => dst.Unit, x => x.MapFrom(src => src.unit))
                .ForMember(dst => dst.Unitquantity, x => x.MapFrom(src => src.unitquantity))
                .ForMember(dst => dst.Viewcount, x => x.MapFrom(src => src.viewcount))
                .ForMember(dst => dst.Sellcount, x => x.MapFrom(src => src.sellcount))
                .ForMember(dst => dst.Comments, x => x.MapFrom(src => src.comments))
                ;
            CreateMap<Article, FE_Article>()
               .ForMember(dst => dst.ArticleId, x => x.MapFrom(src => src.entryid))
               .ForMember(dst => dst.ArticleType, x => x.MapFrom(src => src.articletype))
               .ForMember(dst => dst.ArticleName, x => x.MapFrom(src => src.entryname))
               .ForMember(dst => dst.Comments, x => x.MapFrom(src => src.comments))
               ;

            CreateMap<Category, FE_Category>()
               .ForMember(dst => dst.CategoryId, x => x.MapFrom(src => src.entryid))
               .ForMember(dst => dst.CategoryName, x => x.MapFrom(src => src.entryname))
               ;
            CreateMap<SubCategory, FE_SubCategory>()
               .ForMember(dst => dst.SubCategoryId, x => x.MapFrom(src => src.entryid))
               .ForMember(dst => dst.SubCategoryName, x => x.MapFrom(src => src.entryname))
               .ForMember(dst => dst.CategoryId, x => x.MapFrom(src => src.categoryid))
               ;

            CreateMap<Delivery, FE_Delivery>()
              .ForMember(dst => dst.DeliveryId, x => x.MapFrom(src => src.entryid))
              .ForMember(dst => dst.UserId, x => x.MapFrom(src => src.userid))
              .ForMember(dst => dst.FullName, x => x.MapFrom(src => src.fullname))
              .ForMember(dst => dst.Address, x => x.MapFrom(src => src.address))
              .ForMember(dst => dst.Phone, x => x.MapFrom(src => src.phone))
              .ForMember(dst => dst.Email, x => x.MapFrom(src => src.email))
              .ForMember(dst => dst.Comments, x => x.MapFrom(src => src.comments))
              ;

            CreateMap<FE_Bill, Bill>()
              .ForMember(dst => dst.entryid, x => x.MapFrom(src => src.BillId))
              .ForMember(dst => dst.userid, x => x.MapFrom(src => src.UserId))
              .ForMember(dst => dst.deliveryid, x => x.MapFrom(src => src.DeliveryId))
              .ForMember(dst => dst.quantity, x => x.MapFrom(src => src.Quantity))
              .ForMember(dst => dst.priceamount, x => x.MapFrom(src => src.PriceAmount))
              ;
            CreateMap<FE_BillDetail, BillDetail>()
             .ForMember(dst => dst.entryid, x => x.MapFrom(src => src.BillDetailId))
             .ForMember(dst => dst.billid, x => x.MapFrom(src => src.BillId))
             .ForMember(dst => dst.productid, x => x.MapFrom(src => src.ProductId))
             .ForMember(dst => dst.productname, x => x.MapFrom(src => src.ProductName))
             .ForMember(dst => dst.quantity, x => x.MapFrom(src => src.Quantity))
             .ForMember(dst => dst.price, x => x.MapFrom(src => src.Price))
             .ForMember(dst => dst.priceamount, x => x.MapFrom(src => src.PriceAmount))
             .ForMember(dst => dst.discount, x => x.MapFrom(src => src.Discount))
             ;

            //mapp ddl
            CreateMap<Category, DDLModel>()
             .ForMember(dst => dst.ID, x => x.MapFrom(src => src.entryid))
             .ForMember(dst => dst.Name, x => x.MapFrom(src => src.entryname))
             ;
            CreateMap<SubCategory, DDLModel>()
             .ForMember(dst => dst.ID, x => x.MapFrom(src => src.entryid))
             .ForMember(dst => dst.Name, x => x.MapFrom(src => src.entryname))
             ;
        }
        
    }
}