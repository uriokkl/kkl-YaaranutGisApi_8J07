<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HazardController : BaseController
    {
        public HazardController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        //[HttpGet]
        //[Route("GetHazard/{objectid}")]
        //public async Task<ActionResult<IEnumerable<GisDistrictModel.DistrictModel>>> GetHazard(int globalid)
        private GisHazardModel.HazardModel GetHazard(string globalid)
        {
            IList<GisHazardModel.HazardModel> HazardList = new List<GisHazardModel.HazardModel>();

            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "globalid='"+globalid+"'"  },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisHazardModel.HazardModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures< GisHazardModel.HazardModel>("service_9804e1f94e74442fa91c3faaa6c134a7",0, reqparmForest);
            return (GisHazardModel.HazardModel)Gisfeatures.Features;
            //if (Gisfeatures.error == null)
            //{
            //    foreach (var item in Gisfeatures.features)
            //    {
            //        HazardList.Add(item.attributes);
            //    }
            //    return Ok(districts);
            //}
            //else
            //{
            //    return StatusCode(500, Gisfeatures.error.message + " " + Gisfeatures.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            //}
        }
        private GisHazardsInspectionModel.HazardsInspectionModel GetHazardInspection(string globalid)
        {
            IList<GisHazardsInspectionModel.HazardsInspectionModel> HazardList = new List<GisHazardsInspectionModel.HazardsInspectionModel>();
             
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "globalid='"+globalid+"'"  },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisHazardsInspectionModel.HazardsInspectionModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures< GisHazardsInspectionModel.HazardsInspectionModel>("service_9804e1f94e74442fa91c3faaa6c134a7", 1, reqparmForest);
            return (GisHazardsInspectionModel.HazardsInspectionModel)Gisfeatures.Features;
        }

            [HttpPost]
        [Route("UpdateHazardInspection/{globalid}")]
        public async Task<ActionResult<IEnumerable<GisHazardModel.HazardModel>>> UpdateHazardInspection(string globalid)//, HazardDetailModel.HazardModel HazardValue)
        {
            List<GisHazardModel.HazardModel> Hazards = new List<GisHazardModel.HazardModel>();
            GisHazardsInspectionModel.HazardsInspectionModel HazardsInspection;

            HazardsInspection = this.GetHazardInspection(globalid);
            GisHazardModel.HazardModel HazardDetail =   this.GetHazard(HazardsInspection.parentglobalid) ;

            HazardDetail.LastInspectionDate = HazardsInspection.InspectionDate;
            HazardDetail.LastInspectorName = HazardsInspection.InspectorName;
            HazardDetail.HazardIsSevere = HazardsInspection.SevereHazard;
            HazardDetail.HazardInspectionsCount = this.GetHazarInspectionCount(HazardDetail.globalid) + 1;
            HazardDetail.HazardRelatedFeature = (HazardDetail.TS != null & HazardDetail.TS != 0) ? "דרך" : (HazardDetail.Site_Number != null & HazardDetail.Site_Number != 0) ? "אתר קליטת קהל" : "";
            //this.insertUpdateHazardDetail(globalid, HazardDetail);
            //this.InsertHazardsInspection(globalid, new GisHazardsInspectionModel.HazardsInspectionModel() { parentglobalid = HazardDetail.globalid, InspectionDate = InspectionDate, InspectorName = HazardValue.InspectorName, HazardTreatSatus = HazardValue.HazardTreatSatus, SevereHazard = HazardValue.SevereHazard }, InspectionDate);
            Hazards.Add(HazardDetail);
            this.GisApiHelper.UpdateFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Hazards));
            return Ok();
        }

        //[HttpPut]
        //[Route("AddHazard")]
        //public async Task<ActionResult<IEnumerable<GisDistrictModel.DistrictModel>>> AddHazard( HazardDetailModel.HazardModel HazardValue)
        //{
        //    int objectid=0;
        //    long InspectionDate = System.DateTime.Now.Millisecond;
        //    GisHazardModel.HazardModel HazardDetail=null;

        //    objectid = this.insertUpdateHazardDetail(objectid, new GisHazardModel.HazardModel() { objectid = objectid, LastInspectionDate = HazardValue.InspectionDate, LastInspectorName = HazardValue.InspectorName, HazardIsSevere = HazardValue.SevereHazard, HazardInspectionsCount = 1 });
        //    HazardDetail = ((List<GisHazardModel.HazardModel>)((Microsoft.AspNetCore.Mvc.OkObjectResult)this.GetHazard(objectid).Result.Result).Value).First();
        //    this.InsertHazardsInspection(objectid, new GisHazardsInspectionModel.HazardsInspectionModel() {parentglobalid= HazardDetail.globalid, InspectionDate= InspectionDate, InspectorName= HazardValue.InspectorName,HazardTreatSatus= HazardValue.HazardTreatSatus,SevereHazard= HazardValue.SevereHazard}, InspectionDate);
        //    return Ok(@"{""objectid:"""+ objectid.ToString() + "}");
        //}
        //private int i______nsertUpdateHazardDetail(int? objectid, GisHazardModel.HazardModel HazardValue)
        //{
        //    long InspectionDate = System.DateTime.Now.Millisecond;
        //    GisHazardModel Features = new GisHazardModel();
        //    Features.features = new GisHazardModel.Features[1];
        //    Features.features[0] = new GisHazardModel.Features();
        //    Features.features[0].attributes = new GisHazardModel.Attributes();
        //    Features.features[0].attributes.objectid = objectid;
        //    Features.features[0].attributes.LastHazardTreatSatus = HazardValue.LastHazardTreatSatus;
        //    Features.features[0].attributes.LastInspectorName = HazardValue.LastInspectorName;
        //    Features.features[0].attributes.LastInspectionDate = InspectionDate;
        //    Features.features[0].attributes.HazardIsSevere = HazardValue.HazardIsSevere;
        //    Features.features[0].attributes.HazardInspectionsCount = HazardValue.HazardInspectionsCount;
        //    //Features.features[0].attributes.HazardRelatedFeature =
        //    Features.features[0].attributes.HazardRelatedFeature = (HazardValue.TS != null & HazardValue.TS != 0) ? "דרך" : (HazardValue.Site_Number != null & HazardValue.Site_Number != 0) ? "אתר קליטת קהל" : "";
        //    if (objectid == null || objectid == 0)
        //    {
        //        objectid = this.GisApiHelper.InsertFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Features.features)).addResults[0].objectId;
        //    }
        //    else
        //    {
        //        this.GisApiHelper.UpdateFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Features.features));
        //    }
        //    return objectid.Value;
        //}
        //private void I_____nsertHazardsInspection(int objectid, GisHazardsInspectionModel.HazardsInspectionModel HazardInspectionValue,long InspectionDate)
        //{
        //    GisHazardsInspectionModel Features = new GisHazardsInspectionModel();
        //    Features.features = new GisHazardsInspectionModel.Features[1];
        //    Features.features[0] = new GisHazardsInspectionModel.Features();
        //    Features.features[0].attributes = new GisHazardsInspectionModel.Attributes();
        //    Features.features[0].attributes.objectid = objectid;
        //    Features.features[0].attributes.parentglobalid = HazardInspectionValue.parentglobalid;
        //    Features.features[0].attributes.HazardTreatSatus = HazardInspectionValue.HazardTreatSatus;
        //    Features.features[0].attributes.InspectorName = HazardInspectionValue.InspectorName;
        //    Features.features[0].attributes.InspectionDate = InspectionDate;
        //    Features.features[0].attributes.SevereHazard = HazardInspectionValue.SevereHazard;

        //    this.GisApiHelper.InsertFeature("service_9804e1f94e74442fa91c3faaa6c134a7",1, JsonConvert.SerializeObject(Features.features));

        //}
        private int GetHazarInspectionCount(string globalid)
        {
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "parentglobalid='"+globalid.ToString()+"'" },
                    {"returnCountOnly", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"}
                };
            var Gisfeatures = this.GisApiHelper.GetFeatures<string>("service_9804e1f94e74442fa91c3faaa6c134a7", 1, reqparmForest);

            return (int)Newtonsoft.Json.Linq.JObject.Parse(Gisfeatures.Features[0])["count"];
        }
        public class HazardDetailModel// : GisModel
        {
            //public Features[] features { get; set; }
            //public class Features
            //{
            //    public Attributes attributes { get; set; }
            //}
            //public class Attributes : HazardModel
            //{
            //}
            public class HazardModel
            {
                public int? objectid { get; set; }
                public int HazardTreatSatus { get; set; }
                public string InspectorName { get; set; }
                public long? InspectionDate { get; set; }
                public string SevereHazard { get; set; }
            }
        }
        public class GisHazardModel : GisModel
        {
            public Features[] features { get; set; }
            public class Features
            {
                public Attributes attributes { get; set; }
            }
            public class Attributes : HazardModel
            {
            }
            public class HazardModel
            {
                public int? objectid { get; set; }
                public string globalid { get; set; }                
                public string LastHazardTreatSatus { get; set; }
                public string LastInspectorName { get; set; }
                public long? LastInspectionDate { get; set; }
                public string HazardIsSevere { get; set; }
                public int? HazardInspectionsCount { get; set; }
                public string HazardRelatedFeature { get; set; }
                public int? TS { get; set; }
                public int? Site_Number { get; set; }
                public string HazardTypeDescription { get; set; }
            }
        }
        public class GisHazardsInspectionModel : GisModel
        {
            public Features[] features { get; set; }
            public class Features
            {
                public Attributes attributes { get; set; }
            }
            public class Attributes : HazardsInspectionModel
            {
            }
            public class HazardsInspectionModel
            {
                public int? objectid { get; set; }
                public string parentglobalid { get; set; }
                public int HazardTreatSatus { get; set; }
                public string InspectorName { get; set; }
                public long? InspectionDate { get; set; }
                public string SevereHazard { get; set; }
            }
        }
    }
}
=======
﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HazardController : BaseController
    {
        public HazardController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        //[HttpGet]
        //[Route("GetHazard/{objectid}")]
        //public async Task<ActionResult<IEnumerable<GisDistrictModel.DistrictModel>>> GetHazard(int globalid)
        private GisHazardModel.HazardModel GetHazard(string globalid)
        {
            IList<GisHazardModel.HazardModel> HazardList = new List<GisHazardModel.HazardModel>();

            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "globalid='"+globalid+"'"  },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisHazardModel.HazardModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures< GisHazardModel.HazardModel>("service_9804e1f94e74442fa91c3faaa6c134a7",0, reqparmForest);
            return (GisHazardModel.HazardModel)Gisfeatures.Features;
            //if (Gisfeatures.error == null)
            //{
            //    foreach (var item in Gisfeatures.features)
            //    {
            //        HazardList.Add(item.attributes);
            //    }
            //    return Ok(districts);
            //}
            //else
            //{
            //    return StatusCode(500, Gisfeatures.error.message + " " + Gisfeatures.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            //}
        }
        private GisHazardsInspectionModel.HazardsInspectionModel GetHazardInspection(string globalid)
        {
            IList<GisHazardsInspectionModel.HazardsInspectionModel> HazardList = new List<GisHazardsInspectionModel.HazardsInspectionModel>();
             
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "globalid='"+globalid+"'"  },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisHazardsInspectionModel.HazardsInspectionModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures< GisHazardsInspectionModel.HazardsInspectionModel>("service_9804e1f94e74442fa91c3faaa6c134a7", 1, reqparmForest);
            return (GisHazardsInspectionModel.HazardsInspectionModel)Gisfeatures.Features;
        }

            [HttpPost]
        [Route("UpdateHazardInspection/{globalid}")]
        public async Task<ActionResult<IEnumerable<GisHazardModel.HazardModel>>> UpdateHazardInspection(string globalid)//, HazardDetailModel.HazardModel HazardValue)
        {
            List<GisHazardModel.HazardModel> Hazards = new List<GisHazardModel.HazardModel>();
            GisHazardsInspectionModel.HazardsInspectionModel HazardsInspection;

            HazardsInspection = this.GetHazardInspection(globalid);
            GisHazardModel.HazardModel HazardDetail =   this.GetHazard(HazardsInspection.parentglobalid) ;

            HazardDetail.LastInspectionDate = HazardsInspection.InspectionDate;
            HazardDetail.LastInspectorName = HazardsInspection.InspectorName;
            HazardDetail.HazardIsSevere = HazardsInspection.SevereHazard;
            HazardDetail.HazardInspectionsCount = this.GetHazarInspectionCount(HazardDetail.globalid) + 1;
            HazardDetail.HazardRelatedFeature = (HazardDetail.TS != null & HazardDetail.TS != 0) ? "דרך" : (HazardDetail.Site_Number != null & HazardDetail.Site_Number != 0) ? "אתר קליטת קהל" : "";
            //this.insertUpdateHazardDetail(globalid, HazardDetail);
            //this.InsertHazardsInspection(globalid, new GisHazardsInspectionModel.HazardsInspectionModel() { parentglobalid = HazardDetail.globalid, InspectionDate = InspectionDate, InspectorName = HazardValue.InspectorName, HazardTreatSatus = HazardValue.HazardTreatSatus, SevereHazard = HazardValue.SevereHazard }, InspectionDate);
            Hazards.Add(HazardDetail);
            this.GisApiHelper.UpdateFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Hazards));
            return Ok();
        }

        //[HttpPut]
        //[Route("AddHazard")]
        //public async Task<ActionResult<IEnumerable<GisDistrictModel.DistrictModel>>> AddHazard( HazardDetailModel.HazardModel HazardValue)
        //{
        //    int objectid=0;
        //    long InspectionDate = System.DateTime.Now.Millisecond;
        //    GisHazardModel.HazardModel HazardDetail=null;

        //    objectid = this.insertUpdateHazardDetail(objectid, new GisHazardModel.HazardModel() { objectid = objectid, LastInspectionDate = HazardValue.InspectionDate, LastInspectorName = HazardValue.InspectorName, HazardIsSevere = HazardValue.SevereHazard, HazardInspectionsCount = 1 });
        //    HazardDetail = ((List<GisHazardModel.HazardModel>)((Microsoft.AspNetCore.Mvc.OkObjectResult)this.GetHazard(objectid).Result.Result).Value).First();
        //    this.InsertHazardsInspection(objectid, new GisHazardsInspectionModel.HazardsInspectionModel() {parentglobalid= HazardDetail.globalid, InspectionDate= InspectionDate, InspectorName= HazardValue.InspectorName,HazardTreatSatus= HazardValue.HazardTreatSatus,SevereHazard= HazardValue.SevereHazard}, InspectionDate);
        //    return Ok(@"{""objectid:"""+ objectid.ToString() + "}");
        //}
        //private int i______nsertUpdateHazardDetail(int? objectid, GisHazardModel.HazardModel HazardValue)
        //{
        //    long InspectionDate = System.DateTime.Now.Millisecond;
        //    GisHazardModel Features = new GisHazardModel();
        //    Features.features = new GisHazardModel.Features[1];
        //    Features.features[0] = new GisHazardModel.Features();
        //    Features.features[0].attributes = new GisHazardModel.Attributes();
        //    Features.features[0].attributes.objectid = objectid;
        //    Features.features[0].attributes.LastHazardTreatSatus = HazardValue.LastHazardTreatSatus;
        //    Features.features[0].attributes.LastInspectorName = HazardValue.LastInspectorName;
        //    Features.features[0].attributes.LastInspectionDate = InspectionDate;
        //    Features.features[0].attributes.HazardIsSevere = HazardValue.HazardIsSevere;
        //    Features.features[0].attributes.HazardInspectionsCount = HazardValue.HazardInspectionsCount;
        //    //Features.features[0].attributes.HazardRelatedFeature =
        //    Features.features[0].attributes.HazardRelatedFeature = (HazardValue.TS != null & HazardValue.TS != 0) ? "דרך" : (HazardValue.Site_Number != null & HazardValue.Site_Number != 0) ? "אתר קליטת קהל" : "";
        //    if (objectid == null || objectid == 0)
        //    {
        //        objectid = this.GisApiHelper.InsertFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Features.features)).addResults[0].objectId;
        //    }
        //    else
        //    {
        //        this.GisApiHelper.UpdateFeature("service_9804e1f94e74442fa91c3faaa6c134a7", 0, JsonConvert.SerializeObject(Features.features));
        //    }
        //    return objectid.Value;
        //}
        //private void I_____nsertHazardsInspection(int objectid, GisHazardsInspectionModel.HazardsInspectionModel HazardInspectionValue,long InspectionDate)
        //{
        //    GisHazardsInspectionModel Features = new GisHazardsInspectionModel();
        //    Features.features = new GisHazardsInspectionModel.Features[1];
        //    Features.features[0] = new GisHazardsInspectionModel.Features();
        //    Features.features[0].attributes = new GisHazardsInspectionModel.Attributes();
        //    Features.features[0].attributes.objectid = objectid;
        //    Features.features[0].attributes.parentglobalid = HazardInspectionValue.parentglobalid;
        //    Features.features[0].attributes.HazardTreatSatus = HazardInspectionValue.HazardTreatSatus;
        //    Features.features[0].attributes.InspectorName = HazardInspectionValue.InspectorName;
        //    Features.features[0].attributes.InspectionDate = InspectionDate;
        //    Features.features[0].attributes.SevereHazard = HazardInspectionValue.SevereHazard;

        //    this.GisApiHelper.InsertFeature("service_9804e1f94e74442fa91c3faaa6c134a7",1, JsonConvert.SerializeObject(Features.features));

        //}
        private int GetHazarInspectionCount(string globalid)
        {
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "parentglobalid='"+globalid.ToString()+"'" },
                    {"returnCountOnly", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"}
                };
            var Gisfeatures = this.GisApiHelper.GetFeatures<string>("service_9804e1f94e74442fa91c3faaa6c134a7", 1, reqparmForest);

            return (int)Newtonsoft.Json.Linq.JObject.Parse(Gisfeatures.Features[0])["count"];
        }
        public class HazardDetailModel// : GisModel
        {
            //public Features[] features { get; set; }
            //public class Features
            //{
            //    public Attributes attributes { get; set; }
            //}
            //public class Attributes : HazardModel
            //{
            //}
            public class HazardModel
            {
                public int? objectid { get; set; }
                public int HazardTreatSatus { get; set; }
                public string InspectorName { get; set; }
                public long? InspectionDate { get; set; }
                public string SevereHazard { get; set; }
            }
        }
        public class GisHazardModel : GisModel
        {
            public Features[] features { get; set; }
            public class Features
            {
                public Attributes attributes { get; set; }
            }
            public class Attributes : HazardModel
            {
            }
            public class HazardModel
            {
                public int? objectid { get; set; }
                public string globalid { get; set; }                
                public string LastHazardTreatSatus { get; set; }
                public string LastInspectorName { get; set; }
                public long? LastInspectionDate { get; set; }
                public string HazardIsSevere { get; set; }
                public int? HazardInspectionsCount { get; set; }
                public string HazardRelatedFeature { get; set; }
                public int? TS { get; set; }
                public int? Site_Number { get; set; }
                public string HazardTypeDescription { get; set; }
            }
        }
        public class GisHazardsInspectionModel : GisModel
        {
            public Features[] features { get; set; }
            public class Features
            {
                public Attributes attributes { get; set; }
            }
            public class Attributes : HazardsInspectionModel
            {
            }
            public class HazardsInspectionModel
            {
                public int? objectid { get; set; }
                public string parentglobalid { get; set; }
                public int HazardTreatSatus { get; set; }
                public string InspectorName { get; set; }
                public long? InspectionDate { get; set; }
                public string SevereHazard { get; set; }
            }
        }
    }
}
>>>>>>> d1647bf94dd54e593376df04d5bfde8bd46326bf
