define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    var xk = require('biz/xk');
    var enums = require('biz/enums');
    var tokenfield = require('tokenfield');
    var bstable = require('bs-table-zh');
    var api = require('api');
    var appView = require('view/appview'); 

    var StudentPage = Backbone.View.extend({
        template: _.template($('#student-template').html()),
        render: function() {
            var self = this;
            if (!this.hasRendered) {
                this.$el.html(this.template);
                $('.containers[role=student]').append(this.$el);
                this.hasRendered = true;

                this.$('a[data-toggle="tab"]').on('show.bs.tab', function(e){
                    var $e = $(e.currentTarget),
                        act = $e.attr('act');

                    switch(act){
                        case 'profile':
                            self.getProfile();
                            break;
                        case 'studentunchoosedcourses':
                            self.getStudentUnchoosedCourses();
                            break;
                        case 'studentchoosedcourses':
                            self.getStudentChoosedCourses();
                            break;
                        // case 'getchoosedcourse':
                        //     self.getChoosedCourse();
                        //     break;
                        case 'schedule':
                            self.genSchedule();
                            break;
                        default:
                            ;
                    }
                });

                $(window).resize(function() {
                    if (self.stuUnchoosedCoursesTable) {
                        self.stuUnchoosedCoursesTable.bootstrapTable('resetView');
                    }
                    if (self.stuChoosedCoursesTable) {
                        self.stuChoosedCoursesTable.bootstrapTable('resetView');
                    }
                    if (self.stuCourseTable) {
                        self.stuCourseTable.bootstrapTable('resetView');
                    }
                })
            }
        },

        events: function () {
            return {
                'click .save-btn': this.submitProfile
            }
        },

        show: function() {
            this.render();
            $('.login-container').hide();
            $('.changepwd-container').hide();
            $('.app-container').show();
            appView.setHeader();
            $('.containers[role]').hide();
            $('.containers[role=student]').show();
            this.$('a[data-toggle="tab"]').eq(0).click();
        },

        submitProfile: function () {
            // 只有manager可以修改信息
            // student
            var data = {
                id: 10002,
                name: 'tom',
                gender: 'M',
                grade: 1,
                major: 'test'
            };

            // teacher manager
            var data = {
                id: 10001,
                name: 'mary'
            };
            api.submitProfile(data).then(function () {
                alert('提交成功');
            });
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
            this.$('.user-grade select').val(json.grade);
        },

        getStudentUnchoosedCourses: function () {
            var self = this;
            var data = {
                studentNo: xk.id
            };
            api.studentGetUnchoosedCourses(data).then(function (courses) {
                self.initUnchoosedCoursesTable(courses);
            });
        },

        getStudentChoosedCourses: function () {
            var self = this;
            var data = {
                studentNo: xk.id
            };
            api.studentGetChoosedCourses(data).then(function (courses) {
                self.initChoosedCoursesTable(courses);
            });
        },

        initUnchoosedCoursesTable: function (courses) {
            var self = this;
            if (this.stuUnchoosedCoursesTable) {
                this.stuUnchoosedCoursesTable.bootstrapTable('destroy');
            }

            var $table = this.$('.student-unchoosed-courses-table');
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
                    field: 'courseNo',
                    title: '课程代码'
                }, {
                    field: 'teacherName',
                    title: '教师姓名'
                },  {
                    field: 'courseCredits',
                    title: '学分'
                },  {
                    field: 'coursePeriod',
                    title: '学时'
                }, {
                    field: 'courseRestrictionGrade',
                    title: '年级限制'
                }, {
                    field: 'courseRestrictionMajor',
                    title: '专业限制'
                }, {
                    field: 'stucourseStatus',
                    title: '',
                    formatter: function(value, row, index) {
                        var html;
                        html ='<button class="btn btn-primary choose-course">选课</button>';
                        return html;
                    },
                    events: {
                        'click .choose-course': function(e, value, row, index){
                            // console.log(arguments);
                            var data = {
                                courseId: row.courseId,
                                studentNo: xk.id,
                            }
                            self.chooseCourse(data).then(function () {
                                $table.bootstrapTable('remove', {
                                    field: 'courseNo',
                                    values: [row.courseNo],
                                });
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

            this.stuUnchoosedCoursesTable = $table.bootstrapTable(tableOptions);
            this.stuUnchoosedCoursesTable.bootstrapTable('resetView');
        },

        initChoosedCoursesTable: function (courses) {
            var self = this;
            if (this.stuChoosedCoursesTable) {
                this.stuChoosedCoursesTable.bootstrapTable('destroy');
            }

            var $table = this.$('.student-choosed-courses-table');
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
                    field: 'courseNo',
                    title: '课程代码'
                }, {
                    field: 'teacherName',
                    title: '教师姓名'
                },  {
                    field: 'courseCredits',
                    title: '学分'
                },  {
                    field: 'coursePeriod',
                    title: '学时'
                }, 
                // {
                //     field: 'courseRestrictionGrade',
                //     title: '年级限制'
                // }, {
                //     field: 'courseRestrictionMajor',
                //     title: '专业限制'
                // }, 
                {
                    field: 'evaluationGrade',
                    title: '评教结果',
                    formatter: function(value, row, index) {
                        var html;
                        if (value == -1) {
                            html = '未评教';
                        } else {
                            html = value;
                        }
                        return html;
                    },
                    editable: {
                        type: 'text',
                        title: '评教结果',
                        validate: function (value, row, index) {
                            value = +$.trim(value);
                            if (isNaN(value) || value < 0) {
                                return '请输入一个大于等于0的数字！';
                            };
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];

                            api.evaluateCourse({id: data.studentCourseId, grade: value}).then(function (studentCourse) {

                                data.courseGrade = studentCourse.courseGrade;
                                $table.bootstrapTable('updateRow', {index: index, row: data})
                            });
                        }
                    }
                }, {
                    field: 'courseGrade',
                    title: '课程成绩',
                    formatter: function(value, row, index) {
                        var res = '';
                        if (value == -1) {
                            res = '未录入';
                        } else if (value == -2) {
                            res = '未评教';
                        } else {
                            res = value;
                        }
                        return res;
                    }
                }, {
                    field: 'dropCourse',
                    title: '',
                    formatter: function(value, row, index) {
                        return '<button class="btn btn-danger cancle-course">退课</button>';
                    },
                    events: {
                        'click .cancle-course': function(e, value, row, index){
                            console.log(arguments);
                            var data = {
                                id: row.studentCourseId,
                                courseId: row.courseId
                            };
                            self.cancleCourse(data).then(function () {
                                $table.bootstrapTable('remove', {
                                    field: 'courseNo',
                                    values: [row.courseNo],
                                });
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
                data.courseId = courses[i]['courseId'];
                data.studentCourseId = courses[i]['studentCourseId'];
                tableOptions.data.push(data);
            }

            this.stuChoosedCoursesTable = $table.bootstrapTable(tableOptions);
            this.stuChoosedCoursesTable.bootstrapTable('resetView');
        },

        chooseCourse: function (data) {
            return api.chooseCourse(data);
        },

        cancleCourse: function (data) {
            return api.cancleCourse(data);
        },

        genSchedule: function () {
            var self = this;
            var data = {
                studentNo: xk.id
            };
            api.studentGetChoosedCourses(data).then(function (courses) {
                self.initScheduleTable(courses);
            });
        },

        initScheduleTable: function (courses) {
            var self = this;
            if (this.stuCourseTable) {
                this.stuCourseTable.bootstrapTable('destroy');
            }

            var $table = this.$('.stucourse-schedule');
            this.stuCourseTable = $table;
            var tableOptions = {
                height: 500,
                columns: [],
                data: []
            };

            function scheduleFormatter (value, row, index) {
                if (value) {
                    var html = [];
                    html.push('<div class="course-name schedule-detail">' + row.course_name + '</div>');
                    html.push('<br/>');
                    html.push('<div class="course-room schedule-detail">' + row.course_room + '</div>');
                    return html.join('');
                } else {
                    return '<div class="course-room schedule-detail">-</div>';
                }
                
            }

            tableOptions.columns = [
                {
                    field: 'section',
                    title: '节次'
                }, {
                    field: 'wd1',
                    title: '周一',
                    formatter: function (value, row, index) {
                        return scheduleFormatter.apply(null, arguments);
                    }
                }, {
                    field: 'wd2',
                    title: '周二',
                    formatter: function (value, row, index) {
                        return scheduleFormatter.apply(null, arguments);
                    }
                }, {
                    field: 'wd3',
                    title: '周三',
                    formatter: function (value, row, index) {
                        return scheduleFormatter.apply(null, arguments);
                    }
                }, {
                    field: 'wd4',
                    title: '周四',
                    formatter: function (value, row, index) {
                        return scheduleFormatter.apply(null, arguments);
                    }
                }, {
                    field: 'wd5',
                    title: '周五',
                    formatter: function (value, row, index) {
                        return scheduleFormatter.apply(null, arguments);
                    }
                }
            ];

            var scheduleCourses = [];
            for (var i = 0; i < courses.length; i++) {
                var course = courses[i];
                for (var j = 0; j < course.roomDetails.length; j++) {
                    var roomDetail = course.roomDetails[j];
                    var time = roomDetail.roomTime;
                    var wd = time.substring(0, 1),
                        section = time.substring(1);
                    scheduleCourses.push({
                        course_name: course.courseName,
                        course_time: time,
                        course_wd: wd,
                        course_section: section,
                        course_room: roomDetail.building
                    });
                }
            }

            var groupedCourses = _.groupBy(scheduleCourses, function(course){
                return course.course_section;
            });

            var rows = [], wds = enums.weekdays;
            for (var i = 1; i <= 11; i++) {
                groupedCourses[i] = groupedCourses[i] || [];
                var groupedCourse = groupedCourses[i];
                var row = {
                    section: i,
                    wd1: '',
                    wd2: '',
                    wd3: '',
                    wd4: '',
                    wd5: ''
                };
                for (var j = 0; j < groupedCourse.length; j++) {
                    var wd = groupedCourse[j]['course_wd'];
                    row['wd' + (wds.indexOf(wd) + 1)] = groupedCourse[j]['course_name'];
                    row.course_name = groupedCourse[j]['course_name'];
                    row.course_room = groupedCourse[j]['course_room']
                }
                rows.push(row);
            }
            tableOptions.data = rows;

            this.stuCourseTable = $table.bootstrapTable(tableOptions);
            this.stuCourseTable.bootstrapTable('resetView');
        }
    });

    return new StudentPage();
});