using Newtonsoft.Json.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;

namespace Feature.CustomResolvers
{
  internal class ReletedEventsContentResolver : Sitecore.LayoutService.ItemRendering.ContentsResolvers.RenderingContentsResolver
  {
    private List<Item> items = new List<Item>();

    public override object ResolveContents(Sitecore.Mvc.Presentation.Rendering rendering, IRenderingConfiguration renderingConfig)
    {
      Assert.ArgumentNotNull(rendering, nameof(rendering));
      Assert.ArgumentNotNull(renderingConfig, nameof(renderingConfig));

      Item ds = GetContextItem(rendering, renderingConfig);

      var relatedEventsFieldId = new ID(Constants.ReletedEventsFieldId);

      //if the rendering datasource has curated items
      if (ds.Fields.Contains(relatedEventsFieldId) && !string.IsNullOrWhiteSpace(ds.Fields[relatedEventsFieldId].Value))
      {
        List<string> blogItemIds = ds.Fields[relatedEventsFieldId].Value.Split('|').ToList();
        foreach (var id in blogItemIds)
        {
          var item = Sitecore.Context.Database.GetItem(new ID(id));
          items.Add(item);
        }
      }

      if (!items.Any())
        return null;

      JObject jobject = new JObject()
      {
        ["items"] = (JToken)new JArray()
      };

      List<Item> objList = items != null ? items.ToList() : null;
      if (objList == null || objList.Count == 0)
        return jobject;
      jobject["items"] = ProcessItems(objList, rendering, renderingConfig);
      return jobject;
    }
  }
}
