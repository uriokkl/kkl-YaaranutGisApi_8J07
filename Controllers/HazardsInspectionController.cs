using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    //[ApiController]
    //[Route("[controller]")]
    public class HazardsInspectionController : BaseController
    {
        public HazardsInspectionController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        //[HttpPost]
        //[Route("UpdateHazard/{objectid}")]
        public async Task<ActionResult<IEnumerable<GisHazardsInspectionModel.HazardsInspectionModel>>> InsertHazardsInspection(int objectid,   GisHazardsInspectionModel.HazardsInspectionModel HazardsInspectionValue)
        {
            //var UpdateFeatureLayerData = new System.Collections.Specialized.NameValueCollection
            //    {
            //        {"objectid", objectid.ToString() },
            //        {"LastHazardTreatSatus", HazardsInspectionValue.LastHazardTreatSatus},
            //        {"LastInspectorName", HazardsInspectionValue.LastInspectorName},
            //        {"LastInspectionDate", HazardsInspectionValue.LastInspectionDate.ToString()},
            //        {"HazardIsSevere", HazardsInspectionValue.HazardIsSevere}
            //    };
            GisHazardsInspectionModel Features = new GisHazardsInspectionModel();
            Features.features = new GisHazardsInspectionModel.Features[1];
            Features.features[0] = new GisHazardsInspectionModel.Features();
            Features.features[0].attributes = new GisHazardsInspectionModel.Attributes();
            Features.features[0].attributes.objectid = objectid;
            Features.features[0].attributes.HazardTreatSatus = HazardsInspectionValue.HazardTreatSatus;
            Features.features[0].attributes.InspectorName = HazardsInspectionValue.InspectorName;
            Features.features[0].attributes.InspectionDate = HazardsInspectionValue.InspectionDate;
            Features.features[0].attributes.SevereHazard = HazardsInspectionValue.SevereHazard;
            
            this.GisApiHelper.InsertFeature("Hazard5436456sInspection",1, JsonConvert.SerializeObject(Features.features));
            return null;
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
                public int? globalid { get; set; }
                public int HazardTreatSatus { get; set; }
                public string InspectorName { get; set; }
                public long? InspectionDate { get; set; }
                public string SevereHazard { get; set; }
            }
        }
    }
}
