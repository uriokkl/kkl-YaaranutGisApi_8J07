using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForestController : BaseController
    {
        public ForestController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        [HttpGet]
        [Route("GetForests")]
        public async Task<ActionResult<IEnumerable<GisForestModel.ForestModel>>> GetForests()
        {
            IList<GisForestModel.ForestModel> forests = new List<GisForestModel.ForestModel>();

            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "1=1" },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisForestModel.ForestModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = System.Text.Json.JsonSerializer.Deserialize<GisForestModel>(this.GisApiHelper.GetFeatures("JNFILForest",0, reqparmForest));
            if (Gisfeatures.error == null)
            {
                foreach (var item in Gisfeatures.features)
                {
                    forests.Add(item.attributes);
                }

                return Ok(forests);
            }
            else
            {
                return StatusCode(500, Gisfeatures.error.message + " " + Gisfeatures.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class GisForestModel : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : ForestModel
        {
        }
        public class ForestModel
        {
            public int? FID { get; set; }
            public int? District_C { get; set; }
            public int Region_Cod { get; set; }
            public int FOR_Num { get; set; }
            public string FOR_Name { get; set; }
        }
    }
}