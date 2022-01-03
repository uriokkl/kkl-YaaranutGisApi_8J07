using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YaaranutGisApi.Controllers
{
    [ApiController]     
    [Route("[controller]")]
    [EnableCors("CorsAll")]
    public class RegionController : BaseGisController
    {        
        public RegionController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        /// <summary>
        /// קבלת רשימת אזורים
        /// </summary>
        /// <remarks> מחזיר רשימת אזורים כולל מרחב </remarks>
        [HttpGet]
        [Route("GetRegions")]
        [EnableCors("CorsAll")]
        public async Task<ActionResult<IEnumerable<RegionModel>>> GetRegions()
        {
            var reqparmForest = new System.Collections.Specialized.NameValueCollection { {"where", "1=1" }, {"outFields", YaaranutGisApi.GisApiHelper.GetModelFields(typeof( RegionModel))} };
            var Gisfeatures = this.GisApiHelper.GetFeatures< RegionModel>("JNFRegions","", reqparmForest);
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

    public class RegionModel
    {
        public int? OBJECTID { get; set; }
        public int merchav_co { get; set; }
        public int ezor_code { get; set; }
        public string ezor_name { get; set; }
    }

    public class GisRegionModel1111 : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : RegionModel
        {
        }
        public class RegionModel
        {
            public int? OBJECTID { get; set; }
            public int merchav_co { get; set; }
            public int ezor_code { get; set; }
            public string ezor_name { get; set; }
        }
    }
}