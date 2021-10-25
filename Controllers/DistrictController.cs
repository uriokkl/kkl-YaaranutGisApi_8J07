using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[EnableCors("CorsAll")]
    public class DistrictController : BaseController
    {
        public DistrictController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        [HttpGet]
        [Route("GetDistricts")]
        //[EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<DistrictModel>>> GetDistricts()
        {
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "1=1" },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( DistrictModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures =  this.GisApiHelper.GetFeatures< DistrictModel>("JNFDistricts",0, reqparmForest);
            if (Gisfeatures.GisAttributes.error == null)
            {
                return Ok(Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] +" where:"+ reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class DistrictModel
    {
        public int? OBJECTID { get; set; }
        public int merchav_co { get; set; }
        public string merchav_na { get; set; }
    }

    public class GisDistrictModel11111 : GisModel
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