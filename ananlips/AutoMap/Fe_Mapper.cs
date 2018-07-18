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
                CreateMap<Product, FE_Product>()
                .ForMember(dst => dst.ProductId, x => x.MapFrom(src => src.entryid))
                .ForMember(dst => dst.CategoryId, x => x.MapFrom(src => src.categoryid))
                .ForMember(dst => dst.SubCategoryId, x => x.MapFrom(src => src.subcategoryid))
                .ForMember(dst => dst.ProductName, x => x.MapFrom(src => src.entryname))
                .ForMember(dst => dst.ProductImg, x => x.MapFrom(src => src.defautlimg))
                .ForMember(dst => dst.Discount, x => x.MapFrom(src => src.discount != null ? src.discount*100:0))
                .ForMember(dst => dst.Price, x => x.MapFrom(src => src.price))
                .ForMember(dst => dst.PriceAmount, x => x.MapFrom(src => src.priceamount))
                ;
        }
        
    }
}