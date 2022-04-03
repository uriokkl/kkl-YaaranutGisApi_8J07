using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
//using Newtonsoft.Json.Converters;
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
    public class SeedController : BaseGisController
    {
        public SeedController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        /// <summary>
        /// קבלת רשימה של פרטי איסוף זרעים לפי טקסט חופשי
        /// </summary>
        /// <remarks>מחזיר רשימה של פרטי איסוף זרעים לפי טקסט חופשי   </remarks>
        [HttpGet]
        [Route("GetSeedsCollects")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<SeedModel>>> GetSeedsCollects(string QueryStr)
        {
            string whr = "";

            try
            {
                if (!string.IsNullOrWhiteSpace(QueryStr))
                {
                    QueryStr = QueryStr.Replace("'", "''");
                    whr += "LatinNam like '%" + QueryStr + "%'";
                    whr += " or HebNic like '%" + QueryStr + "%'";
                    whr += " or FamilyHeb like '%" + QueryStr + "%'";
                    whr += " or Site like '%" + QueryStr + "%'";
                    whr += " or Comments like '%" + QueryStr + "%'";
                    whr += " or TreeIDText like '%" + QueryStr + "%'";
                    whr += " or Creator like '%" + QueryStr + "%'";
                    whr += " or Editor like '%" + QueryStr + "%'";
                }
                else
                {
                    whr = "1=1";
                }
                return Ok((List<SeedModel>)this.SearchSeedsCollects(whr));
            }
            catch (Exception ex)
            {
                return StatusCode(500, General.baseUtil.GetExceptionmessage(ex));
            }

        }

        /// <summary>
        /// קבלת רשימה של פרטי איסוף זרעים לפי תאריכים
        /// </summary>
        /// <remarks>מחזיר רשימה של פרטי איסוף זרעים לפי תאריכים   </remarks>
        [HttpGet]
        [Route("GetSeedsCollectsDateRange")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<SeedModel>>> GetSeedsCollectsDateRange(DateTime? FromDate, DateTime? ToDate)
        {
            string whr = "";

            try
            {
                if (FromDate != null) whr += "EditDate>=date'" + ((DateTime)FromDate).ToString("yyyy/MM/dd hh:mm:ss") + "'";
                if (ToDate != null) whr += " and EditDate<=date'" + ((DateTime)ToDate).ToString("yyyy/MM/dd hh:mm:ss") + "'";

                return Ok((List<SeedModel>)this.SearchSeedsCollects(whr));
            }
            catch (Exception ex)
            {
                return StatusCode(500, General.baseUtil.GetExceptionmessage(ex));
            }

        }

        /// <summary>
        /// קבלת פרטי איסוף זרעים מסויים
        /// </summary>
        /// <remarks>GlobalID_2 מחזיר פרטי איסוף זרעים לפי </remarks>
        [HttpGet]
        [Route("GetSeedsCollect")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<SeedModel>>> GetSeedsCollect(string GlobalID)
        {
            string whr = "";

            try
            {
                whr += "GlobalID_2 = '" + GlobalID + "'";

                return Ok((List<SeedModel>)this.SearchSeedsCollects(whr));
            }
            catch (Exception ex)
            {
                return StatusCode(500, General.baseUtil.GetExceptionmessage(ex));
            }

        }

        /// <summary>
        /// מחיקת רשומת פרטי איסוף זרעים מסויים
        /// </summary>
        /// <remarks>GlobalID_2 ו OBJECTID מוחק רשומת פרטי איסוף זרעים לפי </remarks>
        [HttpDelete]
        [Route("DeleteSeedsCollect")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<string>> DeleteSeedsCollect(string GlobalID_2,string OBJECTID)
        {
            string whr = "";
            string errDescription="", errGlobalId="";
            try
            {
                whr += "GlobalID_2 = '" + GlobalID_2 + "'";
                var GisSeedfeatures = this.GisApiHelper.DeleteFeature("SeedCollect2021", "", OBJECTID, whr);
                if (GisSeedfeatures.error==null )
                {
                    if (GisSeedfeatures.DeleteResults.Count() > 0)
                        return "ok";
                    else
                        return Problem(statusCode:400, detail: "record not found: GlobalID_2=" + GlobalID_2, type: "record not found");
                }
                else
                {
                    if (GisSeedfeatures.DeleteResults != null)
                    {
                        errDescription = string.Join(",", GisSeedfeatures.DeleteResults.Where(f => !f.success).Select(f => f.error.description));
                        errGlobalId = string.Join(",", GisSeedfeatures.DeleteResults.Where(f => !f.success).Select(f => f.globalId));
                    }
                    return Problem(detail: GisSeedfeatures.error.message + " " + GisSeedfeatures.error.details[0] + "  " + errDescription + " " + errGlobalId + " where:" + GlobalID_2, type:"gis error ");

                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, General.baseUtil.GetExceptionmessage(ex));
            }

        }

        internal IEnumerable<SeedModel> SearchSeedsCollects(string whr)
        {
            string az = "";
            string AttachmentsGlobalIDs = "";
            string token = this.GisApiHelper.GetToken();

            var reqparmForest = new System.Collections.Specialized.NameValueCollection { { "where", whr } };
            var GisSeedfeatures = this.GisApiHelper.GetFeatures<SeedModel>("SeedCollect2021", "", reqparmForest);
            var StatusDomain = GisSeedfeatures.GisAttributes.fields.Where(f => f.name == "Status").First().domain.codedValues;
            var CollectorDomain = GisSeedfeatures.GisAttributes.fields.Where(f => f.name == "Collector").First().domain.codedValues;
            var DiaryEditorIDDomain = GisSeedfeatures.GisAttributes.fields.Where(f => f.name == "DiaryEditorID").First().domain.codedValues;
            var PlantIDDomain = GisSeedfeatures.GisAttributes.fields.Where(f => f.name == "PlantID").First().domain.codedValues;
            //var POSITIONSOURCETYPEDomain = GisSeedfeatures.GisAttributes.fields.Where(f => f.name == "ESRIGNSS_POSITIONSOURCETYPE").First().domain.codedValues; 
            if (GisSeedfeatures.GisAttributes.error == null)
            {
                foreach (var item in GisSeedfeatures.Features)
                {
                    try
                    {
                        
                    if (item.Status.Status != null) item.Status.StatusName = StatusDomain.Where(f => f.code == item.Status.Status.ToString()).First().name;
                        if (item.Collector != null) item.CollectorName = CollectorDomain.Where(f => f.code == item.Collector).First().name;
                        if (item.DiaryEditorID != null) item.DiaryEditorName = DiaryEditorIDDomain.Where(f => f.code == item.DiaryEditorID.ToString()).First().name;
                        if (item.PlantID != null) item.PlantName = PlantIDDomain.Where(f => f.code == item.PlantID.ToString()).First().name;
                        //if (item.ESRIGNSS_POSITIONSOURCETYPE != null) item.ESRIGNSS_POSITIONSOURCETYPE_NAME = PlantIDDomain.Where(f => f.code == item.ESRIGNSS_POSITIONSOURCETYPE.ToString()).First().name;
                    }
                    catch (Exception ex)
                    {

                    }

                    //var serialized = JsonConvert.SerializeObject(item);
                    //Seedfeatures = JsonConvert.DeserializeObject<IEnumerable<SeedModel>>(serialized);

                    //item.Status = new SeedStatusModel();
                    //item.Status.StatusName = item.Status;
                    //item.Status.StatusName = "";

                    if (AttachmentsGlobalIDs != "") AttachmentsGlobalIDs += ",";
                    AttachmentsGlobalIDs += item.GlobalID_2;
                }
                var reqparmAttachments = new System.Collections.Specialized.NameValueCollection { {"globalIds", AttachmentsGlobalIDs  }, {"returnUrl", "true"} ,       {"returnCountOnly", "false"}}; 
                var GisfeaturesAttachments = this.GisApiHelper.GetFeatureAttachments<GisSeedModeAttach>("SeedCollect2021", "", reqparmAttachments);
                if (GisfeaturesAttachments.error == null)
                {
                    foreach (var attachmentGroups in GisfeaturesAttachments.attachmentGroups)
                    {
                        SeedModel seedRow = ((List<SeedModel>)GisSeedfeatures.Features).First(r => r.GlobalID_2 == attachmentGroups.parentGlobalId);
                        foreach (var attachmentInfos in attachmentGroups.attachmentInfos)
                        {
                            seedRow.FilesAttachments = new List<FilesAttachments>();
                            seedRow.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType, Name = attachmentInfos.Name });
                        }

                    }
                }
                return GisSeedfeatures.Features;
            }
            else
            {
                throw new Exception(GisSeedfeatures.GisAttributes.error.message + " " + GisSeedfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    //public class SeedModel:SeedBaseModel
    //{
    //    public SeedStatusModel Status { get; set; }
    //}
    //public class SeedGisModel : SeedBaseModel
    //{
    //    [JsonConverter(typeof(DomainConverter))]
    //    //public string Status { get; set; }        
    //    public SeedStatusModel Status { get; set; }
    //}
    public class SeedModel
    {
        public int? OBJECTID { get; set; }
        public string GlobalID_2 { get; set; }
        [JsonConverter(typeof(DomainConverter))]
        public SeedStatusModel Status { get; set; }
        public int? PlantID { get; set; }
        public string PlantName { get; set; }
        public int? SiteID { get; set; }
        public string Site { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? LastPic { get; set; }
        public string Collector { get; set; }
        public string CollectorName { get; set; }
        public int? DiaryEditorID { get; set; }
        public string DiaryEditorName { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? DiaryDate { get; set; }
        public string Comments { get; set; }
        public decimal? FruitsKg { get; set; }
        public int? BagsNum { get; set; }
        public decimal? SeedsKg { get; set; }
        public int? SeedsWeight { get; set; }
        public int? SeedAmount { get; set; }
        public int? SeedsFor100g { get; set; }
        public string SiteSize { get; set; }
        public int? TreeID { get; set; }
        public string TreeIDText { get; set; }        
        public int? ESRIGNSS_POSITIONSOURCETYPE { get; set; }
        //public string ESRIGNSS_POSITIONSOURCETYPE_NAME { get; set; }
        public string PhotosAndFiles { get; set; }



        public string LatinNam { get; set; }
        public string HebNic { get; set; }
        public string FamilyHeb { get; set; }


        public string PicSeason { get; set; }
        public double? KMHR { get; set; }
        public int Year { get; set; }
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

    public class SeedStatusModel
        {
        public Int64? Status { get; set; }
        public string StatusName { get; set; }
    }

    public class GisSeedModeAttach : GisModel
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
