﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static YaaranutGisApi.GisApiHelper;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsAll")]
    public class SeedController : BaseController
    {
        public SeedController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        [HttpGet]
        [Route("GetSeedsCollect")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<SeedModel>>> GetSeedsCollect(DateTime? FromDate,DateTime?  ToDate)
        {
            string whr = "1=1 ";
            string AttachmentsGlobalIDs = "";
            string token= this.GisApiHelper.GetToken();

            if (FromDate != null) whr += " and EditDate>=date'" + ((DateTime)FromDate).ToString("yyyy/MM/dd hh:mm:ss")+"'";
            if (ToDate != null) whr += " and EditDate<=date'" + ((DateTime)ToDate).ToString("yyyy/MM/dd hh:mm:ss") + "'";
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", whr  },//"OBJECTID=246"
                    {"outFields", "*"},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", token},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };
             
            var Gisfeatures = this.GisApiHelper.GetFeatures< SeedModel>("SeedCollect2021", 0, reqparmForest)  ;
            
            if (Gisfeatures.GisAttributes.error == null)
            {
                foreach (var item in Gisfeatures.Features)
                {
                    if (AttachmentsGlobalIDs != "") AttachmentsGlobalIDs += ",";
                    AttachmentsGlobalIDs += item.GlobalID_2;
                }
                var reqparmAttachments = new System.Collections.Specialized.NameValueCollection
                {
                    {"globalIds", AttachmentsGlobalIDs  }, 
                    {"token", token},
                    {"f", "pjson"} ,
                    {"returnUrl", "true"} ,
                    {"returnCountOnly", "false"}  
                };
                //var GisfeaturesAttachments = JsonConvert.DeserializeObject<GisSeedModel>(this.GisApiHelper.GetFeatureAttachments("SeedCollect2021", 0, reqparmAttachments));
                var GisfeaturesAttachments = this.GisApiHelper.GetFeatureAttachments<GisSeedModel1111>("SeedCollect2021", 0, reqparmAttachments);
                if (GisfeaturesAttachments.error == null)
                {
                    foreach (var attachmentGroups in GisfeaturesAttachments.attachmentGroups)
                    {
                        SeedModel seedRow = ((List<SeedModel>)Gisfeatures.Features).First(r => r.GlobalID_2 == attachmentGroups.parentGlobalId);
                        foreach (var attachmentInfos in attachmentGroups.attachmentInfos)
                        {
                            seedRow.FilesAttachments = new List<FilesAttachments>();
                            seedRow.FilesAttachments.Add(new FilesAttachments() {Url= attachmentInfos.url + "?token=" + token,Type= attachmentInfos.contentType });
                        }
                        
                    }
                }
                    return Ok((List<SeedModel>)Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class SeedModel
    {
        public int? OBJECTID { get; set; }
        public string GlobalID_2 { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime LastPic { get; set; }
        public string LatinNam { get; set; }
        public string HebNic { get; set; }
        public string FamilyHeb { get; set; }
        public string Site { get; set; }
        public string Comments { get; set; }
        public string PicSeason { get; set; }
        public string SiteSize { get; set; }

        public string TreeIDText { get; set; }
        public double? KMHR { get; set; }
        public int? TreeID { get; set; }
        public int Year { get; set; }
        public int? SiteID { get; set; }
        public double? Long { get; set; }
        public double? Lat { get; set; }
        public string Waze { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime CreationDate { get; set; }
        public string Creator { get; set; }
        //[JsonProperty(ItemConverterType = typeof(JavaScriptDateTimeConverter))]
        //[JsonProperty(ItemConverterType = typeof(DateTime))]
        //[JsonProperty(ItemConverterType = typeof(DateTimeOffset))]
        //[JsonConverter(typeof(JavaScriptDateTimeConverter))]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime EditDate { get; set; }
        public string Editor { get; set; }

        public List<FilesAttachments> FilesAttachments { get; set; }

    }
    public class FilesAttachments
    {
        public string Url { get; set; }
        public string Type { get; set; }
    }

    public class GisSeedModel1111 : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : SeedModel
        {
        }
        //[JsonObject(MemberSerialization.OptIn)]
        public class SeedModel
        {
            public int? OBJECTID { get; set; }
            public string GlobalID_2 { get; set; }
            [JsonConverter(typeof(DateTimeConverter))]
            public DateTime LastPic { get; set; }
            public string LatinNam { get; set; }
            public string HebNic { get; set; }
            public string FamilyHeb { get; set; }
            public string Site { get; set; }
            public string Comments { get; set; }
            public string PicSeason { get; set; }
            public string SiteSize { get; set; }

            public string TreeIDText { get; set; }
            public double? KMHR { get; set; }
            public int? TreeID { get; set; }
            public int Year { get; set; }
            public int? SiteID { get; set; }
            public double? Long { get; set; }
            public double? Lat { get; set; }
            public string Waze { get; set; }
            [JsonConverter(typeof(DateTimeConverter))]
            public DateTime CreationDate { get; set; }
            public string Creator { get; set; }
            //[JsonProperty(ItemConverterType = typeof(JavaScriptDateTimeConverter))]
            //[JsonProperty(ItemConverterType = typeof(DateTime))]
            //[JsonProperty(ItemConverterType = typeof(DateTimeOffset))]
            //[JsonConverter(typeof(JavaScriptDateTimeConverter))]
            [JsonConverter(typeof(DateTimeConverter))]
            public DateTime EditDate { get; set; }
            public string Editor { get; set; }

            public List<FilesAttachments> FilesAttachments { get; set; }

        }
        public class FilesAttachments
        {
            public string Url { get; set; }
            public string Type { get; set; }
        }
    }

    
}
