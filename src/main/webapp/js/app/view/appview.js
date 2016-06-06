define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    var xk = require('biz/xk');
    var enums = require('biz/enums');
    var api = require('api');
    var appRouter = require('router/approuter');

    var AppView = Backbone.View.extend({
        el: 'body',
        template: _.template($('#appview-template').html()),
        render: function() {
            if (!this.hasRendered) {
                this.$el.html(this.template);
                this.hasRendered = true;
            }
        },

        events: function(){
            return {
                'click .logout-btn': this._logout,
                'click .change-pwd': function(){
                    appRouter.goto('changepwd');
                },
            }
        },

        afterRender: function() {
        },

        show: function(){
            this.render();
            this.$el.appendTo('body');
        },

        _logout: function(){
            api.logout().then(function(){
                xk.role = '';
                xk.id = '';
                xk.isLogin = false;
                appRouter.goto('login');
            });
        },

        setHeader: function() {
            this.$('.user-header .user-role').text(enums.roleMap[xk.role]);
            this.$('.user-header .user-name').text(xk.name);
            this.$('.user-header .user-id').text(xk.id);
        }
    });

    return new AppView();
});