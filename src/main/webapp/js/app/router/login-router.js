define(function(require, exports, module) {
    var Backbone = require('backbone');
    var loginView = require('view/loginview');
    var xk = require('biz/xk');
    var appRouter = require('router/approuter');

    function login () {
    	if (!xk.role) {
    		loginView.show();
    	} else {
    		appRouter.goto(xk.role);
    	}
    }

    return {
        'login': login
    }
});