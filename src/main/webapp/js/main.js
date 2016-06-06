//  入口文件
requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        'bootstrap': 'bootstrap/js/bootstrap',
        'jqui': 'jquery-ui/js/jquery-ui',
        
        'app': '../app',
        'router': '../app/router',
        'view': '../app/view',
        'biz': '../app/biz',
        'common': '../common',
        'api': '../app/api/api',
        'util': '../app/util/util',

        'tokenfield': 'tokenfield/bootstrap-tokenfield',

        'bs-table': 'bootstrap-table/bootstrap-table',
        'bs-editable': 'bootstrap-table/bootstrap-editable',
        'bs-table-editable': 'bootstrap-table/bootstrap-table-editable',
        'bs-table-zh': 'bootstrap-table/bootstrap-table-zh-CN',
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'tokenfield': {
            deps: ['jqui']
        },
        'bs-editable': {
            deps: ['jquery', 'bootstrap', 'bs-table']
        },
        'bs-table-editable': {
            deps: ['jquery', 'bootstrap', 'bs-table', 'bs-editable']
        },
        'bs-table-zh': {
            deps: ['jquery', 'bootstrap', 'bs-table', 'bs-editable', 'bs-table-editable']
        },
    }
});

define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
        require('bootstrap');

    var xk = require('biz/xk');
    var appRouter = require('router/approuter');
    var checkRoleRouter = require('router/checkrole-router');
    var loginRouter = require('router/login-router');
    var changepwdRouter = require('router/changepwd-router');
    var teacherRouter = require('router/teacher-router');
    var studentRouter = require('router/student-router');
    var managerRouter = require('router/manager-router');
    var appView = require('view/appview');
    appView.show();

    appRouter.addRoutes(checkRoleRouter);
    appRouter.addRoutes(loginRouter);
    appRouter.addRoutes(changepwdRouter);
    appRouter.addRoutes(teacherRouter);
    appRouter.addRoutes(studentRouter);
    appRouter.addRoutes(managerRouter);

    appRouter.start();

    return false;
});