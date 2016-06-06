define(function(require, exports, module) {
    var Backbone = require('backbone');
    var studentPage = require('view/studentpage');
    function student () {
        studentPage.show();
    }

    return {
        'student': student
    }
});