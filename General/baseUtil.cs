using System;

namespace YaaranutGisApi.General
{
    public class baseUtil
    {
        static public string GetExceptionmessage(Exception e)
        {
            string Msg;

            Msg = "<Source>" + e.Source + "</Source>" + Environment.NewLine + "<StackTrace>" + System.Web.HttpUtility.HtmlAttributeEncode(e.StackTrace) + "</StackTrace>" + Environment.NewLine + "<Message>" + System.Web.HttpUtility.HtmlAttributeEncode(e.Message) + "</Message>";
            if (e.InnerException != null)
            {

                Msg = Msg + Environment.NewLine + "<InnerException>" + GetExceptionmessage(e.InnerException) + "</InnerException>";
            }

            return Msg;
        }
    }
}
