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

        [HttpPost]
        [Route("GetSubTenderExprtMap/{TenderMapType}")]        
        public async Task<ActionResult<IEnumerable<ForestryTendersModel>>> GetSubTenderExprtMap([FromBody] ForestryTendersParmModel ForestryTendersParm, TenderMapType TenderMapType)
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

            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersModel>("ForestryTenders", 1, reqparmForest);

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
                var GisfeaturesAttachments = this.GisApiHelper.GetFeatureAttachments<GisForestryTendersModel>("ForestryTenders", 1, reqparmAttachments);
                if (GisfeaturesAttachments.error == null)
                {
                    foreach (var attachmentGroups in GisfeaturesAttachments.attachmentGroups)
                    {                        
                        ForestryTendersModel ForestryTender = ((List<ForestryTendersModel>)Gisfeatures.Features).First(r => r.GlobalID == attachmentGroups.parentGlobalId);
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
                return Ok((List<ForestryTendersModel>)Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class ForestryTendersParmModel
    {
        public string TenderName { get; set; }
        public int SubTenderID { get; set; }
        public int SubTenderYear { get; set; }        
    }
    public class ForestryTendersModel
    {
        public int? OBJECTID { get; set; }
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
