define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    var xk = require('biz/xk');    
    var enums = require('biz/enums');
    var util = require('util');
    var tokenfield = require('tokenfield');
    var bstable = require('bs-table-zh');
    var api = require('api');
    var appView = require('view/appview'); 
    var appRouter = require('router/approuter');

    var TeacherPage = Backbone.View.extend({
        template: _.template($('#teacher-template').html()),
        render: function() {
            var self = this;
            if (!this.hasRendered) {
                this.$el.html(this.template);
                $('.containers[role=teacher]').append(this.$el);
                this.hasRendered = true;

                this.$('a[data-toggle="tab"]').on('show.bs.tab', function(e){
                    // debugger;
                    var $e = $(e.currentTarget),
                        act = $e.attr('act');

                    switch(act){
                        // case 'profile':
                        //     self.getProfile();
                        //     break;
                        case 'teacherpendingcourses':
                            self.getPendingCourses();
                            break;
                        case 'teacherpassedcourses':
                            self.getPassedCourses();
                            break;
                        default:
                            ;
                    }
                });

                $(window).resize(function() {
                    if (self.teacherPendingCourseTable) {
                        self.teacherPendingCourseTable.bootstrapTable('resetView');
                    }
                    if (self.teacherPassedCourseTable) {
                        self.teacherPassedCourseTable.bootstrapTable('resetView');
                    }
                    if (self.courseStudensTable) {
                        self.courseStudensTable.bootstrapTable('resetView');
                    }
                });
            }
        },

        events: function () {
            return {
                'click .add-course': this._addCourse,
                'click .confirm-new-course': this.newCourse
            }
        },

        show: function() {
            this.render();
            $('.login-container').hide();
            $('.changepwd-container').hide();
            $('.app-container').show();
            appView.setHeader();
            $('.containers[role]').hide();
            $('.containers[role=teacher]').show();
            this.$('a[data-toggle="tab"]').eq(0).click();
        },

        // init modal
        _addCourse: function () {
            var self = this;
            if (!this._initedNewCourseModal) {
                // var $select = this.$('.new-student-modal').find('.user-major select');
                // var majors = enums.major;
                // _.each(majors, function (major) {
                //     $select.append('<option value="'+major+'">'+major+'</option>');
                // });
                var $addTimeBtn = this.$('.new-course-modal').find('.add-apply-time');
                $addTimeBtn.click(function (e) {
                    e.preventDefault();
                    var $courseTime = $('.course-time-picker-template').clone().removeClass('course-time-picker-template').show();
                    self.$('.course-time-list').append($courseTime);
                    $courseTime.find('select').val('');
                });

                $(document).on('click', '.course-time .remove-course-time', function (e) {
                    var $e = $(e.currentTarget);
                    var times = $('.course-time-list .course-time');
                    if (times.length === 1) {
                        alert('至少保留一个时间！');
                    } else {
                        $e.closest('.course-time').remove();
                    }
                });
                
                this._initedNewCourseModal = true;
            }
            var $courseTime = $('.course-time-picker-template').clone().removeClass('course-time-picker-template').show();
            $courseTime.find('select').val('');
            this.$('.course-time-list').empty().append($courseTime);
            this.$('.new-course-modal').find('select, input:not(.tokenfield-input)').val('');
            this._initNewCoursePanel();
            this.$('.new-course-modal').modal('show');
        },

        _initPendingCoursesTable: function (courses) {
            var self = this;
            if (this.teacherPendingCourseTable) {
                this.teacherPendingCourseTable.bootstrapTable('destroy');
            }

            // init table
            var $table = this.$('.teacher-pending-courses-table');
            var tableOptions = {
                height: 500,
                columns: [],
                data: []
            };
            tableOptions.columns = [
                {
                    field: 'courseName',
                    title: '课程名称'
                }, {
                    field: 'courseSize',
                    title: '人数上限'
                }, {
                    field: 'courseRestrictionGrade',
                    title: '年级限制'
                }, {
                    field: 'courseRestrictionMajor',
                    title: '专业限制'
                }, {
                    field: 'courseCredits',
                    title: '学分'
                }, {
                    field: 'coursePeriod',
                    title: '学时'
                }, {
                    field: 'applyTime',
                    title: '上课时间',
                    formatter: function (times) {
                        return util.parseTimesToHtml(times);
                    }
                }
            ];

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = courses[i][column.field];
                });
                data.courseId = courses[i]['id'];
                tableOptions.data.push(data);
            }
            
            this.teacherPendingCourseTable = $table.bootstrapTable(tableOptions);
        },

        _initPassedCoursesTable: function (courses) {
            var self = this;
            if (this.teacherPassedCourseTable) {
                this.teacherPassedCourseTable.bootstrapTable('destroy');
            }

            // init table
            var $table = this.$('.teacher-passed-courses-table');
            var tableOptions = {
                height: 500,
                columns: [],
                data: []
            };
            tableOptions.columns = [
                {
                    field: 'courseName',
                    title: '课程名称'
                }, {
                    field: 'courseSize',
                    title: '人数上限'
                }, {
                    field: 'courseEnrollment',
                    title: '已选人数'
                }, {
                    field: 'courseRestrictionGrade',
                    title: '年级限制'
                }, {
                    field: 'courseRestrictionMajor',
                    title: '专业限制'
                }, {
                    field: 'courseCredits',
                    title: '学分'
                }, {
                    field: 'coursePeriod',
                    title: '学时'
                }, {
                    field: 'applyTime',
                    title: '上课时间',
                    formatter: function (times) {
                        return util.parseTimesToHtml(times);
                    }
                }, {
                    field: 'viewStudents',
                    title: '选课详情',
                    formatter: function(value, row, index) {
                        var html;
                        html ='<button class="btn btn-primary view-students">查看</button>';
                        return html;
                    },
                    events: {
                        'click .view-students': function(e, value, row, index){
                            // debugger;
                            self.$('.course-students-modal .course-name').text(row.courseName);
                            self.getCourseStudents(row.courseId).then(function (students) {
                                self._initCourseStudensTable(students);
                                self.$('.course-students-modal').modal('show');
                            });
                        }
                    }
                }
            ];

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = courses[i][column.field];
                });
                data.courseId = courses[i]['id'];
                tableOptions.data.push(data);
            }
            
            this.teacherPassedCourseTable = $table.bootstrapTable(tableOptions);
        },

        _initCourseStudensTable: function (students) {
            var self = this;

            if (this.courseStudensTable) {
                this.courseStudensTable.bootstrapTable('destroy');
            }

            // init table
            var $table = this.$('.course-students-table');
            var tableOptions = {
                height: 500,
                columns: [],
                data: []
            };
            tableOptions.columns = [
                {
                    field: 'studentNo',
                    title: '学号'
                }, {
                    field: 'studentName',
                    title: '姓名'
                }, {
                    field: 'studentGender',
                    title: '性别',
                    formatter: function (value) {
                        return enums.genderMap[value];
                    }
                }, {
                    field: 'studentGrade',
                    title: '年级'
                }, {
                    field: 'studentMajor',
                    title: '专业'
                }, {
                    field: 'courseGrade',
                    title: '成绩',
                    formatter: function (value) {
                        return value == -1 ? '无成绩' : value;
                    },
                    editable: {
                        type: 'text',
                        title: '请输入成绩',
                        validate: function (value, row, index) {
                            value = +$.trim(value);
                            if (isNaN(value) || value < 0) {
                                return '请输入一个大于等于0的数字！';
                            };
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];

                            self.submitScore({
                                id: data.studentCourseId,
                                grade: value
                            });
                        }
                    },
                }
            ];

            for (var i = 0; i < students.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = students[i][column.field];
                });
                data.studentCourseId = students[i]['id'];
                tableOptions.data.push(data);
            }
            
            this.courseStudensTable = $table.bootstrapTable(tableOptions);
        },

        getProfile: function () {
            var self = this;
            api.getProfile({role: xk.role}).then(function (json) {
                self.initProfile(json);
            });
        },

        initProfile: function (json) {
            this.$('.user-name input').val(json.username);
            this.$('.user-gender select').val(json.gender.toLowerCase());
        },

        _initNewCoursePanel: function () {
            var self = this;
            // init field tokens
            if (!this._initedTokenField) {
                this.$('.restriction-grade').tokenfield({
                  autocomplete: {
                    source: enums.grade_string,
                    delay: 100
                  },
                  showAutocompleteOnFocus: true
                });
                this.$('.restriction-grade').on('tokenfield:createtoken', function (event) {
                    var existingTokens = $(this).tokenfield('getTokens');
                    $.each(existingTokens, function(index, token) {
                        if (token.value === event.attrs.value)
                            event.preventDefault();
                    });
                });
                this.$('.restriction-major').tokenfield({
                  autocomplete: {
                    source: enums.major,
                    delay: 100
                  },
                  showAutocompleteOnFocus: true
                });
                this.$('.restriction-major').on('tokenfield:createtoken', function (event) {
                    var existingTokens = $(this).tokenfield('getTokens');
                    $.each(existingTokens, function(index, token) {
                        if (token.value === event.attrs.value)
                            event.preventDefault();
                    });
                });
                this._initedTokenField = true;
            } else {
                this.$('.restriction-grade').tokenfield('setTokens', []);
                this.$('.restriction-major').tokenfield('setTokens', []);
            }
        },

        getPendingCourses: function () {
            var self = this;
            var data = {
                teacherNo: xk.id,
                status: 'PENDING'
            };
            api.teacherGetPenddingCourses(data).then(function (courses) {
                self._initPendingCoursesTable(courses);
            });
        },

        newCourse: function (e) {
            var self = this;
            e.preventDefault();
            var restrictionGrades = this.$('.restriction-grade').tokenfield('getTokens');
            var restrictionMajors = this.$('.restriction-major').tokenfield('getTokens');

            var data = {
                teacherNo: xk.id,
                courseName: this.$('.course-name input').val(),
                courseSize: this.$('.course-size input').val(),
                courseCredits: this.$('.course-credit input').val(),
                coursePeriod: this.$('.course-period input').val(),
                applyTime: this._getApplyTime(), // todo~~
                courseRestrictionGrade: _.pluck(restrictionGrades, 'value').join(','),
                courseRestrictionMajor: _.pluck(restrictionMajors, 'value').join(',')
            };

            console.log(data);
            api.newCourse(data).then(function (newCourse) {
                self.$('.new-course-modal').modal('hide');
                newCourse.courseName = newCourse.name;
                self.teacherPendingCourseTable.bootstrapTable('prepend', newCourse);
            });
        },

        _getApplyTime: function () {
            var $times = this.$('.course-time-list .course-time');
            var times = [];
            $times.each(function (index, e) {
                var $time = $(this);
                var wd = $time.find('.weekday select').val();
                var sc = $time.find('.section select').val();
                var time = wd + sc;
                times.push(time);
            });
            times = _.uniq(times);
            return times.join(',');
        },

        submitScore: function(data) {
            console.log(data);
            api.submitScore(data).then(function(){
                alert('提交成功');
            });
        },

        getPassedCourses: function () {
            var self = this;
            var data = {
                teacherNo: xk.id,
                status: 'PASSED'
            };
            api.teacherGetPassedCourses(data).then(function (course) {
                self._initPassedCoursesTable(course);
            });
        },

        getCourseStudents: function (courseId) {
            var self = this;
            var def = $.Deferred();
            api.teacherGetCourseStudents(courseId).then(function (students) {
                def.resolve(students);
            });

            return def.promise();
        }
    });

    return new TeacherPage();
});