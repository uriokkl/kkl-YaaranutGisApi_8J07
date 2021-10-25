using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YaaranutGisApi
{
    public interface IAppSettings
    {
        string GisApiUserName { get; set; }
        string GisApiPassword { get; set; }
        string GisApiTokenUrl { get; set; }
        string GisApiUrl { get; set; }
    }
     
        public class AppSettings : IAppSettings
        {
            public string GisApiUserName { get; set; }
            public string GisApiPassword { get; set; }
            public string GisApiTokenUrl { get; set; }
            public string GisApiUrl { get; set; }
        }
     
}
