using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 

namespace YaaranutGisApi
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        IWebHostEnvironment appEnv;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
             
            services.AddScoped<IAppSettings>(_appSettings => appSettings);
            services.AddScoped<IGisApiHelper, GisApiHelper>();
            
            //services.AddAuthentication(Microsoft.AspNetCore.Server.HttpSys.HttpSysDefaults.AuthenticationScheme);
            services.AddAuthentication(Microsoft.AspNetCore.Server.IISIntegration.IISDefaults.AuthenticationScheme);
            services.AddCors(options => options.AddPolicy("CorsAll", builder =>
            {
                builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
            }));
            
            services.AddControllers()
                .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                
                //options.JsonSerializerOptions.PropertyNamingPolicy = null;
                //options.JsonSerializerOptions.DictionaryKeyPolicy = null;
                //options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
                //// options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.);
            });
            ;
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "שרות גאוגרפי עבור מערכת יערנות",
                    Description = this.appEnv.EnvironmentName

                    //TermsOfService = new Uri("https://example.com/terms"),
                    //Contact = new OpenApiContact
                    //{
                    //    Name = "Example Contact",
                    //    Url = new Uri("https://example.com/contact")
                    //},
                    //License = new OpenApiLicense
                    //{
                    //    Name = "Example License",
                    //    Url = new Uri("https://example.com/license")
                    //}
                }); ;
                c.IncludeXmlComments(@"Documentation.xml", true);
            });



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            this.appEnv = env;
            if (env.IsProduction())
            {
                app.UseSwagger(c =>
                {
                    c.RouteTemplate = "azaz/{documentname}/swagger.json";

                });
                app.UseSwaggerUI(c => {
                    c.RoutePrefix = "azaz";
                    c.SwaggerEndpoint("/azaz/v1/swagger.json", "YaaranutGisApi v1");
                });
            }
            else
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("v1/swagger.json", "YaaranutGisApi v1"));
            }

            //app.UseAppMiddleware();
            app.UseMiddleware<ReverseProxyApplication.ReverseProxyMiddleware>();
            app.UseRouting();
            app.UseCors("CorsAll"); 

            app.UseAuthentication();
            //app.UseAuthorization();
            app.UseHsts();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
