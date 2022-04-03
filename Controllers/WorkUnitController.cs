using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using static YaaranutGisApi.GisApiHelper;
//main11122222
namespace YaaranutGisApi.Controllers
{
    public static class pppp  
        {
        public static HttpRequestMessage CreateProxyHttpRequest(this HttpContext context, Uri uri)
        {
            var request = context.Request;

            var requestMessage = new HttpRequestMessage();
            var requestMethod = request.Method;
            if (!HttpMethods.IsGet(requestMethod) &&
                !HttpMethods.IsHead(requestMethod) &&
                !HttpMethods.IsDelete(requestMethod) &&
                !HttpMethods.IsTrace(requestMethod))
            {
                var streamContent = new StreamContent(request.Body);
                requestMessage.Content = streamContent;
            }

            // Copy the request headers
            foreach (var header in request.Headers)
            {
                if (!requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()) && requestMessage.Content != null)
                {
                    requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
                }
            }

            requestMessage.Headers.Host = uri.Authority;
            requestMessage.RequestUri = uri;
            requestMessage.Method = new HttpMethod(request.Method);

            return requestMessage;
        }
        public static async Task CopyProxyHttpResponse(this HttpContext context, HttpResponseMessage responseMessage)
        {

            if (responseMessage == null)
            {
                throw new ArgumentNullException(nameof(responseMessage));
            }

            var response = context.Response;

            response.StatusCode = (int)responseMessage.StatusCode;
            response.StatusCode = 202;
            foreach (var header in responseMessage.Headers)
            {
                response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in responseMessage.Content.Headers)
            {
                response.Headers[header.Key] = header.Value.ToArray();
            }

            // SendAsync removes chunking from the response. This removes the header so it doesn't expect a chunked response.
            response.Headers.Remove("transfer-encoding");
            if (responseMessage.Content.Headers.ContentLength!=null)
            using (var responseStream = await responseMessage.Content.ReadAsStreamAsync())
            {
                //byte[] az = new byte[int.Parse(responseMessage.Content.Headers.ContentLength.ToString())];
                //var azzz=responseStream.Read(az);
                //var str = System.Text.Encoding.GetEncoding(1255).GetString(az);
                //await responseStream.CopyToAsync(response.Body, int.Parse( responseMessage.Content.Headers.ContentLength.ToString()), context.RequestAborted);
                //string html;
                //using (BrotliStream bs = new BrotliStream(responseStream, System.IO.Compression.CompressionMode.Decompress))
                //{
                //    using (System.IO.MemoryStream msOutput = new System.IO.MemoryStream())
                //    {
                //        bs.CopyTo(msOutput);
                //        msOutput.Seek(0, System.IO.SeekOrigin.Begin);
                //        using (StreamReader reader = new StreamReader(msOutput))
                //        {
                //            html = reader.ReadToEnd();
                //        }
                //    }
                //}

                await responseStream.CopyToAsync(response.Body,int.Parse( responseMessage.Content.Headers.ContentLength.ToString()), context.RequestAborted);
            }
        }
    }
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsAll")]
    public class WorkUnitController : BaseGisController
    {
         
        public WorkUnitController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) {   }


        [HttpGet]
        [Route("GetTest")]
        public async Task<IActionResult> Rewrite()
        {
            var _context = HttpContext;
            HttpClient _client;
            _client = new HttpClient(new HttpClientHandler()
            {
                AllowAutoRedirect = false
            });
            var request =pppp.CreateProxyHttpRequest(_context, new Uri("https://services2.arcgis.com/utNNrmXb4IZOLXXs/arcgis/rest/services/Test_HazardInspection_Service/FeatureServer/0/" +   _context.Request.QueryString+"&token="+this.GisApiHelper.GetToken()));
            var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, HttpContext.RequestAborted);
            await pppp.CopyProxyHttpResponse(_context, response);
            //await _context.Response.WriteAsync("azaza");
            return StatusCode(200);
        }

        [HttpGet]
        [Route("GetTest/{id}/query")]
        public async Task<IActionResult> Rewrite1(string id)
        {
            var _context = HttpContext;
            HttpClient _client;
            _client = new HttpClient(new HttpClientHandler()
            {
                AllowAutoRedirect = false
            });
            var request = pppp.CreateProxyHttpRequest(_context, new Uri("https://services2.arcgis.com/utNNrmXb4IZOLXXs/arcgis/rest/services/Test_HazardInspection_Service/FeatureServer/" + id+"/query"  + _context.Request.QueryString + "&token=" + this.GisApiHelper.GetToken()));
            request.Headers.Add("Connection", "Keep-Alive");
            var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, HttpContext.RequestAborted);
            if (response.StatusCode != HttpStatusCode.NotModified)
            {
                await pppp.CopyProxyHttpResponse(_context, response);
                //await _context.Response.WriteAsync("azaza");
                return StatusCode(200);
            }
            else
            {
                return StatusCode(((int)HttpStatusCode.NotModified));
            }
        }


        [HttpGet]
        [Route("GetWorkUnitTipul")]        
        public byte[] GetWorkUnitTipul()
        {

            //IList<WorkUnitModel> WorkUnits = new List<WorkUnitModel>();
            //string queryWhare = "FOR_NO=3303";

            //var reqparmForest = new System.Collections.Specialized.NameValueCollection
            //    {
            //        {"where", queryWhare },
            //        {"outFields", "OBJECTID,FOR_Name,WorkYear,TRTUnit,WPFSRequestStatus,DistrictName,RegionName,FOR_NO,AgeGr,ForAgeComposition,CurForestType,CurDensity,CurCover,ForStatusMain,AreaDesignation,ReqForestType,VegDesignPrinc,ThinningPurpose,OtherThinningPurpose,ThinFreq,ReqDensity,ReqCover,ThinIntensity,ThinType,PruningType,BurnPermission,WPFSWorkEssence"},
            //        {"returnGeometry", "true"},
            //        {"returnExceededLimitFeatures", "true"},
            //        //{"orderByFields", "objectid"},
            //        {"token", this.GisApiHelper.GetToken()},
            //        {"f", "json"},
            //        {"geometryType","esriGeometryPoint"},
            //        {"spatialRel","esriSpatialRelIntersects"}
            //    };

            //var rrr = this.GisApiHelper.GetFeatures("KKLForestManagementUnits", 0, reqparmForest);
            //var Gisfeatures = System.Text.Json.JsonSerializer.Deserialize<GisWorkUnitModel>(rrr);

            //return rrr;
            string responsebodyForest;
            byte[] responsebytesForest;

            var reqparmForest = new System.Collections.Specialized.NameValueCollection {  };
 
            using (WebClient clientForest = new WebClient())
            {
                responsebytesForest = clientForest.UploadValues("https://services2.arcgis.com/utNNrmXb4IZOLXXs/arcgis/rest/services/JNFFieldCenterBuildingsPublicView/FeatureServer/0", "POST", reqparmForest);
                responsebodyForest = Encoding.UTF8.GetString(responsebytesForest);
            }
            //var azz = JsonConvert.DeserializeObject (responsebodyForest);
            //Response.Headers.Add("content-encoding","br");
            Response.Headers.Add("content-disposition","inline;filename=results.pbf");
            //Response.Headers.Add("content-type", "application/x-protobuf");

            return responsebytesForest;
        }
        [HttpGet]
        [Route("CheckTest")]
        public IEnumerable<string> CheckTest()
        {
            string ApiParm;
            ApiParm = @" { ""DistrictName"": ""מרכז"", ""FOR_NO"": null, ""OBJECTID"": null , ""RegionName"": null, ""TRTUnit"": """", ""WorkYear"": """", ""WPFSRequestStatus"": """"}";
            ApiParm = @"{ ""DistrictName"": """" , ""FOR_NO"":  """" , ""OBJECTID"":null, ""RegionName"":""גליל עליון - רמת הגולן"" , ""TRTUnit"": """" , ""WorkYear"":""2020"" , ""WPFSRequestStatus"": ""אושר על ידי מחלקת יער""}";
            var QueryParmeters = System.Text.Json.JsonSerializer.Deserialize<WorkUnitModelQueryParameter>(ApiParm);
            using (var stringContent = new StringContent(ApiParm, System.Text.Encoding.UTF8, "application/json"))
            using (var client = new HttpClient())
            {
                var response = client.PostAsync("http://localhost:27552/WorkUnit/GetWorkUnits", stringContent).Result;
                var listOfWorkUnit = response.Content.ReadAsStringAsync().Result;

            }

            return new string[] { "aaa", "bbb" };
        }

        /// <summary>
        /// קבלת רשימת יחידות עבודה
        /// </summary>
        /// <remarks> מחזיר רשימת יחידות עבודה </remarks>
        [HttpPost]
        [Route("GetWorkUnits")]  
        public async Task<ActionResult<IEnumerable<WorkUnitModel>>> GetWorkUnits(  WorkUnitModelQueryParameter QueryParmeters)
        {
            //var az = @" { ""DistrictName"": null, ""FOR_NO"": null, ""OBJECTID"": null , ""RegionName"": null, ""TRTUnit"": ""T12551"", ""WorkYear"": ""2020"", ""WPFSRequestStatus"": ""אושר על ידי מחלקת יער""} ";
            //QueryParmeters = System.Text.Json.JsonSerializer.Deserialize<WorkUnitModelQueryParameter>(az);
            string queryWhare = "1=1";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.OBJECTID.ToString()) ? " and OBJECTID=" + QueryParmeters.OBJECTID : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.WorkYear) ? " and WorkYear='" + QueryParmeters.WorkYear + "'" : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.WPFSRequestStatus) ? " and WPFSRequestStatus='" + QueryParmeters.WPFSRequestStatus + "'" : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.DistrictName) ? " and DistrictName='" + QueryParmeters.DistrictName + "'" : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.RegionName) ? " and RegionName='" + QueryParmeters.RegionName + "'" : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.FOR_NO) ? " and FOR_NO='" + QueryParmeters.FOR_NO + "'" : "";
            queryWhare += !String.IsNullOrEmpty(QueryParmeters.TRTUNIT) ? " and TRTUNIT='" + QueryParmeters.TRTUNIT + "'" : "";

            var reqparmForest = new System.Collections.Specialized.NameValueCollection { {"where", queryWhare },  {"outFields", "*"}   };
            var Gisfeatures = this.GisApiHelper.GetFeatures<WorkUnitModel>("KKLForestManagementUnits","", reqparmForest);
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
        /// קבלת רשימת יחידות עבודה שעודכנו
        /// </summary>
        /// <remarks> מחזיר רשימת יחידות עבודה שעודכנו </remarks>
        [HttpGet]
        [Route("GetWorkUnitsEdit")]
        public async Task<ActionResult<IEnumerable<WorkUnitModel>>> GetWorkUnitsEdit(DateTime EditDate)
        {
            //var az = @" { ""DistrictName"": null, ""FOR_NO"": null, ""OBJECTID"": null , ""RegionName"": null, ""TRTUnit"": ""T12551"", ""WorkYear"": ""2020"", ""WPFSRequestStatus"": ""אושר על ידי מחלקת יער""} ";
            //QueryParmeters = System.Text.Json.JsonSerializer.Deserialize<WorkUnitModelQueryParameter>(az);
            string queryWhare = "1=1";
            queryWhare = "EditDate >= date'" + EditDate.ToString("yyyy/MM/dd hh:mm:ss") + "'";


            var reqparmForest = new System.Collections.Specialized.NameValueCollection { { "where", queryWhare }, { "outFields", "*" } };
            var Gisfeatures = this.GisApiHelper.GetFeatures<WorkUnitModel>("KKLForestManagementUnits", "", reqparmForest);
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

    public class WorkUnitModel   
    {
        //public int? OBJECTID { get; set; }
        public string GlobalID { get; set; }

        public string FOR_Name { get; set; }
        public int WorkYear { get; set; }
        public string TRTUnit { get; set; }
        public string WPFSRequestStatus { get; set; }
        public string DistrictName { get; set; }
        public string RegionName { get; set; }
        public string FOR_NO { get; set; }
        public string ForAgeComposition { get; set; }
        public string CurForestType { get; set; }
        public string CurDensity { get; set; }
        public string CurCover { get; set; }
        public string ForStatusMain { get; set; }
        public string AreaDesignation { get; set; }
        public string ReqForestType { get; set; }
        public string VegDesignPrinc { get; set; }
        public string ThinningPurpose { get; set; }
        public string OtherThinningPurpose { get; set; }
        public string ThinFreq { get; set; }
        public string ReqDensity { get; set; }
        public string ReqCover { get; set; }
        public string ThinIntensity { get; set; }
        public string ThinType { get; set; }
        public string PruningType { get; set; }
        public string BurnPermission { get; set; }
        public string WPFSWorkEssence { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime Date { get; set; }
        public string ReporterName { get; set; }
        public string TRTPriority { get; set; }
        public string OtherCurForestType { get; set; }
        public string Stands { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime CreationDate { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime EditDate { get; set; }
    }

    public class GisWorkUnitModel11111 : GisModel
    {      
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes:WorkUnitModel
        {            
        }
        public class WorkUnitModel
        {
            //public int? OBJECTID { get; set; }
            public string GlobalID { get; set; }
                     
            public string FOR_Name { get; set; }       
            public int WorkYear { get; set; }
            public string TRTUnit { get; set; }
            public string WPFSRequestStatus { get; set; }
            public string DistrictName { get; set; }
            public string RegionName { get; set; }
            public string FOR_NO { get; set; }
            public string ForAgeComposition { get; set; }
            public string CurForestType { get; set; }
            public string CurDensity { get; set; }
            public string CurCover { get; set; }
            public string ForStatusMain { get; set; }
            public string AreaDesignation { get; set; }
            public string ReqForestType { get; set; }
            public string VegDesignPrinc { get; set; }
            public string ThinningPurpose { get; set; }
            public string OtherThinningPurpose { get; set; }
            public string ThinFreq { get; set; }
            public string ReqDensity { get; set; }
            public string ReqCover { get; set; }
            public string ThinIntensity { get; set; }
            public string ThinType { get; set; }
            public string PruningType { get; set; }
            public string BurnPermission { get; set; }
            public string WPFSWorkEssence { get; set; }
            public string Date { get; set; }
            public string ReporterName { get; set; }
            public string TRTPriority { get; set; }
            public string OtherCurForestType { get; set; }
            public string Stands { get; set; }
        }
    }
    public class WorkUnitModelQueryParameter 
    {
        public int? OBJECTID { get; set; }
        public string WorkYear { get; set; }
        public string WPFSRequestStatus { get; set; }
        public string DistrictName { get; set; }
        public string RegionName { get; set; }
        public string FOR_NO { get; set; }
        public string TRTUNIT { get; set; }

    }
}
