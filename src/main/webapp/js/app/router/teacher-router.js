define(function(require, exports, module) {
    var Backbone = require('backbone');
    var teacherPage = require('view/teacherpage');
    function teacher () {
        teacherPage.show();
    }

    return {
        'teacher': teacher
    }
});