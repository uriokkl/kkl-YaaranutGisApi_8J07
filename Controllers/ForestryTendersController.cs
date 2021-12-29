using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
//using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
//using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static YaaranutGisApi.GisApiHelper;

namespace YaaranutGisApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForestryTendersController : BaseController
    {
        public ForestryTendersController(YaaranutGisApi.IAppSettings appSettings, IGisApiHelper GisApiHelper) : base(appSettings, GisApiHelper) { }

        /// <summary>
        /// קבלת רשימת תיחורים 
        /// </summary>
        /// <remarks>מחזיר רשימת תיחורים  </remarks>
        [HttpPost]
        [Route("GetSubTendersList")]
        public async Task<ActionResult<IEnumerable<ForestryTendersModel>>>	GetSubTendersList(string QueryParm)
        {
            string whr = "";

            if (string.IsNullOrWhiteSpace( QueryParm) )
            {
                whr = "1=1";
            }
            else if (int.TryParse(QueryParm, out _))
            {
                whr = "TenderID like '%" + QueryParm + "%' or SubTenderID=" + QueryParm + " or  SubTenderYear=" + QueryParm;
            }
            else 
            {
                QueryParm = QueryParm.Replace("'", "''");
                whr = "TenderID like '%" + QueryParm + "%' or SubTenderName like '%" + QueryParm + "%' or STDistrictName like '%" + QueryParm + "%' or STRegionName like '%" + QueryParm + "%' or STStageStatus like '%" + QueryParm + "%'";
            }
            
            var reqparmForest = new System.Collections.Specialized.NameValueCollection {{"where", whr  }};
            
            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersModel>("ForestryTenders", "SubTenders", reqparmForest);
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
        /// קבלת פרטי תיחור 
        /// </summary>
        /// <remarks>מחזיר פרטי תיחור  </remarks>
        [HttpPost]
        [Route("GetSubTenderDetail")]
        public async Task<ActionResult<IEnumerable<ForestryTendersModel>>> GetSubTenderList(string GlobalID)
        {
            string whr = "";

            whr = "GlobalID = '" + GlobalID + "'";

            var reqparmForest = new System.Collections.Specialized.NameValueCollection { { "where", whr } };
            //הבאת רשומת תיחור
            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersModel>("ForestryTenders", "SubTenders", reqparmForest);
            if (Gisfeatures.GisAttributes.error == null)
            {
                var StatusDomain = Gisfeatures.GisAttributes.fields.Where(f => f.name == "STStageStatus").First().domain.codedValues;
                foreach (var feature in Gisfeatures.Features)
                {
                    if (feature.STStageStatus.STStageStatus != null) feature.STStageStatus.STStageStatusName = StatusDomain.Where(f => f.code == feature.STStageStatus.STStageStatus.ToString()).First().name;

                    {
                        var SubWorkUnitsReqparmForest = new System.Collections.Specialized.NameValueCollection { {"objectIds", feature.OBJECTID  }, {"relationshipId", "1"  }, };
                        var SubWorkUnitsFeatures = this.GisApiHelper.GetRelatedFeatures<ForestryTendersWorkUnitsModel>("ForestryTenders", "SubTenders", SubWorkUnitsReqparmForest);
                        feature.ForestryTendersManas = (ForestryTendersWorkUnitsModel[])SubWorkUnitsFeatures.Features.ToArray<ForestryTendersWorkUnitsModel>();
                        
                        string SubWorkUnitsFeaturesobjectIds  = String.Join(",", feature.ForestryTendersManas.Select(r => r.OBJECTID));
                        
                        var SubWorkUnitStandsReqparmForest = new System.Collections.Specialized.NameValueCollection { {"objectIds", SubWorkUnitsFeaturesobjectIds  },  {"relationshipId", "3"  } };
                        var SubWorkUnitStandsFeatures = this.GisApiHelper.GetRelatedFeatures<ForestryTendersWorkUnitsStandsModel>("ForestryTenders", "SubWorkUnits", SubWorkUnitStandsReqparmForest);

                        var ForestryTendersInvasiveSpTreatmentsParm = new System.Collections.Specialized.NameValueCollection { {"objectIds",string.Join("," ,SubWorkUnitsFeaturesobjectIds) }, {"relationshipId", "4"  } };
                        var InvasiveSpTreatmentsFeatures = this.GisApiHelper.GetRelatedFeatures<ForestryTendersInvasiveSpTreatmentsModel>("ForestryTenders", "SubWorkUnits", ForestryTendersInvasiveSpTreatmentsParm);

                        var ForestryTendersStandActivitiesParm = new System.Collections.Specialized.NameValueCollection { {"objectIds",string.Join("," ,SubWorkUnitStandsFeatures.Features.Select(f=>f.OBJECTID))  },{"relationshipId", "7"  } };
                        var StandActivitiesFeatures = this.GisApiHelper.GetRelatedFeatures<ForestryTendersStandActivitiesModel>("ForestryTenders", "SubWorkUnitStands", ForestryTendersStandActivitiesParm);
                        
                        feature.WoodVolumeForSubTender = SubWorkUnitStandsFeatures.Features.Select(r => r.EstimatedWorkVolumeCubicMeter).Sum();

                        foreach (var SubWorkUnitsFeature in SubWorkUnitsFeatures.Features)
                        {                            
                            SubWorkUnitsFeature.StandDetails = (ForestryTendersWorkUnitsStandsModel[])SubWorkUnitStandsFeatures.Features.Where(r=>r.ManaParentGlobalID == SubWorkUnitsFeature.GlobalID).ToArray<ForestryTendersWorkUnitsStandsModel>() ;
                            SubWorkUnitsFeature.HelkaForMana = String.Join(",", SubWorkUnitsFeature.StandDetails.Select(r => r.StandHELKA));
                            SubWorkUnitsFeature.StandForMana = String.Join(",", SubWorkUnitsFeature.StandDetails.Select(r => r.STAND));
                            SubWorkUnitsFeature.StandCoverTypeForMana = String.Join(",", SubWorkUnitsFeature.StandDetails.Where(r => !string.IsNullOrWhiteSpace(r.StandCoverType)).Select(r => r.StandCoverType));
                            SubWorkUnitsFeature.WoodVolumeForMana = SubWorkUnitsFeature.StandDetails.Select(r => r.EstimatedWorkVolumeCubicMeter).Sum();
                            SubWorkUnitsFeature.ISTPlantSpForMana = String.Join(",", InvasiveSpTreatmentsFeatures.Features.Where(r => !string.IsNullOrWhiteSpace(r.ISTPlantSp)).Select(r => r.ISTPlantSp));
                            SubWorkUnitsFeature.ISTTreatmentTypeForMana  = String.Join(",", InvasiveSpTreatmentsFeatures.Features.Where(r=> !string.IsNullOrWhiteSpace(r.ISTTreatmentType)).Select(r => r.ISTTreatmentType));
                        }
                        foreach (var UnitStandsFeature in SubWorkUnitStandsFeatures.Features)
                        {
                            UnitStandsFeature.ActivityType = String.Join(",", StandActivitiesFeatures.Features.Where(r => !string.IsNullOrWhiteSpace(r.ActivityType)).Select(r => r.ActivityType));
                            UnitStandsFeature.ActivityDetails = (ForestryTendersStandActivitiesModel[])StandActivitiesFeatures.Features.Where(r=>r.ActivityParentGlobalID== UnitStandsFeature.GlobalID).ToArray<ForestryTendersStandActivitiesModel>();
                            
                        }
                        
                    }
                }
                return Ok(Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }

        /// <summary>
        /// קבלת קובץ תיחור 
        /// </summary>
        /// <remarks>מחזיר כתובת של קובץ תיור  </remarks>
        [HttpPost]
        [Route("TenderGetDoc/{TenderMapType}")]        
        public async Task<ActionResult<IEnumerable<ForestryTendersMapModel>>> TenderGetDoc([FromBody] ForestryTendersMapParmModel ForestryTendersParm, TenderMapType TenderMapType)
        {
            string whr = "";
            string AttachmentsGlobalID = "";
            string token = this.GisApiHelper.GetToken();

            whr = "TenderName='" +  ( ForestryTendersParm.TenderName) + "' and SubTenderID="+ ForestryTendersParm.SubTenderID.ToString() + " and SubTenderYear=" + ForestryTendersParm.SubTenderYear.ToString();
            //whr = "SubTenderID=" + SubTenderID.ToString() + " and SubTenderYear=" + ForestryTendersParm.SubTenderYear.ToString();
            var reqparmForest = new System.Collections.Specialized.NameValueCollection { { "where", whr } };
            var Gisfeatures = this.GisApiHelper.GetFeatures<ForestryTendersMapModel>("ForestryTenders", "SubTenders", reqparmForest);

            if (Gisfeatures.GisAttributes.error == null)
            {
                AttachmentsGlobalID = Gisfeatures.Features.First().GlobalID;
                var reqparmAttachments = new System.Collections.Specialized.NameValueCollection { { "globalIds", AttachmentsGlobalID } };
                var GisfeaturesAttachments = this.GisApiHelper.GetFeatureAttachments<GisForestryTendersModel>("ForestryTenders", "SubTenders", reqparmAttachments);
                if (GisfeaturesAttachments.error == null)
                {
                    foreach (var attachmentGroups in GisfeaturesAttachments.attachmentGroups)
                    {
                        ForestryTendersMapModel ForestryTender = ((List<ForestryTendersMapModel>)Gisfeatures.Features).First(r => r.GlobalID == attachmentGroups.parentGlobalId);
                        foreach (var attachmentInfos in attachmentGroups.attachmentInfos)
                        {
                            if (TenderMapType==TenderMapType.Maps &&  attachmentInfos.Name.Contains("מפות תיחור"))
                            {
                                ForestryTender.FilesAttachments = new List<FilesAttachments>();
                                ForestryTender.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType,Name= attachmentInfos.Name });
                            }
                            else if (TenderMapType == TenderMapType.ContractorGuidelines && attachmentInfos.Name.Contains("ContractorGuidelines"))
                            {
                                ForestryTender.FilesAttachments = new List<FilesAttachments>();
                                ForestryTender.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType, Name = attachmentInfos.Name });
                            }
                            else if (TenderMapType == TenderMapType.Quotation && attachmentInfos.Name.Contains("Quotation"))
                            {
                                ForestryTender.FilesAttachments = new List<FilesAttachments>();
                                ForestryTender.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType, Name = attachmentInfos.Name });
                            }
                            else if (TenderMapType == TenderMapType.WorkCapacity && attachmentInfos.Name.Contains("WorkCapacity"))
                            {
                                ForestryTender.FilesAttachments = new List<FilesAttachments>();
                                ForestryTender.FilesAttachments.Add(new FilesAttachments() { Url = attachmentInfos.url + "?token=" + token, Type = attachmentInfos.contentType, Name = attachmentInfos.Name });
                            }
                        }

                    }
                }
                return Ok((List<ForestryTendersMapModel>)Gisfeatures.Features);
            }
            else
            {
                return StatusCode(500, Gisfeatures.GisAttributes.error.message + " " + Gisfeatures.GisAttributes.error.details[0] + " where:" + reqparmForest.GetValues("where")[0] + " Fields:" + reqparmForest.GetValues("outFields")[0]);
            }
        }
    }

    public class ForestryTendersParmModel
    {
        public string FreeText { get; set; }
        public int TenderID { get; set; }
        public int SubTenderID { get; set; }
        public int SubTenderYear { get; set; }
    }
    public class ForestryTendersModel
    {
        public string GlobalID { get; set; }
        public string OBJECTID { get; set; }
        public string TenderID { get; set; }
        public int SubTenderYear { get; set; }
        public string SubTenderID { get; set; }
        public string SubTenderName { get; set; }
        public string STDistrictName { get; set; }
        public string STRegionName { get; set; }
        [JsonConverter(typeof(DomainConverter))]
        public ForestryTenderStatusModel STStageStatus { get; set; }
        public decimal STAreaDunam { get; set; }
        public string STForestNames { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? STWorkStartDate { get; set; }        
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? STWorkEndDate { get; set; }
        public string engineer { get; set; }
        public string STSelectedContractor { get; set; }
        public string STSubContractors { get; set; }
        public decimal? PaymentForDunam { get; set; }
        public decimal? WoodVolumeForSubTender { get; set; }
        public decimal? PriceForCubicMeter { get; set; }
        public decimal? CostSubTender { get; set; }
        public ForestryTendersWorkUnitsModel[] ForestryTendersManas { get; set; }
    }

    public class ForestryTendersWorkUnitsModel
    {
        public string GlobalID { get; set; }
        public string OBJECTID { get; set; }
        public string SWUForests { get; set;}        
        public string SWUGeneralDescription { get; set; }
        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string SWUAreaDesignationCl { get; set; }
        public string SWUThinningType { get; set; }
        public string STReqForestType { get; set; }
        public string TSCurForestType { get; set; }
        public string SWUVegDesignPrinc { get; set; }
        public string SWUThinningPurposeType { get; set; }
        public string SWURequiredTreeDensityType { get; set; }
        public string SWUTrimmedTreeTreatment { get; set; }
        public string SWUTrimTreeTreatType { get; set; }
        public string SWULyingTreeTreat { get; set; }
        public string SWUPullingLogsWorkArea { get; set; }
        public string SWUTreeStumpsTreatments { get; set; }
        public string SWUCuttingTreatment { get; set; }
        public string SWUPruningAdditionalGuidelines { get; set; }
        public string SWUConiferSeedlingsThinning { get; set; }
        public string SWUConiferSeedlingsThinningDeta { get; set; }
        public string SWUBroadLeafStemThinning { get; set; }
        public string SWUBroadLeafStemThinningDetails { get; set; }
        public string SWUBroadLeafPruning { get; set; }
        public string SWUPreventingDamageGuidelines { get; set; }
        public string SWUFieldRisks { get; set; }
        public string SWUProhibitedForUseTools { get; set; }
        public string SWUAllowedForUseTools { get; set; }
        public string SWUMinimumCapacityPerMonth { get; set; }
        public string SWUNatureAndResearchValuesGuide { get; set; }
        public string SWUAdditionalGuidelines { get; set; }
         

        public string ISTTreatmentTypeForMana { get; set; }                
        public string ISTPlantSpForMana { get; set; }
        public string HelkaForMana { get; set; }
        public string StandForMana { get; set; }
        public string StandCoverTypeForMana { get; set; }
        public string Shape_Area { get; set; }
        public decimal? WoodVolumeForMana { get; set; }
        public ForestryTendersWorkUnitsStandsModel[] StandDetails { get; set; }
    }
     
    public class ForestryTendersWorkUnitsStandsModel     
    {
        public string GlobalID { get; set; }
        public string OBJECTID { get; set; }
        public string ManaParentGlobalID { get; set; }
        
        public string WoodVolumeForMana { get; set; }
        public string StandSWUID { get; set; }
        public string StandForestname { get; set; }
        public int? StandHELKA { get; set; }
        public int? STAND { get; set; }
        public decimal? CurrentStandAraeDunam { get; set; }
        public decimal? EstimatedWorkAraeDunam { get; set; }
        public string StandCoverType { get; set; }
        public int? StandStartYear { get; set; }
        public string StandComments { get; set; }
        public decimal? EstimatedWorkVolumeCubicMeter { get; set; }
        public string ActivityType { get; set; }
        public ForestryTendersStandActivitiesModel[] ActivityDetails { get; set; }
    }
    
    public class ForestryTendersInvasiveSpTreatmentsModel
    {
        public string GlobalID { get; set; }
        public string ISTParentGlobalID { get; set; }
        public string ISTPlantSp { get; set; }
        public string ISTTreatmentType { get; set; }
    }
   
    public class ForestryTendersStandActivitiesModel
    {
        public string GlobalID { get; set; }
        public string ActivityParentGlobalID { get; set; }
        public string ActivityType { get; set; }
        public decimal? ActivityEstimatedAreaDunam { get; set; }
        public string ActivityCoverType { get; set; }
        public string ActivityThinningType { get; set; }
        public decimal? ActivityTreeDensity { get; set; }
    }
    public class ForestryTenderStatusModel
    {
        public string STStageStatus { get; set; }
        public string STStageStatusName { get; set; }
    }
    public class ForestryTendersMapParmModel
    {
        public string TenderName { get; set; }
        public int SubTenderID { get; set; }
        public int SubTenderYear { get; set; }
    }
    public class ForestryTendersMapModel
    {
        public string GlobalID { get; set; }       
        public List<FilesAttachments> FilesAttachments { get; set; }

    }
    public class GisForestryTendersModel : GisModel
    {
        public Features[] features { get; set; }
        public class Features
        {
            public Attributes attributes { get; set; }
        }
        public class Attributes : ForestryTendersModel
        {
        }        
        public class ForestryTendersModel
        {
            public int? OBJECTID { get; set; }
            public string GlobalID { get; set; }
            public string Name { get; set; }            
            public List<FilesAttachments> FilesAttachments { get; set; }
        }
        public class FilesAttachments
        {
            public string Url { get; set; }
            public string Type { get; set; }            
        }
    }

     
    public enum TenderMapType
    {
        Maps ,
        WorkCapacity,
        ContractorGuidelines,
        Quotation
    }
}
