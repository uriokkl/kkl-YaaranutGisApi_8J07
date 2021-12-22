using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static YaaranutGisApi.GisApiHelper;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForestryTendersController : BaseController
    {
        public ForestryTendersController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        /// <summary>
        /// קבלת רשימת תיחורים 
        /// </summary>
        /// <remarks>מחזיר רשימת תיחורים  </remarks>
        [HttpPost]
        [Route("GetSubTenderList")]
        public async Task<ActionResult<IEnumerable<SeedModel>>>	GetSubTenderList(string QueryParm)
        {
            string whr = "";

            if (string.IsNullOrWhiteSpace( QueryParm) )
            {
                whr = "1=1";
            }
            else if (int.TryParse(QueryParm, out _))
            {
                whr = "TenderID like '%" + QueryParm + "%' or SubTenderID=" + QueryParm + " or  SubTenderYear=" + QueryParm;
            }
            else 
            {
                QueryParm = QueryParm.Replace("'", "''");
                whr = "TenderID like '%" + QueryParm + "%' or SubTenderName like '%" + QueryParm + "%' or STDistrictName like '%" + QueryParm + "%' or STRegionName like '%" + QueryParm + "%' or STStageStatus like '%" + QueryParm + "%'";
            }
            
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", whr  },
                    {"outFields", "*"},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersModel>("ForestryTenders", "SubTenders", reqparmForest);
            if (Gisfeatures.GisAttributes.error == null)
            {
                return Ok(Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }

        /// <summary>
        /// קבלת קובץ תיחור 
        /// </summary>
        /// <remarks>מחזיר כתובת של קובץ תיור  </remarks>
        [HttpPost]
        [Route("GetSubTenderExprtMap/{TenderMapType}")]        
        public async Task<ActionResult<IEnumerable<ForestryTendersMapModel>>> GetSubTenderExprtMap([FromBody] ForestryTendersMapParmModel ForestryTendersParm, TenderMapType TenderMapType)
        {
            string whr = "";
            string AttachmentsGlobalID = "";
            string token = this.GisApiHelper.GetToken();

            whr = "TenderName='" +  ( ForestryTendersParm.TenderName) + "' and SubTenderID="+ ForestryTendersParm.SubTenderID.ToString() + " and SubTenderYear=" + ForestryTendersParm.SubTenderYear.ToString();
            //whr = "SubTenderID=" + SubTenderID.ToString() + " and SubTenderYear=" + ForestryTendersParm.SubTenderYear.ToString();
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", whr  }, 
                    {"outFields", "*"},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", token},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersMapModel>("ForestryTenders", "SubTenders", reqparmForest);

            if (Gisfeatures.GisAttributes.error == null)
            {
                AttachmentsGlobalID = Gisfeatures.Features.First().GlobalID;                
                var reqparmAttachments = new System.Collections.Specialized.NameValueCollection
                {
                    {"globalIds", AttachmentsGlobalID  },
                    {"token", token},
                    {"f", "pjson"} ,
                    {"returnUrl", "true"} ,
                    {"returnCountOnly", "false"}
                };
                var GisfeaturesAttachments = this.GisApiHelper.GetFeatureAttachments<GisForestryTendersModel>("ForestryTenders", "SubTenders", reqparmAttachments);
                if (GisfeaturesAttachments.error == null)
                {
                    foreach (var attachmentGroups in GisfeaturesAttachments.attachmentGroups)
                    {
                        ForestryTendersMapModel ForestryTender = ((List<ForestryTendersMapModel>)Gisfeatures.Features).First(r => r.GlobalID == attachmentGroups.parentGlobalId);
                        foreach (var attachmentInfos in attachmentGroups.attachmentInfos)
                        {
                            if (TenderMapType==TenderMapType.Maps &&  attachmentInfos.Name.Contains("מפות תיחור"))
                            {
                                ForestryTender.FilesAttachments = new List<FilesAttachments>();
                                ForestryTender.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType,Name= attachmentInfos.Name });
                            }
                        }

                    }
                }
                return Ok((List<ForestryTendersMapModel>)Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class ForestryTendersParmModel
    {
        public string FreeText { get; set; }
        public int TenderID { get; set; }
        public int SubTenderID { get; set; }
        public int SubTenderYear { get; set; }
    }
    public class ForestryTendersModel
    {
        public string GlobalID { get; set; }
        public string TenderID { get; set; }
        public int SubTenderYear { get; set; }
        public string SubTenderID { get; set; }
        public string SubTenderName { get; set; }
        public string STDistrictName { get; set; }
        public string STRegionName { get; set; }
        public string STStageStatus { get; set; }
    }

    public class ForestryTendersMapParmModel
    {
        public string TenderName { get; set; }
        public int SubTenderID { get; set; }
        public int SubTenderYear { get; set; }
    }
    public class ForestryTendersMapModel
    {
        public string GlobalID { get; set; }       
        public List<FilesAttachments> FilesAttachments { get; set; }

    }
    public class GisForestryTendersModel : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : ForestryTendersModel
        {
        }        
        public class ForestryTendersModel
        {
            public int? OBJECTID { get; set; }
            public string GlobalID { get; set; }
            public string Name { get; set; }            
            public List<FilesAttachments> FilesAttachments { get; set; }
        }
        public class FilesAttachments
        {
            public string Url { get; set; }
            public string Type { get; set; }            
        }
    }

     
    public enum TenderMapType
    {
        Maps 
    }
}
