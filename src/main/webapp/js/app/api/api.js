define(function(require, exports, module){
    var debug = false;
    var $ = require('jquery');
    var xk = require('biz/xk');

    $.ajaxSetup({
        beforeSend: function(){
            $('.body-loading-box').show();
        },
        complete: function(){
            $('.body-loading-box').hide();
        }
    });
    
    function checkResponse(json) {
        var res;
        if(json.code === 'core.ok') {
            res = true;
        } else {
            res = false;
        }
        return res;
    }

    function API () {
        this._urlprefix = '/services/csms';
    }

    API.prototype.fake = function(fakeData) {
        var def = $.Deferred();
        // $('.body-loading-box').show();
        setTimeout(function(){
            // $('.body-loading-box').hide();
            def.resolve(fakeData);
        }, 0);

        return def.promise();
    }

    API.prototype.getRole = function(data) {

        if (debug) {
            // return this.fake({
            //     id: '10000@role',
            //     isLogin: 'true',
            //     loginId: '10000',
            //     name: 'David',
            //     password: 'lajksdhfsdf',
            //     loginType: 'teacher'
            // });
            return this.fake({
                isLogin: 'false'
            });
        } else {
            var def = $.Deferred();

            var url = this._urlprefix + '/login/Current';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.user);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.login = function(data) {
        if (debug) {
            var role = $('.user-role > select').val();
            return this.fake({
                role: role
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/login/Login';
            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        } 
    }

    API.prototype.logout = function(data) {
        if (debug) {
            return this.fake({});
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/login/Logout';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        } 
    }

    API.prototype.changepwd = function(data) {
        if (debug) {
            return this.fake({});
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/login/ChangePwd';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        } 
    }

    API.prototype.getProfile = function(data) {
        if (debug) {
            return this.fake({
                username: '费曼先生',
                gender: 'M',
                grade: 2
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/' + xk.role + '/ById';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.submitProfile = function(data) {
        if (debug) {
            return this.fake({});
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/' + xk.role + '/Update';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }
    
    // teacher api
    
    API.prototype.teacherGetPenddingCourses = function(data) {
        console.log(data);
        if (debug) {
            return this.fake([
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 200,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化1",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PENDING",
                    "courseEnrollment": 2,
                    "id": 401,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-29 14:28:08.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:35.0",
                    "courseSize": 160,
                    "teacherNo": "10002",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化2",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PENDING",
                    "courseEnrollment": 0,
                    "id": 501,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-28 19:05:03.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 2,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化3",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PENDING",
                    "courseEnrollment": 0,
                    "id": 601,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A1,A2,B1,E1",
                    "createDate": "2016-05-28 19:05:03.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/List';
            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.newCourse = function(data) {
        if (debug) {
            return this.fake({
                "updateDate": "1464521046000",
                "courseSize": "3",
                "teacherNo": "",
                "courseRestrictionGrade": "1,2",
                "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                "courseCredits": "3",
                "coursePeriod": "64",
                "name": "Korean History",
                "courseEnrollment": "0",
                "id": "2401",
                "deadline": "2016-01-01 00:00:00.0",
                "applyTime": "C1,C2,C3,C4",
                "status": "PENDING",
                "createDate": "1464521046000"
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/New';
            
            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.submitScore = function(data) {
        if (debug) {
            return this.fake({
                "updateDate": "1464522089000",
                "courseGrade": "85",
                "studentNo": "2013001004",
                "id": "2301",
                "evaluationGrade": "70",
                "courseId": "701",
                "createDate": "1464522089000"
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/teacher/RecordCourseGrade';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.studentCourse);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.teacherGetPassedCourses = function(data) {
        if (debug) {
            return this.fake([
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 200,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化1",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 2,
                    "id": 401,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-29 14:28:08.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:35.0",
                    "courseSize": 160,
                    "teacherNo": "10002",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化2",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 501,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-28 19:05:03.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 2,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化3",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 601,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A1,A2,B1,E1",
                    "createDate": "2016-05-28 19:05:03.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/List';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }
    
    API.prototype.teacherGetCourseStudents = function(courseId) {
        if (debug) {
            return this.fake([
                {
                    "studentNo": "2012002002",
                    "studentGrade": "4",
                    "studentGender": "M",
                    "studentMajor": "Foreign Language and Literature",
                    "studentName": "Adam Rippion",
                    "id": '123',
                    'courseGrade': -1,
                },
                {
                    "studentNo": "2013001004",
                    "studentGrade": "3",
                    "studentGender": "M",
                    "studentMajor": "Chinese Language and Literature",
                    "studentName": "Joushua Farris",
                    "id": '321',
                    'courseGrade': 88,
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/teacher/StudentList';

            $.ajax({
                url: url,
                data: {courseId: courseId},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.student);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    // student api
    API.prototype.studentGetUnchoosedCourses = function(data) {
        if (debug) {
            return this.fake([
                {
                    "id": 401,
                    "courseRestrictionGrade": "1,2,4",
                    "coursePeriod": 64,
                    "roomDetails": [
                        {
                            "roomNo": "2101",
                            "roomTime": "A5",
                            "building": "No.2 Teaching Building",
                            "roomDetail": "A5@Handan-No.2 Teaching Building-2101",
                            "campus": "Handan"
                        },
                        {
                            "roomNo": "2101",
                            "roomTime": "A6",
                            "building": "No.2 Teaching Building",
                            "roomDetail": "A6@Handan-No.2 Teaching Building-2101",
                            "campus": "Handan"
                        },
                        {
                            "roomNo": "2104",
                            "roomTime": "D1",
                            "building": "No.2 Teaching Building ",
                            "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2104",
                            "campus": "Zhangjiang"
                        }
                    ],
                    "courseNo": "111",
                    "courseCredits": 3,
                    "courseSize": 22,
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseEnrollment": 180,
                    "teacherName": "Lori Nichol",
                    "courseName": "语言文化"
                },
                {
                    "id": 1201,
                    "courseRestrictionGrade": "1,2,4",
                    "coursePeriod": 64,
                    "roomDetails": [
                        {
                            "roomNo": "2102",
                            "roomTime": "D1",
                            "building": "No.2 Teaching Building ",
                            "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2102",
                            "campus": "Zhangjiang"
                        }
                    ],
                    "courseNo": "222",
                    "courseCredits": 3,
                    "courseSize": 111,
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseEnrollment": 1,
                    "teacherName": "Shae-lynn Bourne",
                    "courseName": "时间重复测试"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/BrowseCourse';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.studentGetChoosedCourses = function(data) {
        if (debug) {
            return this.fake([
                {
                    "courseId": 401,
                    "studentCourseId": 1305,
                    "courseRestrictionGrade": "1,2,4",
                    "coursePeriod": 64,
                    "roomDetails": [
                        {
                            "roomNo": "2101",
                            "roomTime": "A5",
                            "building": "No.2 Teaching Building",
                            "roomDetail": "A5@Handan-No.2 Teaching Building-2101",
                            "campus": "Handan"
                        },
                        {
                            "roomNo": "2101",
                            "roomTime": "A6",
                            "building": "No.2 Teaching Building",
                            "roomDetail": "A6@Handan-No.2 Teaching Building-2101",
                            "campus": "Handan"
                        },
                        {
                            "roomNo": "2104",
                            "roomTime": "D1",
                            "building": "No.2 Teaching Building ",
                            "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2104",
                            "campus": "Zhangjiang"
                        }
                    ],
                    "courseNo": "111",
                    "courseCredits": 3,
                    "courseSize": 22,
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseEnrollment": 180,
                    "teacherName": "Lori Nichol",
                    "courseName": "语言文化",
                    "evaluationGrade": "70",
                    "courseGrade": "100"
                },
                {
                    "courseId": 1201,
                    "studentCourseId": 1306,
                    "courseRestrictionGrade": "1,2,4",
                    "coursePeriod": 64,
                    "roomDetails": [
                        {
                            "roomNo": "2102",
                            "roomTime": "D1",
                            "building": "No.2 Teaching Building ",
                            "roomDetail": "D1@Zhangjiang-No.2 Teaching Building -2102",
                            "campus": "Zhangjiang"
                        }
                    ],
                    "courseNo": "222",
                    "courseCredits": 3,
                    "courseSize": 111,
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseEnrollment": 1,
                    "teacherName": "Shae-lynn Bourne",
                    "courseName": "时间重复测试",
                    "evaluationGrade": "70",
                    "courseGrade": '-1'
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/ListCourse';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.chooseCourse = function(data) {
        if (debug) {
            return this.fake({
                "updateDate": "1464445048000",
                "courseGrade": "0",
                "studentNo": "2012002002",
                "id": "1801",
                "evaluationGrade": -1,
                "courseId": "701",
                "createDate": "1464445048000"
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/SelectCourse';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.studentCourse);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.cancleCourse = function(data) {
       if (debug) {
           return this.fake({
               
           });
       } else {
           var def = $.Deferred();
           var url = this._urlprefix + '/student/DropCourse';
           $.ajax({
               url: url,
               data: data,
               method: 'GET',
               success: function (json) {
                   var res = checkResponse(json);
                   if (res) {
                       def.resolve(json);
                   } else {
                       alert(json.reason);
                       def.reject();
                   }
               },
               error: function (err) {
                   console.log(err);
                   def.reject(err);
               }
           });

           return def.promise();
       }
    }

    API.prototype.evaluateCourse = function(data) {
       if (debug) {
           return this.fake({
                "updateDate": "1464503692000",
                "courseGrade": "0",
                "studentNo": "2013001004",
                "id": "2301",
                "evaluationGrade": "70",
                "courseId": "701",
                "createDate": "1464503692000"
            });
       } else {
           var def = $.Deferred();
           var url = this._urlprefix + '/student/EvaluateCourse';
           $.ajax({
               url: url,
               data: data,
               method: 'GET',
               success: function (json) {
                   var res = checkResponse(json);
                   if (res) {
                       def.resolve(json.studentCourse);
                   } else {
                       alert(json.reason);
                       def.reject();
                   }
               },
               error: function (err) {
                   console.log(err);
                   def.reject(err);
               }
           });

           return def.promise();
       }
    }
    
    // manager api
    API.prototype.getUncommitedCourse = function() {
        if (debug) {
            return this.fake([
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 200,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化1",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 2,
                    "id": 401,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-29 14:28:08.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:35.0",
                    "courseSize": 160,
                    "teacherNo": "10002",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化2",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "REJECTED",
                    "courseEnrollment": 0,
                    "id": 501,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-28 19:05:03.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 2,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化3",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 601,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A1,A2,B1,E1",
                    "createDate": "2016-05-28 19:05:03.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/List';

            $.ajax({
                url: url,
                data: {status: 'PENDING'},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.assignRoom = function(data) {
        if (debug) {
            return this.fake([
                {
                    "id": 5,
                    "roomTime": "A5",
                    "idle": "1",
                    "courseId": 401,
                    "roomId": 10000,
                    'roomName': 'room-name-1'
                },
                {
                    "id": 60,
                    "roomTime": "B3",
                    "idle": "1",
                    "courseId": 402,
                    "roomId": 10001,
                    'roomName': 'room-name-2'
                },
                {
                    "id": 115,
                    "roomTime": "D1",
                    "idle": "1",
                    "courseId": 403,
                    "roomId": 10002,
                    'roomName': 'room-name-3'
                },
                {
                    "id": 170,
                    "roomTime": "A5",
                    "idle": "1",
                    "courseId": 404,
                    "roomId": 10003,
                    'roomName': 'room-name-4'
                },
                {
                    "id": 225,
                    "roomTime": "E2",
                    "idle": "1",
                    "courseId": 405,
                    "roomId": 10004,
                    'roomName': 'room-name-5'
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/RoomList';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.room);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.passCourse = function(data) {
        if (debug) {
            return this.fake({
                
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/Pass';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.getCommitedCourse = function() {
        if (debug) {
            return this.fake([
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 200,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化1",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 2,
                    "id": 401,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-29 14:28:08.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:35.0",
                    "courseSize": 160,
                    "teacherNo": "10002",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化2",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 501,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-28 19:05:03.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 2,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化3",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 601,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A1,A2,B1,E1",
                    "createDate": "2016-05-28 19:05:03.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/List';
            $.ajax({
                url: '',
                data: {status: 'PASSED'},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.getAllCourse = function() {
        if (debug) {
            return this.fake([
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 200,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化1",
                    "courseNo": "No.123123",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 2,
                    "id": 401,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-29 14:28:08.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:35.0",
                    "courseSize": 160,
                    "teacherNo": "10002",
                    "courseRestrictionGrade": "1,2,4",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化2",
                    "courseNo": "No.258008",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 501,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A5,A6,B4,E8",
                    "createDate": "2016-05-28 19:05:03.0"
                },
                {
                    "updateDate": "2016-05-22 13:45:02.0",
                    "courseSize": 2,
                    "teacherNo": "10000",
                    "courseRestrictionGrade": "1,2",
                    "courseRestrictionMajor": "Chinese Language and Literature,Foreign Language and Literature",
                    "courseName": "语言文化3",
                    "courseNo": "No.9034589",
                    "courseCredits": 3,
                    "coursePeriod": 64,
                    "courseStatus": "PASSED",
                    "courseEnrollment": 0,
                    "id": 601,
                    "deadline": "2016-07-01 00:00:00.0",
                    "applyTime": "A1,A2,B1,E1",
                    "createDate": "2016-05-28 19:05:03.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/course/List';
            $.ajax({
                url: url,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.course);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }
    
    API.prototype.managerGetCourseStudents = function(courseId) {
        if (debug) {
            return this.fake([
                {
                    "studentNo": "2012002002",
                    "studentGrade": "4",
                    "studentGender": "M",
                    "studentMajor": "Foreign Language and Literature",
                    "studentName": "Adam Rippion",
                    "id": '123',
                    'evaluationGrade': 70,
                    'courseGrade': -1,
                },
                {
                    "studentNo": "2013001004",
                    "studentGrade": "3",
                    "studentGender": "F",
                    "studentMajor": "Chinese Language and Literature",
                    "studentName": "Joushua Farris",
                    "id": '321',
                    'evaluationGrade': -1,
                    'courseGrade': 88,
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/manager/StudentList';

            $.ajax({
                url: url,
                data: {courseId: courseId},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.studentCourse);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.getAllStudents = function() {
        if (debug) {
            return this.fake([
                {
                    "studentPassword": "ttV1+yXOYAPQZ/mf3ufsVQ==",
                    "studentGrade": "4",
                    "updateDate": "2016-01-01 00:00:00.0",
                    "studentGender": "F",
                    "studentMajor": "Chinese Language and Literature",
                    "studentName": "Ashley Wagner",
                    "studentNo": "2012001003",
                    "createDate": "2016-05-26 15:07:11.0"
                },
                {
                    "studentPassword": "nJhRM108OcUYiYQ8RfUj5A==",
                    "studentGrade": "4",
                    "updateDate": "2016-01-01 00:00:00.0",
                    "studentGender": "M",
                    "studentMajor": "Foreign Language and Literature",
                    "studentName": "Adam Rippion",
                    "studentNo": "2012002002",
                    "createDate": "2016-05-26 15:07:11.0"
                },
                {
                    "studentPassword": "3cPm+qj+vmcYUGpOTfqhYA==",
                    "studentGrade": "4",
                    "updateDate": "2016-01-01 00:00:00.0",
                    "studentGender": "F",
                    "studentMajor": "History",
                    "studentName": "Lily Brown",
                    "studentNo": "2012003004",
                    "createDate": "2016-05-26 15:07:11.0"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/List';
            $.ajax({
                url: url,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.student);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.managerGetStudentCourses = function (studentNo) {
        if (debug) {
            return this.fake([
                {
                    "courseNo": "111",
                    "evaluationGrade": 88,
                    "courseId": 401,
                    "courseGrade": 59,
                    "courseName": "语言文化"
                },
                {
                    "courseNo": "222",
                    "evaluationGrade": -1,
                    "courseId": 1301,
                    "courseGrade": -1,
                    "courseName": "时间冲突测试"
                }
            ]);
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/manager/CourseList';
            $.ajax({
                url: url,
                data: {studentNo: studentNo},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.studentCourse);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.newStudent = function(data) {
        if (debug) {
            return this.fake({
                "id": "2016000000",
                "name": "studentNew",
                "gender": "M",
                "grade": "1",
                "createDate": "1464699449000",
                "password": "d5ltOXj0E6/LBlxdR2EPTA==",
                "updateDate": "1464699449000",
                "major": "Chinese Language and Literature"
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/New';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.student);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.deleteStudent = function(id) {
        if (debug) {
            return this.fake({});
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/Delete';

            $.ajax({
                url: url,
                data: {id: id},
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.student);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    API.prototype.updateStudent = function(data) {
        if (debug) {
            return this.fake({
                "id": "2017000000",
                "name": "eee",
                "gender": "F",
                "grade": "4",
                "createDate": "1465135127000",
                "password": "BFzUURsqb4uC1cUQ0F8c4A==",
                "updateDate": "1465135127000",
                "major": "Chinese Language and Literature"
            });
        } else {
            var def = $.Deferred();
            var url = this._urlprefix + '/student/Update';

            $.ajax({
                url: url,
                data: data,
                method: 'GET',
                success: function (json) {
                    var res = checkResponse(json);
                    if (res) {
                        def.resolve(json.student);
                    } else {
                        alert(json.reason);
                        def.reject();
                    }
                },
                error: function (err) {
                    console.log(err);
                    def.reject(err);
                }
            });

            return def.promise();
        }
    }

    return new API();
});