import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
      var ul = window.location.href;
      ul = ul.substring(22,ul.length);
      var pos = ul.search("/");
      ul = ul.substring(pos + 1, ul.length);
      var z = ul.search("/");
      var topicId;
      if(z > 0){
          topicId = ul.substring(0,z);
      }else{
          topicId = ul.substring(0, ul.length);
      }
      var user = Discourse.User.currentProp('id');
      if(user){
          $.getJSON("https://padpors.com/recommender/ingest?id=" + user + "&url=%27t"+ topicId + "%27", function (data) {
          });
      }
      else {
          if ($.cookie("rec_id") == null) {
                  var data = Math.floor(Math.random() * 9999999999999) + 1;  
                  $.cookie('rec_id', data, { expires: 18250 });
                  document.cookie = "rec_id=" + data;
                  $.getJSON("https://padpors.com/recommender/ingest?id=" + data + "&url=%27t" + topicId + "%27", function (data) {});
          }
          else {
              var key = $.cookie("rec_id");
              $.getJSON("https://padpors.com/recommender/ingest?id=" + key + "&url=%27t" + topicId + "%27", function (data) {
              });
          }
      }
  });
}
export default {
  name: 'Recommander',
  initialize: function(container)
  {
      withPluginApi('0.1', api => initializePlugin(api));
  }
};
