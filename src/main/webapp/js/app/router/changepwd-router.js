define(function(require, exports, module) {
    var Backbone = require('backbone');
    var changepwdView = require('view/changepwdview');
    var xk = require('biz/xk');
    var appRouter = require('router/approuter');

    function changepwd () {
		changepwdView.show();
    }

    return {
        'changepwd': changepwd
    }
});