﻿using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using YaaranutGisApi;

namespace ReverseProxyApplication
{
    public class ReverseProxyMiddleware
    {   
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly RequestDelegate _nextMiddleware;
        private IGisApiHelper GisApiHelper;
        private IHostEnvironment env;
        public ReverseProxyMiddleware(RequestDelegate nextMiddleware)
        {
            _nextMiddleware = nextMiddleware;
        }

        public async Task Invoke(HttpContext context,  IGisApiHelper GisApiHelper, IHostEnvironment env)
        {
            this.GisApiHelper = GisApiHelper;
            this.env = env;
            try
            {
                var targetUri = BuildTargetUri(context.Request);
                
                if (targetUri != null)
                {//פניה ל שרות של ESRI

 
                    var targetRequestMessage = CreateTargetMessage(context, targetUri);

                      

                            using (var responseMessage = await _httpClient.SendAsync(targetRequestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted))
                            {
                                context.Response.StatusCode = (int)responseMessage.StatusCode;
                                CopyFromTargetResponseHeaders(context, responseMessage);
                                if (context.Request.ContentLength != null)
                                {
                                    //string bodyContent = new System.IO.StreamReader(responseMessage.Content.ReadAsStream()).ReadToEnd();
                                    //string bodyContent1 = new System.IO.StreamReader(targetRequestMessage.Content.ReadAsStream()).ReadToEnd();
                                    //string bodyContent2 = new System.IO.StreamReader(responseMessage.RequestMessage.Content.ReadAsStream()).ReadToEnd();
                                }
                                await responseMessage.Content.CopyToAsync(context.Response.Body);
                            }
                        
                    
                    return;
                }
                await _nextMiddleware(context);
            }
            catch (Exception e)
            {
                throw new Exception(YaaranutGisApi.General.baseUtil.GetExceptionmessage(e) );
            }
        }

        private HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri)
        {
            var requestMessage = new HttpRequestMessage();
            CopyFromOriginalRequestContentAndHeaders(context, requestMessage);
            CopyFromOrginalRequestForm(context, requestMessage);
            requestMessage.RequestUri = targetUri;
            requestMessage.Headers.Host = targetUri.Host;
            requestMessage.Method = GetMethod(context.Request.Method);

            
            return requestMessage;
        }

        private void CopyFromOriginalRequestContentAndHeaders(HttpContext context, HttpRequestMessage requestMessage)
        {
            var requestMethod = context.Request.Method;

            if (!HttpMethods.IsGet(requestMethod) &&
              !HttpMethods.IsHead(requestMethod) &&
              !HttpMethods.IsDelete(requestMethod) &&
              !HttpMethods.IsTrace(requestMethod))
            {
                var streamContent = new StreamContent(context.Request.Body);
                requestMessage.Content = streamContent;
            }

            foreach (var header in context.Request.Headers)
            {
                requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }

        private void CopyFromOrginalRequestForm(HttpContext context, HttpRequestMessage requestMessage)
        {
            IList<KeyValuePair<string, string>> formValueCollection = new List<KeyValuePair<string, string>>();

            if (context.Request.Method.ToString() != "GET")
            {
                if (context.Request.ContentLength != null)
                {
                    IFormCollection form;
                    Microsoft.Extensions.Primitives.StringValues kv = "";
                    form = context.Request.Form;

                    foreach (var k in form.Keys)
                    {
                        var v = form.TryGetValue(k, out kv);
                        formValueCollection.Add(new KeyValuePair<string, string>(k, kv.ToString()));
                    }
                    formValueCollection.Add(new KeyValuePair<string, string>("token", this.GisApiHelper.GetToken()));
                }
                requestMessage.Content = new FormUrlEncodedContent(formValueCollection);
            }
        }
        private void CopyFromTargetResponseHeaders(HttpContext context, HttpResponseMessage responseMessage)
        {
            foreach (var header in responseMessage.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in responseMessage.Content.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }
            context.Response.Headers.Remove("transfer-encoding");
        }
        private static HttpMethod GetMethod(string method)
        {
            if (HttpMethods.IsDelete(method)) return HttpMethod.Delete;
            if (HttpMethods.IsGet(method)) return HttpMethod.Get;
            if (HttpMethods.IsHead(method)) return HttpMethod.Head;
            if (HttpMethods.IsOptions(method)) return HttpMethod.Options;
            if (HttpMethods.IsPost(method)) return HttpMethod.Post;
            if (HttpMethods.IsPut(method)) return HttpMethod.Put;
            if (HttpMethods.IsTrace(method)) return HttpMethod.Trace;
            return new HttpMethod(method);
        }

        private Uri BuildTargetUri(HttpRequest request)
        {
            Uri targetUri = null;
            string arcgisServicesUrl;
            //string LayerName,SubLayerNum;
            //            "/utNNrmXb4IZOLXXs/ArcGIS/rest/services/Test_SeedCollect2021/FeatureServer/0/query"
            //if (request.Path.StartsWithSegments("/ArcGIS/rest/services/", out var remainingPath) )
            if (request.Path.Value.IndexOf("/ArcGIS/rest/services/") >= 0)
            {
                //LayerName = request.Path.Value.Substring(request.Path.Value.IndexOf("/ArcGIS/rest/services/") + "/ArcGIS/rest/services/".Length);
                //LayerName = request.Path.Value.Substring(0, request.Path.Value.IndexOf("/FeatureServer/"));
                //SubLayerNum = request.Path.Value.Substring( request.Path.Value.IndexOf("/FeatureServer/")+ "/FeatureServer/".Length);                

                //arcgisServicesUrl = @"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/";
                //arcgisServicesUrl += "Test_";
                //arcgisServicesUrl += LayerName;
                //arcgisServicesUrl += "/FeatureServer/";
                //arcgisServicesUrl += "" + SubLayerNum;
                //arcgisServicesUrl += "/query";
                //arcgisServicesUrl += "&token=" + this.GetToken();

                //targetUri = new Uri("https://services2.arcgis.com/utNNrmXb4IZOLXXs/arcgis/rest/services" + "/" + "Test_SeedCollect2021" + "/FeatureServer/" + 0.ToString() + "/query?token="+ this.GetToken() +"&where=1=1"+ remainingPath);
                //targetUri = new Uri(System.Net.WebUtility.UrlDecode(@"https://services2.arcgis.com" + request.Path + request.QueryString + "&token=" + this.GetToken()));

                var requestArr = request.Path.Value.Split("/");
                if (true || request.Method == "GET")
                {
                    arcgisServicesUrl = @"https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/";
                }
                else
                {
                    arcgisServicesUrl = "http://localhost:27552" + "/ArcGIS/rest/services/KKLForestManagementUnits/FeatureServer/99";
                }
                if (true || !this.env.IsProduction()) arcgisServicesUrl += "Test_";
                arcgisServicesUrl += requestArr[4];     //שם שרות
                arcgisServicesUrl += "/FeatureServer/";
                arcgisServicesUrl += "" + requestArr[6];//שם/מספר שיכבה
                if (requestArr.Length > 7) arcgisServicesUrl += "/" + requestArr[7];
                arcgisServicesUrl += request.QueryString;
                //if (request.QueryString.ToString() == "?f=json")   arcgisServicesUrl += "&token=" + this.GisApiHelper.GetToken();
                if (request.Method == "GET")
                {
                    //if (!arcgisServicesUrl.Contains("?")) arcgisServicesUrl += "?f=json";
                    arcgisServicesUrl += "&token=" + this.GisApiHelper.GetToken();
                }
                targetUri = new Uri(System.Net.WebUtility.UrlDecode(arcgisServicesUrl ));
            }

            //targetUri = new Uri(System.Net.WebUtility.UrlDecode(@"https://services2.arcgis.com" + request.Path + request.QueryString + "&token=" + this.GetToken()));

            return targetUri;
        }
         
    }
}