using Microsoft.AspNetCore.Mvc;

namespace YaaranutGisApi
{
    public class BaseGisController: Controller
    {
        public IAppSettings appSettings;
        public IGisApiHelper GisApiHelper;

        public BaseGisController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper)
        {
            this.appSettings = appSettings;
            this.GisApiHelper = GisApiHelper;
        }

    }
}
