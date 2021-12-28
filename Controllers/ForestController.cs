using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsAll")]
    public class ForestController : BaseController
    {
        public ForestController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        /// <summary>
        /// קבלת רשימת יערות
        /// </summary>
        /// <remarks> מחזיר רשימת יערות כולל מרחב ואזור </remarks>
        [HttpGet]
        [Route("GetForests")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<ForestModel>>> GetForests()
        {
            var reqparmForest = new System.Collections.Specialized.NameValueCollection
                {
                    {"where", "1=1" },
                    {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( ForestModel))},
                    {"returnGeometry", "false"},
                    {"returnExceededLimitFeatures", "true"},
                    {"token", this.GisApiHelper.GetToken()},
                    {"f", "json"},
                    {"geometryType","esriGeometryPoint"},
                };

            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestModel>("JNFILForest", "", reqparmForest);
            if (Gisfeatures.GisAttributes.error == null)
            {
                return Ok(Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }   

    public class ForestModel
    {
        public int? FID { get; set; }
        public int? District_C { get; set; }
        public int Region_Cod { get; set; }
        public int FOR_Num { get; set; }
        public string FOR_Name { get; set; }
    }

    public class GisForestModel1111 : GisModel
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