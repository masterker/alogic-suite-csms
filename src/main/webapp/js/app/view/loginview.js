define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

    var api = require('api');
    var xk = require('biz/xk');
    var appRouter = require('router/approuter');

    var LoginView = Backbone.View.extend({
        template: _.template($('#login-template').html()),
        render: function() {
            if (!this.hasRendered) {
                this.$el.html(this.template);
                $('.login-container').append(this.$el);
                this.hasRendered = true;
            }
            this.$('input').val('');
            var $e = this.$('.login-code');
            $e.attr('src', $e.attr('src') + '?' + Math.random());
        },

        afterRender: function() {
            
        },

        show: function() {
            this.render();
            $('.app-container').hide();
            $('.login-container').show();
            $('.changepwd-container').hide();
        },

        events: function() {
            return {
                'change .user-role select': this._onRoleChange,
                'click .login-btn': this._login,
                'click .login-code': function (e) {
                    var $e = $(e.currentTarget);
                    $e.attr('src', $e.attr('src') + '?' + Math.random());
                }
            }
        },

        _onRoleChange: function(e) {
            var $e = $(e.currentTarget);
            var role = $e.val();
            if (role === 'student') {
                this.$('.user-id label').text('学号');
            } else {
                this.$('.user-id label').text('工号');
            }
        },

        _login: function (e) {
            e.preventDefault();
            var role = this.$('.user-role select').val(),
                loginId = this.$('.user-id input').val(),
                pwd = this.$('.user-password input').val(),
                loginCode= this.$('.login-captcha input').val();

            var data = {
                loginId: loginId,
                pwd: pwd,
                loginCode: loginCode,
                role: role
            };
            
            api.login(data).then(function(user){
                api.getRole().then(function (user) {
                    // xk.isLogin = true;
                    // xk.id = data.loginId || 'loginId';
                    // xk.role = data.role;
                    // xk.name = 'Default Name';

                    xk.role = user.loginType;
                    xk.id = user.loginId;
                    xk.name = user.name;
                    xk.password = user.password;
                    xk.isLogin = user.isLogin === 'true' ? true : false;

                    appRouter.goto(data.role);
                });
                
            });
        }
    });

    return new LoginView();
});