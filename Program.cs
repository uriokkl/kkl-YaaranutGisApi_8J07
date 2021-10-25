using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MedaTichnonyWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    //webBuilder.UseStartup<Startup>().UseKestrel(o => { o.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(10); o.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(20);o.Limits.MinResponseDataRate = null; });
                });
    }
}
