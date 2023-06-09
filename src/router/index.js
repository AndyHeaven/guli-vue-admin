import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
//首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
// ]
// /**
//  * 动态路由
//  */
// export const asyncRoutes = [
  // 讲师管理路由
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑讲师', icon: 'tree' },
        hidden: true,

      }
    ]
  },
    // 课程分类管理路由
    {
      path: '/subject',
      component: Layout,
      redirect: '/subject/list',
      name: '课程分类管理',
      meta: { title: '课程分类管理', icon: 'el-icon-s-help' },
      children: [
        {
          path: 'list',
          name: '课程分类列表',
          component: () => import('@/views/edu/subject/list'),
          meta: { title: '课程分类列表', icon: 'table' }
        },
        {
          path: 'save',
          name: '添加课程分类',
          component: () => import('@/views/edu/subject/save'),
          meta: { title: '添加课程分类', icon: 'tree' }
        },
      ]
    },
    // 添加课程路由
    {
      path: '/course',
      component: Layout,
      redirect: '/course/list',
      name: '课程管理',
      meta: { title: '课程管理', icon: 'example' },
      children: [
        {
          path: 'list',
          name: '课程列表',
          component: () => import('@/views/edu/course/list'),
          meta: { title: '课程列表', icon: 'table' }
        },
        {
          path: 'info',
          name: '添加课程',  
          component: () => import('@/views/edu/course/info'),
          meta: { title: '添加课程', icon: 'tree' }
        },
        {
          path: 'info/:id',
          name: 'EduCourseInfoEdit',
          component: () => import('@/views/edu/course/info'),
          meta: { title: '编辑课程基本信息', noCache: true },
          // 当设置 true 的时候该路由不会再侧边栏出现
          hidden: true
        },
        {
          path: 'chapter/:id',
          name: 'EduCourseChapterEdit',
          component: () => import('@/views/edu/course/chapter'),
          meta: { title: '编辑课程大纲', noCache: true },
          hidden: true
        },
        {
          path: 'publish/:id',
          name: 'EduCoursePublishEdit',
          component: () => import('@/views/edu/course/publish'),
          meta: { title: '发布课程', noCache: true },
          hidden: true
        }
      ]
    },
    {
      path: '/sta',
      component: Layout,
      redirect: '/sta/create',
      name: '统计分析',
      meta: { title: '统计分析', icon: 'example' },
      children: [
        {
          path: 'create',
          name: '生成数据',
          component: () => import('@/views/sta/create'),
          meta: { title: '生成数据', icon: 'table' }
        },
        {
          path: 'show',
          name: '图表显示',
          component: () => import('@/views/sta/show'),
          meta: { title: '图表显示', icon: 'tree' }
        }
      ]
    },
    {
      path: '/acl',
      component: Layout,
      redirect: '/acl/user/list',
      name: '权限管理',
      meta: { title: '权限管理', icon: 'chart' },
      children: [
        {
          path: 'user/list',
          name: '用户管理',
          component: () => import('@/views/acl/user/list'),
          meta: { title: '用户管理' }
        },
        {
          path: 'role/list',
          name: '角色管理',
          component: () => import('@/views/acl/role/list'),
          meta: { title: '角色管理' }
        },
        {
          path: 'role/form',
          name: '角色添加',
          component: () => import('@/views/acl/role/form'),
          meta: { title: '角色添加' },
          hidden: true
        },
        {
          path: 'role/update/:id',
          name: '角色修改',
          component: () => import('@/views/acl/role/form'),
          meta: { title: '角色修改' },
          hidden: true
        },
        {
          path: 'role/distribution/:id',
          name: '角色权限',
          component: () => import('@/views/acl/role/roleForm'),
          meta: { title: '角色权限' },
          hidden: true
        },
        {
          path: 'menu/list',
          name: '菜单管理',
          component: () => import('@/views/acl/menu/list'),
          meta: { title: '菜单管理' }
        },
        {
          path: 'user/add',
          name: '用户添加',
          component: () => import('@/views/acl/user/form'),
          meta: { title: '用户添加' },
          hidden: true
        },
        {
          path: 'user/update/:id',
          name: '用户修改',
          component: () => import('@/views/acl/user/form'),
          meta: { title: '用户修改' },
          hidden: true
        },
        {
          path: 'user/role/:id',
          name: '用户角色',
          component: () => import('@/views/acl/user/roleForm'),
          meta: { title: '用户角色' },
          hidden: true
        }
  
      ]
    },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
