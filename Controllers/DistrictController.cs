using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DistrictController : BaseController
    {
        public DistrictController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        [HttpGet]
        [Route("test")]
        public async Task<ActionResult<string>> test(){
        return Ok("OK OK");
        }
        [HttpGet]
        [Route("GetDistricts")]
        public async Task<ActionResult<IEnumerable<GisDistrictModel.DistrictModel>>> GetDistricts()
        {
            IList<GisDistrictModel.DistrictModel> districts = new List<GisDistrictModel.DistrictModel>();

            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "1=1" },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( GisDistrictModel.DistrictModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = System.Text.Json.JsonSerializer.Deserialize<GisDistrictModel>(this.GisApiHelper.GetFeatures("JNFDistricts",0, reqparmForest));
            if (Gisfeatures.error == null)
            {
                foreach (var item in Gisfeatures.features)
                {
                    districts.Add(item.attributes);
                }
                return Ok(districts);
            }
            else
            {
                return StatusCode(500, Gisfeatures.error.message + " " + Gisfeatures.error.details[0] +" where:"+ reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class GisDistrictModel : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : DistrictModel
        {
        }
        public class DistrictModel
        {
            public int? OBJECTID { get; set; }
            public int merchav_co { get; set; }
            public string merchav_na { get; set; }
        }
    }
}