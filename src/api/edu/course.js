import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/edu-course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/edu-teacher/findAll',
            method: 'get'
        })
    },//根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/edu-course/getCourseInfo/' + id,
            method: 'get'
        })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/edu-course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //课程确认信息显示
    getPublishCourseInfo(id) {
        return request({
            url: '/eduservice/edu-course/getPublishCourseInfo/' + id,
            method: 'get',
        })
    },
    //课程最终发布
    publishCourse(id) {
        return request({
            url: '/eduservice/edu-course/publishCourse/' + id,
            method: 'post',
        })
    },
    //TODO 课程列表
    //1、分页查询）current 当前页 limit每页显示的数量，courseQuery条件对象
    getCourseListPage(current, limit, courseQuery) {
        return request({
            url: `/eduservice/edu-course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端用RequestBody获取数据
            //data表示把对象转换成json传递到接口中
            data: courseQuery
        })
    },
    //删除课程
    deleteCourseById(id) {
        return request({
            url: `/eduservice/edu-course/${id}`,
            method: 'delete',
        })
    },

}
