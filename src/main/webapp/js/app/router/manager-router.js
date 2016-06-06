define(function(require, exports, module) {
    var Backbone = require('backbone');
    var managerPage = require('view/managerpage');
    function manager () {
        managerPage.show();
    }

    return {
        'manager': manager
    }
});