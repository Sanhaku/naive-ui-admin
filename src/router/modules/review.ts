import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentsOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'review';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/review',
    name: routeName,
    component: Layout,
    redirect: '/review/list',
    meta: {
      title: '审稿',
      isRoot: true,
      activeMenu: routeName,
      icon: renderIcon(DocumentsOutline),
      permissions: ['reviewer'],
      sort: 1,
    },
    children: [
      {
        path: 'list',
        name: 'reviewer_contributions',
        meta: {
          title: '稿件列表',
          activeMenu: routeName,
          keepAlive: true,
          // hidden: true,
        },
        component: () => import('@/views/reviewer/contributionList.vue'),
      },
      {
        path: 'index/:id',
        name: 'contribution_review',
        meta: {
          title: '审阅稿件',
          hidden: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/reviewer/contribution.vue'),
      },
    ],
  },
];

export default routes;
