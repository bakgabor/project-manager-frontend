module.exports = [
  // {
  //   name: 'authentication:login',
  //   path: '/authentication/login',
  //   component: 'pages/authentication/login.vue',
  // },
  // {
  //   name: 'authentication:signup',
  //   path: '/authentication/signup',
  //   component: 'pages/authentication/signup.vue',
  // },
  // {
  //   name: 'admin:tables',
  //   path: '/tables',
  //   component: 'pages/default/admin/tables',
  // },
  // {
  //   name: 'admin:forms',
  //   path: '/forms',
  //   component: 'pages/default/admin/forms',
  // },
  // {
  //   name: 'admin:profile',
  //   path: '/profile',
  //   component: 'pages/default/admin/profile',
  // },
  {
    name: 'project:table',
    path: '/project/table/list',
    component: 'pages/project/project-list',
  },
  {
    name: 'project:list:images',
    path: '/project/list',
    component: 'pages/project/projects',
  },
  {
    name: 'project:create',
    path: '/project/create',
    component: 'pages/project/project-create',
  },
  {
    name: 'project:view',
    path: '/project/page/:id',
    component: 'pages/project/project-page',
  },
]
