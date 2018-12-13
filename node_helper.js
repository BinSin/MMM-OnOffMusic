/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var path = require("path");
var fs = require('fs');
var exec = require("child-process-promise").exec;

module.exports = NodeHelper.create({


  start: function() {
	var self = this;
	console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;

	if (notification == "RECOMMEND_MUSIC") {
    fs.readFile(path.resolve(global.root_path + "/light.js"), "utf8", function(err, data) {
	var emotion = null;
      if(err) {
        self.sendSocketNotification("FAIL_MUSIC", err);
      }
      else {

        if(data == 1) {
          emotion = "HAPPY";
        }
        else {
          emotion = "CALM";
        }

        var music = fs.readdirSync(path.resolve(global.root_path + "/Music/" + emotion));
        var random = Math.floor(Math.random() * music.length);
	
        setTimeout(function() {
	    exec("omxplayer ~/MagicMirror/Music/" + emotion + "/" + music[random]);
        }, 2000);
        self.sendSocketNoficiation("SUCCESS_MUSIC", music[random]);
      }
    });


	}
  else if (notification == "STOP_MUSIC") {
    exec("killall omxplayer.bin");
  }
	else if (notification == "LIGHT_ON") {
		exec("sudo ~/MagicMirror/light/on");
	}
	else if (notification == "LIGHT_OFF") {
		exec("sudo ~/MagicMirror/light/off");
	}
  },
});
