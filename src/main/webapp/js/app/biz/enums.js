define(function(require, exports, module) {
    
    var enums = {
        grade: [1,2,3,4],
        grade_string: ['1','2','3','4'],
        major: [
            'Chinese Language and Literature',
            'Foreign Language and Literature',
            'History',
            'Philosophy',
            'Journalism',
            'Law',
            'Economics',
            'Management',
            'Mathematical Sciences',
            'Physics',
            'Chemistry',
            'Computer and Science',
            'Software',
            'Medical Science'
        ],
        roleMap: {
            teacher: "教师",
            student: "学生",
            manager: "教务员",
        },
        genderMap: {
            'M': '男',
            'F': '女'
        },
        weekdays: ['A', 'B', 'C', 'D', 'E'],
        wdsMap: {
            'A': '周一',
            'B': '周二',
            'C': '周三',
            'D': '周四',
            'E': '周五',
        },
    };

    return enums;
});