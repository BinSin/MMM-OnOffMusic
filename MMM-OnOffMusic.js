/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-Rekognition
 */
Module.register("MMM-OnOffMusic", {
  defaults: {
  },

  start: function() {
	var self = this;
	Log.log("Starting module: " + this.name);
  },


  notificationReceived: function(notification, payload, sender) {
	var self = this;
	if(sender) {
		if(notification == "COMMAND") {
    if(payload == " light on" || payload == " lights on") {
      self.sendSocketNotification("LIGHT_ON", "1");
    }
    else if(payload == " light off" || payload == " lights off") {
      self.sendSocketNotification("LIGHT_OFF", "0");
    }
    else if(payload == " recommend music" || payload == " recommended music") {
      self.sendSocketNotification("RECOMMEND_MUSIC", 1);
    }
    else if(payload == " stop music") {
      self.sendSocketNotification("STOP_MUSIC", 1);
    }
	}
	}
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;

	if(notification == "FAIL_MUSIC") {
		console.log("light fail");
	}
   	else if(notification =="SUCCESS_MUSIC") {
     		 console.log("success music recommand : " + payload);
   	}
  },

});
