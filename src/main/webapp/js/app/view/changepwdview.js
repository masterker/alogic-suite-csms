define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

    var api = require('api');
    var xk = require('biz/xk');
    var appRouter = require('router/approuter');

    var ChangpwdView = Backbone.View.extend({
        template: _.template($('#changepwd-template').html()),
        render: function() {
            if (!this.hasRendered) {
                this.$el.html(this.template);
                $('.changepwd-container').append(this.$el);
                this.hasRendered = true;
            }
            var $e = this.$('.login-code');
            $e.attr('src', $e.attr('src') + '?' + Math.random());
        },

        afterRender: function() {
            
        },

        show: function() {
            this.render();
            $('.app-container').hide();
            $('.login-container').hide();
            $('.changepwd-container').show();
        },

        events: function() {
            return {
                'click .changepwd-btn': this._changepwd,
                'click .cancel-btn': this._cancel,
                'click .login-code': function (e) {
                    var $e = $(e.currentTarget);
                    $e.attr('src', $e.attr('src') + '?' + Math.random());
                }
            }
        },

        _changepwd: function(e) {
            e.preventDefault();
            var $e = $(e.currentTarget);
            var oldPwd = this.$('.old-password input').val(),
                newPwd = this.$('.new-password input').val(),
                confirmNewPwd = this.$('.confirm-new-password input').val(),
                code = this.$('.login-captcha input').val();

            var data = {
                oldPwd: oldPwd,
                newPwd: newPwd,
                code: code
            }

            if (!oldPwd || !newPwd || !confirmNewPwd) {
                alert('密码不能为空');
                return;
            }

            if (newPwd !== confirmNewPwd) {
                alert('请重新确认密码');
                return;
            }

            if (!code) {
                alert('验证码不能为空');
                return;
            }
            api.changepwd(data).then(function() {
                alert('密码修改成功');
                appRouter.goto(xk.role);
            });
        },

        _cancel: function (e) {
            history.back();
        }
    });

    return new ChangpwdView();
});