using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace YaaranutGisApi
{
    public interface IGisApiHelper
    {
        public string GetFeatures(string LayerName,int SubData, System.Collections.Specialized.NameValueCollection ParmQuery);
        public InsertRetModel InsertFeature(string LayerName, int SubData, string UpdateValues);
        public InsertRetModel UpdateFeature(string LayerName, int SubData, string UpdateValues);
        public string GetToken();
    }
    public class GisApiHelper : IGisApiHelper
    {
        IAppSettings appSettings;
        IHostEnvironment env;
        string GisEnvPrefix = "";
        public GisApiHelper(IAppSettings appSettings, IHostEnvironment env)
        {
            this.appSettings = appSettings;
            this.env = env;
            //if (env.IsDevelopment() || env.IsStaging()) this.GisEnvPrefix = "Test_";
        }

        public string GetFeatures(string LayerName, int SubData, System.Collections.Specialized.NameValueCollection ParmQuery)
        {
            string responsebodyForest = "";

            using (WebClient clientForest = new WebClient())
            {
                byte[] responsebytesForest = clientForest.UploadValues(this.appSettings.GisApiUrl + "/" + this.GisEnvPrefix + LayerName.ToString() + "/FeatureServer/" + SubData.ToString() + "/query", "POST", ParmQuery);
                responsebodyForest = Encoding.UTF8.GetString(responsebytesForest);
            }
            return responsebodyForest;
        }
        public InsertRetModel InsertFeature(string LayerName, int SubData, string InsertValues)
        {
            InsertRetModel InsertRet = null;
            string val="";

            using (WebClient client = new WebClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection
                {
                    {"features", InsertValues},
                    {"token", this.GetToken()},
                    {"f", "json"}
                };

                byte[] responsebytes = client.UploadValues(this.appSettings.GisApiUrl + "/" + this.GisEnvPrefix + LayerName.ToString() + "/FeatureServer/" + SubData.ToString() + "/addFeatures", "POST", reqparm);
                string responsebody = Encoding.UTF8.GetString(responsebytes); 
                InsertRet = JsonConvert.DeserializeObject<InsertRetModel>(responsebody);
            }
            return InsertRet;
        }

        public InsertRetModel UpdateFeature(string LayerName, int SubData, string UpdateValues)
        {
            InsertRetModel InsertRet= null;
            //var UpdateValuesDictionary = UpdateValues.AllKeys.ToDictionary(x => x, x => UpdateValues[x]);
            //var UpdateValuesJson = JsonConvert.SerializeObject(UpdateValuesDictionary);

            using (WebClient client = new WebClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection
                {
                    {"features", UpdateValues},
                    {"token", this.GetToken()},
                    {"f", "json"}
                };

                byte[] responsebytes = client.UploadValues(this.appSettings.GisApiUrl + "/" + this.GisEnvPrefix + LayerName.ToString() + "/FeatureServer/"+ SubData.ToString() + "/updateFeatures", "POST", reqparm);
                string responsebody = Encoding.UTF8.GetString(responsebytes);
                InsertRet = JsonConvert.DeserializeObject<InsertRetModel>(responsebody);
            }
            return InsertRet;
        }
        public string GetToken()
        {
            string token = string.Empty;

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            using (WebClient client = new WebClient())
            {
                var reqparm = new System.Collections.Specialized.NameValueCollection
                {
                    {"username",this.appSettings.GisApiUserName },
                    {"password", this.appSettings.GisApiPassword},
                    {"referer", "arcgis.com"},
                    {"expiration", "1440"},
                    {"f", "json"}
                };

                byte[] responsebytes = client.UploadValues(this.appSettings.GisApiTokenUrl, "POST", reqparm);
                string responsebody = Encoding.UTF8.GetString(responsebytes);
                dynamic data = JsonConvert.DeserializeObject(responsebody);

                token = data.token;
            }
            return token;
        }

        public static string GetModelFields(Type T)
        {
            return string.Join(",", T.GetProperties().Select(a => a.Name));
        }
    }

    public class GisErrorModel
    {
        public int code { get; set; }
        public string message { get; set; }
        public string[] details { get; set; }
    }
    public class InsertRetModel
    {
        public addResults[] addResults { get; set; }        
    }
    public class addResults
    {
        public int objectId { get; set; }
        public int uniqueId { get; set; }
        public string globalId { get; set; }
        public bool success { get; set; }
    }
    //    {"addResults":[{"objectId":8700,"uniqueId":8700,"globalId":"B8062064-4A13-4E66-8DA3-E05E92D62DA0","success":true}]}
    public class GisModel
    {
        public GisErrorModel error { get; set; }
        public string objectIdFieldName { get; set; }
        public UniqueIdField uniqueIdField { get; set; }
        public Fields[] fields { get; set; }

    }    
    public class UniqueIdField
    {
        public string name { get; set; }
        public Boolean isSystemMaintained { get; set; }
    }
    public class Fields
    {
        public string name { get; set; }
        public string type { get; set; }
        public string alias { get; set; }
        public string sqlType { get; set; }
        public int length { get; set; }

    }

}
