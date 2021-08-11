using Microsoft.AspNetCore.Mvc;

namespace YaaranutGisApi
{
    public class BaseController: Controller
    {
        public IAppSettings appSettings;
        public IGisApiHelper GisApiHelper;

        public BaseController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper)
        {
            this.appSettings = appSettings;
            this.GisApiHelper = GisApiHelper;
        }

    }
}
