import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentTextOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'myContribution';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/contributions',
    name: routeName,
    component: Layout,
    redirect: '/contributions/list',
    meta: {
      title: '我的稿件',
      isRoot: true,
      activeMenu: routeName,
      icon: renderIcon(DocumentTextOutline),
      permissions: ['contributor'],
      sort: 1,
    },
    children: [
      {
        path: 'list',
        name: 'my_contribution_list',
        meta: {
          title: '投稿记录',
          // hidden: true,
          keepAlive: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/contributor/contribution/list.vue'),
      },
      {
        path: 'index/:id',
        name: 'contribution_index',
        meta: {
          title: '稿件信息',
          hidden: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/contributor/contribution/index.vue'),
      },
      {
        path: 'create/:id/:name',
        name: 'create_contribution',
        meta: {
          title: '投稿',
          hidden: true,
          activeMenu: 'conference',
        },
        component: () => import('@/views/contributor/contribution/create.vue'),
      },
      {
        path: 'edit',
        name: 'edit_contribution',
        meta: {
          title: '修改稿件',
          hidden: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/contributor/contribution/edit.vue'),
      },
    ],
  },
];

export default routes;
