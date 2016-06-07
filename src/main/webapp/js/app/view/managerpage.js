define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
    
    var enums = require('biz/enums');
    var bstable = require('bs-table-zh');
    var api = require('api');
    var appView = require('view/appview');
    var util = require('util');


    var ManagerPage = Backbone.View.extend({
        template: _.template($('#manager-template').html()),
        render: function() {
            var self = this;
            if (!this.hasRendered) {
                this.$el.html(this.template);
                $('.containers[role=manager]').append(this.$el);
                this.hasRendered = true;

                this.$('a[data-toggle="tab"]').on('show.bs.tab', function(e){
                    // debugger;
                    var $e = $(e.currentTarget),
                        act = $e.attr('act');

                    switch(act){
                        case 'commitcourse':
                            self.getUncommitedCourse();
                            break;
                        case 'getallcourse':
                            self.getAllCourse();
                            break;
                        case 'getallstudents':
                            self.getAllStudents();
                            break;
                        default:
                            ;
                    }
                });

                $(window).resize(function() {
                    if (self.coursePassTable) {
                        self.coursePassTable.bootstrapTable('resetView');
                    }
                    if (self.roomAssignTable) {
                        self.roomAssignTable.bootstrapTable('resetView');
                    }
                    if (self.courseModifyTable) {
                        self.courseModifyTable.bootstrapTable('resetView');
                    }
                    if (self.allCourseTable) {
                        self.allCourseTable.bootstrapTable('resetView');
                    }
                    if (self.courseStudensTable) {
                        self.courseStudensTable.bootstrapTable('resetView');
                    }
                    if (self.allStudensTable) {
                        self.allStudensTable.bootstrapTable('resetView');
                    }
                    if (self.studentCoursesTable) {
                        self.studentCoursesTable.bootstrapTable('resetView');
                    }
                });
            }
        },
        show: function() {
            this.render();
            $('.login-container').hide();
            $('.changepwd-container').hide();
            $('.app-container').show();
            appView.setHeader();
            $('.containers[role]').hide();
            $('.containers[role=manager]').show();
            this.$('a[data-toggle="tab"]').eq(0).click();
        },

        events: function () {
            return {
                'click .confirm-room-assign': this._confirmRoomAssign,
                'click .add-student-row': this._addStudent,
                'click .confirm-new-student': this._confirmNewStudent,
            }
        },

        // 审批课程
        _initCommitCourse: function(courses) {
            var self = this;
            if (this.coursePassTable) {
                this.coursePassTable.bootstrapTable('destroy');
            }

            var $table = this.$('.course-pass-table');
            this.coursePassTable = $table;
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
                    title: '课程代码',
                    editable: {
                        type: 'text',
                        title: '请输入课程代码',
                        validate: function (value, row, index) {
                            if (!value) {
                                return '课程代码不能为空';
                            }
                        }
                    },
                }, {
                    field: 'courseSize',
                    title: '选课人数上限',
                    editable: {
                        type: 'text',
                        title: '请输入人数上限',
                        validate: function (value, row, index) {
                            value = +$.trim(value);
                            if (isNaN(value) || value <= 0) {
                                return '请输入一个大于0的数字！';
                            };
                        }
                    },
                }, {
                    field: 'applyTime',
                    title: '上课时间',
                    formatter: function (value) {
                        return util.parseTimesToHtml(value);
                    }
                }, {
                    field: 'room',
                    title: '教室',
                    formatter: function (value, row, index) {
                        if (!row.courseDetail) {
                            return '<button class="btn btn-primary assign-room">分配教室</button>';
                        } else {
                            // return row.courseDetailDisplay;
                            return '<div class="assign-room" style="cursor:pointer;">'+row.courseDetailDisplay+'</div>';
                            // return courseDetail;
                        }
                    },
                    events: {
                        'click .assign-room': function (e, value, row, index) {
                            var data = {
                                applyTime: row.applyTime
                            };
                            self.assignRoom(data).then(function (roomsMap) {
                                self.$('.assign-room-modal .course-name').text(row.courseName);
                                self.$('.assign-room-modal').modal('show');
                                self.assignRow = row;
                                self.assignIndex = index;
                                self._initRoomAssignTable(roomsMap);
                            });
                        },
                    }
                }, {
                    field: 'courseRestrictionGrade',
                    title: '年级限制',
                    editable: {
                        type: 'text',
                        title: '请输入年级限制',
                        validate: function (value, row, index) {
                            if (!value) {
                                return '不能为空';
                            }
                        }
                    },
                }, {
                    field: 'courseRestrictionMajor',
                    title: '专业限制',
                    editable: {
                        type: 'text',
                        title: '请输入专业限制',
                        validate: function (value, row, index) {
                            if (!value) {
                                return '不能为空';
                            }
                        }
                    },
                }, {
                    field: 'course_commit',
                    title: '审批',
                    formatter: function() {
                        return [
                            '<button class="btn btn-primary pass-course">同意</button>'
                        ].join('');
                    },
                    events: {
                        'click .pass-course': function(e, value, row, index){
                            if (!row.courseNo) {
                                alert('请为课程输入课程代码。');
                                return;
                            } else if (!row.courseDetail) {
                                alert('请先为课程分配教室！');
                                return;
                            } else {
                                var data = {
                                    id: row.courseId,
                                    size: row.courseSize,
                                    resGrade: row.courseRestrictionGrade,
                                    resMajor: row.courseRestrictionMajor,
                                    courseNo: row.courseNo,
                                    courseDetail: row.courseDetail
                                };
                                console.log(data);
                                self.passCourse(data).then(function () {
                                    $table.bootstrapTable('remove', {
                                        field: 'courseId',
                                        values: [row.courseId],
                                    });
                                });
                            }
                            
                        }
                    }
                }
            ];

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = courses[i][column.field];
                });
                data.courseNo = '';
                data.courseId = courses[i]['id'];
                data.courseDetail = '';
                tableOptions.data.push(data);
            }
            tableOptions.onEditableShown = function (field, row, $ele, reason) {
                switch(field){
                    case 'courseRestrictionGrade':
                        self._initGradeToken(reason.input.$input, row[field]);
                        break;
                    case 'courseRestrictionMajor':
                        self._initMajorToken(reason.input.$input, row[field]);
                        break;
                    default:
                        ;
                }
            }
            
            this.coursePassTable = $table.bootstrapTable(tableOptions);
        },

        _initRoomAssignTable: function (roomsMap) {
            var self = this;
            if (this.roomAssignTable) {
                this.roomAssignTable.bootstrapTable('destroy');
            }

            var $table = this.$('.room-assign-table');
            this.roomAssignTable = $table;
            var tableOptions = {
                columns: [],
                data: []
            };

            tableOptions.columns = [
                {
                    field: 'weekday',
                    title: '周',
                    formatter: function(value){
                        var arr = [
                            {value: 'A', title: '一'}, 
                            {value: 'B', title: '二'}, 
                            {value: 'C', title: '三'}, 
                            {value: 'D', title: '四'}, 
                            {value: 'E', title: '五'}, 
                        ];
                        var html = '<select class="form-control weekday-select" name="weekday">';
                        _.each(arr, function (e) {
                            var isSelected = e.value == value ? 'selected' : '';
                            html += '<option value="' + e.value + '" ' + isSelected + '>' + e.title + '</option>'
                        });
                        html += '</select>';
                        return html;
                    },
                    events: {
                        'change .weekday-select': function (e, value, row, index) {
                            var $e = $(e.currentTarget);
                            row.weekday = $e.val();
                            row.time = '' + row.weekday + row.section;
                            self.assignRoomByTime(row.time).then(function (rooms) {
                                row.rooms = rooms;
                                $table.bootstrapTable('updateRow', {index: index, row: row});
                            });
                        }
                    },
                }, {
                    field: 'section',
                    title: '节次',
                    formatter: function(value){
                        var html = '<select class="form-control section-select" name="section">';
                        var num = 1;
                        while(num < 12) {
                            var isSelected = num == value ? 'selected' : '';
                            html += '<option value="' + num + '" ' + isSelected + '>' + num + '</option>'
                            num++;
                        }
                        html += '</select>';
                        return html;
                    },
                    events: {
                        'change .section-select': function (e, value, row, index) {
                            var $e = $(e.currentTarget);
                            row.section = $e.val();
                            row.time = '' + row.weekday + row.section;
                            self.assignRoomByTime(row.time).then(function (rooms) {
                                row.rooms = rooms;
                                $table.bootstrapTable('updateRow', {index: index, row: row});
                            });
                        }
                    },
                }, {
                    field: 'room',
                    title: '教室',
                    formatter: function (rooms, row, index) {
                        row.courseRoomId = rooms[0]['id'];
                        row.courseRoomName = rooms[0]['roomName'];
                        return self._displayRooms(rooms);
                    },
                    events: {
                        'change .room-select': function (e, value, row, index) {
                            var $e = $(e.currentTarget);
                            var room = _.find(row.room, function (rm) {
                                return rm.id == $e.val();
                            });
                            row.courseRoomId = room.id;
                            row.courseRoomName = room.roomName;
                        }
                    }
                }
            ];

            for (var time in roomsMap) {
                var data = {};

                var tinfo = util.splitTime(time);
                data.weekday = tinfo.weekday;
                data.section = tinfo.section;
                data.room = roomsMap[time];
                data.time = time;
                data.courseRoomId = '';
                data.courseRoomName = '';

                tableOptions.data.push(data);
            }

            this.roomAssignTable = $table.bootstrapTable(tableOptions);
        },

        _initGradeToken: function ($input, value) {
            $input.tokenfield({
              autocomplete: {
                source: enums.grade_string,
                delay: 100
              },
              showAutocompleteOnFocus: true,
              minWidth: '200'
            });
            $input.on('tokenfield:createtoken', function (event) {
                var existingTokens = $(this).tokenfield('getTokens');
                $.each(existingTokens, function(index, token) {
                    if (token.value === event.attrs.value)
                        event.preventDefault();
                });
            });
            $input.tokenfield('setTokens', value);
        },

        _initMajorToken: function ($input, value) {
            $input.tokenfield({
              autocomplete: {
                source: enums.major,
                delay: 100
              },
              showAutocompleteOnFocus: true,
              minWidth: '200'
            });
            $input.on('tokenfield:createtoken', function (event) {
                var existingTokens = $(this).tokenfield('getTokens');
                $.each(existingTokens, function(index, token) {
                    if (token.value === event.attrs.value)
                        event.preventDefault();
                });
            });
            $input.tokenfield('setTokens', value);
        },

        _displayRooms: function (rooms) {
            var html = '';
            if (rooms.length === 0) {
                html += '无可用教室';
            } else {
                html = '<select class="form-control room-select" name="room">';
                _.each(rooms, function (room) {
                    html += '<option value="' + room.id + '">' + room.roomName + '</option>'
                });
                html += '</select>';
            }
            return html;
        },

        // 修改课程
        _initModifyCourse: function(json){
            var self = this;
            if (this.courseModifyTable) {
                this.courseModifyTable.bootstrapTable('destroy');
            }

            var $table = this.$('.course-pass-table');
            this.courseModifyTable = $table;
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
                    title: '课程代码',
                }, {
                    field: 'courseSize',
                    title: '选课人数上限',
                    editable: {
                        type: 'text',
                        title: '请输入课程代码',
                        validate: function (value, row, index) {
                            if (!value) {
                                return '选课人数不能为空';
                            }
                        }
                    }
                }, {
                    field: 'applyTime',
                    title: '上课时间',
                    formatter: function (value) {
                        return util.parseTimesToHtml(value);
                    },

                }, {
                    field: 'room',
                    title: '教室',
                    formatter: function (value, row, index) {
                        if (!row.courseDetail) {
                            return '<button class="btn btn-primary assign-room">分配教室</button>';
                        } else {
                            // return row.courseDetailDisplay;
                            return '<div class="assign-room">'+row.courseDetailDisplay+'</div>';
                        }
                    },
                    events: {
                        'click .assign-room': function (e, value, row, index) {
                            var data = {
                                applyTime: row.applyTime
                            };
                            self.assignRoom(data).then(function (roomsMap) {
                                self.$('.assign-room-modal .course-name').text(row.courseName);
                                self.$('.assign-room-modal').modal('show');
                                self.assignRow = row;
                                self.assignIndex = index;
                                self._initRoomAssignTable(roomsMap);
                            });
                        },
                    }
                }, {
                    field: 'courseRestrictionGrade',
                    title: '年级限制'
                }, {
                    field: 'courseRestrictionMajor',
                    title: '专业限制'
                }
            ];

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = courses[i][column.field];
                });
                data.courseNo = '';
                data.courseId = courses[i]['id'];
                data.courseDetail = '';
                tableOptions.data.push(data);
            }

            this.courseModifyTable = $table.bootstrapTable(tableOptions);
        },

        // 查看课程详情
        _initAllCourseTable: function(courses){
            var self = this;
            if (this.allCourseTable) {
                this.allCourseTable.bootstrapTable('destroy');
            }
            var $table = this.$('.course-all-table');
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
                    title: '课程代码',
                }, {
                    field: 'teacherNo',
                    title: '教师工号',
                }, {
                    field: 'courseEnrollment',
                    title: '选课人数',
                }, {
                    field: '',
                    title: '详情',
                    formatter: function(value, row, index) {
                        var html;
                        html ='<button class="btn btn-primary view-students">查看</button>';
                        return html;
                    },
                    events: {
                        'click .view-students': function(e, value, row, index){
                            // debugger;
                            self.$('.course-all-students-modal .course-name').text(row.courseName);
                            self.managerGetCourseStudents(row.courseId).then(function (students) {
                                self._initCourseStudensTable(students);
                                self.$('.course-all-students-modal').modal('show');
                            });
                        }
                    }
                }
            ]

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    if (column.field) {
                        data[column.field] = courses[i][column.field];
                    }
                });
                data.courseId = courses[i]['id'];
                tableOptions.data.push(data);
            }

            this.allCourseTable = $table.bootstrapTable(tableOptions);
        },

        _initCourseStudensTable: function (students) {
            var self = this;

            if (this.courseStudensTable) {
                this.courseStudensTable.bootstrapTable('destroy');
            }

            // init table
            var $table = this.$('.course-all-students-table');
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
                    field: 'evaluationGrade',
                    title: '评教结果',
                    formatter: function (value) {
                        return value == -1 ? '未评教' : value;
                    }
                }, {
                    field: 'courseGrade',
                    title: '成绩',
                    formatter: function (value) {
                        return value == -1 ? '暂无成绩' : value;
                    }
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

        // 查看选课详情
        _initAllStudentTable: function (students) {
            var self = this;

            if (this.allStudensTable) {
                this.allStudensTable.bootstrapTable('destroy');
            }

            // init table
            var $table = this.$('.student-all-table');
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
                    title: '姓名',
                    editable: {
                        type: 'text',
                        title: '请输入姓名',
                        validate: function (value) {
                            if (!value) {
                                return '姓名不能为空';
                            }
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];
                            self._updateStudent(data);
                        }
                    },
                }, {
                    field: 'studentGender',
                    title: '性别',
                    editable: {
                        type: 'select',
                        source: [
                            {value: 'M', text: '男'},
                            {value: 'F', text: '女'},
                        ],
                        validate: function (value) {
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];
                            self._updateStudent(data);
                        }
                    },
                }, {
                    field: 'studentGrade',
                    title: '年级',
                    editable: {
                        type: 'select',
                        source: [
                            {value: '1', text: '1'},
                            {value: '2', text: '2'},
                            {value: '3', text: '3'},
                            {value: '4', text: '4'},
                        ],
                        validate: function (value) {
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];
                            self._updateStudent(data);
                        }
                    },
                }, {
                    field: 'studentMajor',
                    title: '专业',
                    editable: {
                        type: 'select',
                        source: (function () {
                            var majors = [];
                            _.each(enums.major, function (major) {
                                majors.push({value: major, text: major});
                            });
                            return majors;
                        }),
                        validate: function (value) {
                            var datas = $table.bootstrapTable('getData'),
                                index = $(this).parents('tr').data('index'),
                                data = datas[index];
                            self._updateStudent(data);
                        }
                    },
                }, {
                    field: 'detail',
                    title: '详情',
                    formatter: function(value, row, index) {
                        var html;
                        html ='<button class="btn btn-primary view-student-courses">查看</button>';
                        return html;
                    },
                    events: {
                        'click .view-student-courses': function(e, value, row, index){
                            self.$('.student-all-course-modal .student-name').text(row.studentName);
                            self.managerGetStudentCourses(row.studentNo).then(function (courses) {
                                self._initStudentCoursesTable(courses);
                                self.$('.student-all-course-modal').modal('show');
                            });
                        }
                    }
                }, {
                    field: 'delete',
                    title: '删除',
                    formatter: function(value, row, index) {
                        var html;
                        html ='<button class="btn btn-primary delete-student">删除</button>';
                        return html;
                    },
                    events: {
                        'click .delete-student': function(e, value, row, index){
                            var id = row.studentNo;
                            api.deleteStudent(id).then(function () {
                                $table.bootstrapTable('remove', {
                                    field: 'studentNo',
                                    values: [row.studentNo],
                                });
                            });
                        }
                    }
                },
            ];

            for (var i = 0; i < students.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = students[i][column.field];
                });
                tableOptions.data.push(data);
            }
            
            this.allStudensTable = $table.bootstrapTable(tableOptions);
        },

        _initStudentCoursesTable: function(courses){
            var self = this;
            if (this.studentCoursesTable) {
                this.studentCoursesTable.bootstrapTable('destroy');
            }
            var $table = this.$('.student-courses-table');
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
                    field: 'evaluationGrade',
                    title: '评教结果',
                    formatter: function (value) {
                        return value == -1 ? '未评教' : value;
                    }
                }, {
                    field: 'courseGrade',
                    title: '课程成绩',
                    formatter: function (value) {
                        return value == -1 ? '暂无成绩' : value;
                    }
                }
            ]

            for (var i = 0; i < courses.length; i++) {
                var data = {};
                _.each(tableOptions.columns, function(column){
                    data[column.field] = courses[i][column.field];
                });
                tableOptions.data.push(data);
            }

            this.studentCoursesTable = $table.bootstrapTable(tableOptions);
        },

        getUncommitedCourse: function(){
            var self = this;
            api.getUncommitedCourse().then(function (courses) {
                self._initCommitCourse(courses);
            });
        },

        getCommitedCourse: function(){
            var self = this;
            api.getCommitedCourse().then(function (courses) {
                self._initModifyCourse(courses);
            });
        },

        assignRoomByTime: function (roomTime) {
            var def = $.Deferred();
            api.assignRoom({roomTime: roomTime}).then(function (rooms) {
                def.resolve(rooms);
            });
            return def.promise();
        },

        assignRoom: function (data) {
            var def = $.Deferred();
            var applyTime = data.applyTime;
            var times = data.applyTime.split(',');
            var requests = [];
            self.roomTimeMap = {};
            _.each(times, function (time) {
                var roomTime = {
                    roomTime: time
                };
                // var request = api.assignRoom(roomTime).then(function (rooms) {
                //     self.roomTimeMap[time] = rooms;
                // });
                // requests.push(request);

                var d = $.Deferred();
                api.assignRoom(roomTime).then(function (rooms) {
                    var rt = {};
                    rt[time] = rooms;
                    d.resolve(rt);
                });
                requests.push(d.promise());
            });

            $.when.apply($, requests).then(function () {
                // console.log(arguments);
                _.each(arguments, function (roomMap) {
                    for (var time in roomMap) {
                        self.roomTimeMap[time] = roomMap[time];
                    }
                })
                def.resolve(self.roomTimeMap);
            });

            return def.promise();
        },

        passCourse: function (data) {
            var def = $.Deferred();
            api.passCourse(data).then(function (data) {
                def.resolve(data);
            });

            return def.promise();
        },

        _confirmRoomAssign: function (e) {
            var self = this;
            if (this.roomAssignTable && this.coursePassTable) {
                var assignTableDatas = this.roomAssignTable.bootstrapTable('getData');
                self.assignRow.applyTime = this.getApplyTimes(assignTableDatas);
                self.assignRow.courseDetail = this.getCourseDetail(assignTableDatas);
                self.assignRow.courseDetailDisplay = this.getCourseDetailDisplay(assignTableDatas);
                this.coursePassTable.bootstrapTable('updateRow', {index: self.assignIndex, row: self.assignRow});
                self.$('.assign-room-modal').modal('hide');
            }
        },

        getApplyTimes: function (datas) {
            var res = [];
            _.each(datas, function (data) {
                res.push(data.time);
            });

            return res.join(',');
        },

        getCourseDetail: function (datas) {
            var res = [];
            _.each(datas, function (data) {
                res.push(data.courseRoomId);
            });

            return res.join(',');
        },

        getCourseDetailDisplay: function (datas) {
            var res = [];
            _.each(datas, function (data) {
                res.push(data.courseRoomName);
            });

            return res.join(',');
        },

        getAllCourse: function () {
            var self = this;
            api.getAllCourse().then(function (courses) {
                self._initAllCourseTable(courses);
            });
        },

        managerGetCourseStudents: function (courseId) {
            var self = this;
            var def = $.Deferred();
            api.managerGetCourseStudents(courseId).then(function (students) {
                def.resolve(students);
            });

            return def.promise();
        },

        getAllStudents: function () {
            var self = this;
            api.getAllStudents().then(function (students) {
                self._initAllStudentTable(students);
            });
        },

        managerGetStudentCourses: function (studentNo) {
            var self = this;
            var def = $.Deferred();
            api.managerGetStudentCourses(studentNo).then(function (courses) {
                def.resolve(courses);
            });

            return def.promise();
        },

        _addStudent: function () {
            if (!this._initedNewStudentModal) {
                var $select = this.$('.new-student-modal').find('.user-major select');
                var majors = enums.major;
                _.each(majors, function (major) {
                    $select.append('<option value="'+major+'">'+major+'</option>');
                });
                this._initedNewStudentModal = true;
            }
            this.$('.new-student-modal').find('select, input').val('');
            this.$('.new-student-modal').modal('show');
        },

        _confirmNewStudent: function (e) {
            var self = this;
            var $modal = self.$('.new-student-modal');
            var data = {
                name: $modal.find('.user-name input').val(),
                gender: $modal.find('.user-gender select').val(),
                grade: $modal.find('.user-grade select').val(),
                major: $modal.find('.user-major select').val(),
            };
            api.newStudent(data).then(function (student) {
                self.$('.new-student-modal').modal('hide');
                var newStudent = {
                    "studentPassword": student.password,
                    "studentGrade": student.grade,
                    "studentGender": student.gender,
                    "studentMajor": student.major,
                    "studentName": student.name,
                    "studentNo": student.id,
                };
                self.allStudensTable.bootstrapTable('prepend', newStudent);
            }); 
        },

        _updateStudent: function (data) {
            // console.log('data: ', data);
            api.updateStudent(data).then(function (student) {
                // console.log(student);
            });
        }
    });

    return new ManagerPage();
});