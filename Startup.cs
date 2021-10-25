using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Description;
using MedaTichnonyWeb.ServerApp.BaseClass;
using MedaTichnonyWeb.ServerApp.LogicsCls;
using MedaTichnonyWeb.ServerApp.Models.Programs;
using MedaTichnonyWeb.ServerApp.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
//using Microsoft.AspNetCore.HttpsPolicy;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.Swagger;
using static MedaTichnonyWeb.Helper;

namespace MedaTichnonyWeb
{
    public class Startup
    {
        public static IConfiguration Configuration { get; set; }
         
        public Startup(IConfiguration configuration)
        {
            Startup.Configuration = configuration;
        }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //DataBaseContext DbContext;

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddScoped<IAppSettings>(_appSettings => appSettings);
            services.AddScoped<IBaseUser, BaseUser>();
            services.AddHttpContextAccessor();
            services.AddScoped<IServiceCollection>(a => services);
            services.AddScoped<IDocumentum , Documentum>() ;
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ILog, Log>();

            services.AddCors(options => options.AddPolicy("CorsAll", builder =>
            {
                builder
                //.AllowCredentials()
            //    .WithOrigins("http://localhost:4200")
            //.SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();

            }));

            services.AddAuthentication( Microsoft.AspNetCore.Server.HttpSys.HttpSysDefaults.AuthenticationScheme);
            // Microsoft.AspNetCore.Server.HttpSys.HttpSysDefaults.AuthenticationScheme IISDefaults.AuthenticationScheme  NegotiateDefaults.AuthenticationScheme).AddNegotiate();


            services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.DictionaryKeyPolicy = null;
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
            });

            services.AddDbContext<DataBaseContext>(options =>
                    options.
                    UseSqlServer(Configuration.GetConnectionString("DataBaseContext"), builder =>
                    {
                       // builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                    }).
                    EnableSensitiveDataLogging(true)
                    );
            var serviceProvider = services.BuildServiceProvider();
             

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.DocumentFilter<SwaggerHideInDocsFilter>();
                c.OperationFilter<SwaggerAddCommonParameOperationFilter>();
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MedaTichnonyWeb", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILog Log)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();                
            }

            

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("v1/swagger.json", "MedaTichnonyWeb v1"));

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsAll");// x => { x.AllowAnyHeader(); x.AllowAnyOrigin(); x.AllowAnyMethod(); });

            //LoggerFactory.AddProvider(new BaseLoggerDatabaseProvider(this.DbContext));

             
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseAppMiddleware();
            //app.Use(async (HttpContext context, Func<Task> next) =>
            //{
            //try
            //{
            //    //if (context.Request.Path == "/ws")
            //    //{
            //    //    context.Response.StatusCode = 400;
            //    //}
            //    //else
            //    //{
            //    //if (env.IsDevelopment())
            //    //{
            //    await next.Invoke();
            //        //}
            //        //else
            //        //{
            //        //var user = (WindowsIdentity)context.User.Identity;
            //        //var user1 = (System.Security.Principal.WindowsIdentity)context.User.Identity;

            //        //PrincipalContext context = new PrincipalContext();
            //        //var contextaaa = Microsoft.AspNetCore.Authentication.PrincipalContext();                             
            //        //var user1 = System.Security.Principal.WindowsIdentity.GetCurrent();

            //        //var newId1 = new WindowsIdentity(user.AccessToken.DangerousGetHandle());
            //        //  var newId = new WindowsIdentity(safeTokenHandle.DangerousGetHandle());

            //        //using (WindowsIdentity newId = new WindowsIdentity(user.AccessToken.DangerousGetHandle()))
            //        //{

            //        //   WindowsIdentity.RunImpersonated(user.AccessToken, () =>
            //        // {
            //        //await next.Invoke();
            //        // });
            //        // }
            //        //}
            //        //}

            //        //if (context.Response.StatusCode == 404 && !context.Request.Path.Value.Contains("/api"))
            //        //{
            //        //    context.Request.Path = new PathString("/index.html");
            //        //    await next.Invoke();
            //        //}
            //    }
            //    catch (Exception e)
            //    {
            //        //Log Lc = new Log(app.ApplicationServices.GetService<DataBaseContext>());

            //        //Lc.Insert("exception", baseUtil.GetExceptionmessage(e), "", Environment.UserName);
            //        Log.Insert("exception", baseUtil.GetExceptionmessage(e), "", Environment.UserName);
            //    }
            //});


       //     app.UseExceptionHandler(
       //    options =>
       //    {
       //        options.Run(
       //            async context =>
       //            {
       //                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
       //                context.Response.ContentType = "text/html";
       //                var ex = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
       //                if (false && ex != null)
       //                {
       //                    var err = $"<h1>Error: {ex.Error.Message}</h1>{ex.Error.StackTrace}";
       //                        //byte[] image = System.Convert.FromBase64String(err);
       //                        byte[] image = System.Web.HttpUtility.UrlEncodeToBytes(err);
       //                    await context.Response.Body.WriteAsync(image, 0, image.Length);
       //                }
       //            });
       //    }
       //);
            
            
            app.UseAuthentication();

            app.UseHsts();
            //app.UseHttpsRedirection();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

            }

            //app.UseSpaStaticFiles();//___DEVELOP
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/azzz", async context =>
                {
                      context.Response.WriteAsync("weather");
                });
   
                endpoints.MapGet("/DocFile/{DocId}/{DocExt}",ProgramMaps.DocGet);
                endpoints.MapGet("/ProgramGisTasrit/{ProgramId}", ProgramMaps.HandleProgramGisTasrit);
                
                
                endpoints.MapControllers();
            });
             
        }

      
    }
}


//[Route("api/[controller]")]
//[EnableCors("CorsAll")]
//[ApiController]
public   class testC_ontroller : Controller
{
    MedaTichnonyWeb.IAppSettings appSettings;
    DataBaseContext DbContext1;
    Microsoft.AspNetCore.Hosting.IWebHostEnvironment env;
    ILog Log;

    public testC_ontroller(MedaTichnonyWeb.IAppSettings appSettings, DataBaseContext DbContext1, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env, ILog Log)
    {
        this.appSettings = appSettings;
        this.DbContext1 = DbContext1;
        this.env = env;
        this.Log = Log;
    }

    [HttpGet]
    public   async Task<string> Test( )
    {
        ProgramTasritFilesController Ptc = new ProgramTasritFilesController(this.appSettings, this.DbContext1, this.env,this.Log);
        List<MapFileModel> Mp = new List<MapFileModel>();
        MapFileModel Mf = new MapFileModel();

        Mf.mapTypeName = MapTypeName.gushim;
        Mf.mapData = Convert.ToBase64String(System.IO.File.ReadAllBytes(@"c:\temp\azzzz.jpg"));
        Mp.Add(Mf);
        Mf.mapTypeName = MapTypeName.yaarNetaAdam;
        Mf.mapData = Convert.ToBase64String(System.IO.File.ReadAllBytes(@"c:\temp\azzzz.jpg"));
        Mp.Add(Mf);

        await Ptc.UploadMapToDocumentom(16198, Mp);
        return "ok";
    }
}

namespace DocumentomWs
{
    public partial class DocumentomSoapClient
    {
        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials)
        {
            //serviceEndpoint.Address =
            //    new System.ServiceModel.EndpointAddress(new System.Uri(MedaTichnonyWeb.Startup.Configuration.GetSection("DocumentomWsUrl").Value),
            //    new System.ServiceModel.DnsEndpointIdentity(""));
            serviceEndpoint.Address = new System.ServiceModel.EndpointAddress(MedaTichnonyWeb.Startup.Configuration.GetSection("DocumentomWsUrl").Value);
        }
    }
}

public class SwaggerAddCommonParameOperationFilter : Swashbuckle.AspNetCore.SwaggerGen.IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var descriptor = context.ApiDescription.ActionDescriptor as ControllerActionDescriptor;

    }
}
public class SwaggerHideInDocsFilter : Swashbuckle.AspNetCore.SwaggerGen.IDocumentFilter
{
    public void Apply(SwaggerDocument swaggerDoc, SchemaRegistry schemaRegistry, IApiExplorer apiExplorer)
    {
        foreach (var apiDescription in apiExplorer.ApiDescriptions)
        {
            var route = "/" + apiDescription.Route.RouteTemplate.TrimEnd('/');
            swaggerDoc.schemes.Remove(route);
        }
    }

    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        Boolean PathRemove = false;
        foreach (var p in swaggerDoc.Paths)
        {            
            switch (p.Key)
            {
                case "/api/GetDataRequest":
                    PathRemove = true;
                    break;
                case "/api/DataPost":
                    PathRemove = true;
                    break;
                case "/api/PostDataRequest":
                    PathRemove = true;
                    break;                    
                default:
                    PathRemove = false;
                    break;
            }
            if (PathRemove) swaggerDoc.Paths.Remove(p.Key);
        }
         
        

    }
}
 
//namespace SecurityWs
//{
//    public partial class SecuritySoapClient
//    {
//        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials)
//        {
//            serviceEndpoint.Address = new System.ServiceModel.EndpointAddress(MedaTichnonyWeb.Startup.Configuration.GetSection("SecurityWsUrl").Value);
//        }
//    }
//}
//namespace VaadotWs
//{
//    public partial class VaadotSoapClient
//    {
//        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials)
//        {
//            serviceEndpoint.Address = new System.ServiceModel.EndpointAddress(MedaTichnonyWeb.Startup.Configuration.GetSection("VaadotWsUrl").Value);
//        }
//    }
//}

