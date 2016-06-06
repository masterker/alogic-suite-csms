define(function(require, exports, module) {
    var Backbone = require('backbone');
    var api = require('api');
    var appRouter = require('router/approuter');

    function checkRole () {
        api.getRole().then(function(json){
    		appRouter.goto(json.role || 'login');
        });
    }

    return {
        '': checkRole
    }
});