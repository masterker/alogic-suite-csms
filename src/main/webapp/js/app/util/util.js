define(function(require, exports, module) {
    var _ = require('underscore');
    var enums = require('biz/enums');

    var util = {
        validataForm: function($form){
            return {

            };
        },

        splitTime: function (time) {
            var reg = /(\D+)(\d+)/;
            var res = time.match(reg);
            var wd = res[1], section = res[2];

            return {
                weekday: wd,
                section: section
            }
        },

        parseTime: function (time) {
            // A1
            var reg = /(\D+)(\d+)/;
            var res = time.match(reg);
            var wd = res[1], section = res[2];
            return enums.wdsMap[wd] + '第' + section + '节课';
        },

        parseTimesToHtml: function (timesStr) {
            var self = this;
            var res = '', times = timesStr.split(',');
            _.each(times, function (time, index) {
                res += self.parseTime(time) + (index == times.length-1 ? '' : '，');
            });
            return res;
        },

        parseTimeRoom: function (timeRoom) {
            var reg = /^([^\@]*)\@(.*)$/;
            var res = timeRoom.match(reg);
            var time = res[1], room = res[2];

            return this.parseTime(time) + '-' + room;
        },

        parseTimeRoomsToHtml: function (timeRooms) {
            var html = [], self = this;
            _.each(timeRooms, function(timeRoom){
                html.push(self.parseTimeRoom(timeRoom));
            });

            return html.join('<br/><br/>');
        }
    }

    return util;
});