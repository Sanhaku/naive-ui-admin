import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ListOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'conference';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/conferences',
    name: routeName,
    component: Layout,
    redirect: '/conferences/list',
    meta: {
      title: '会议',
      isRoot: true,
      activeMenu: routeName,
      icon: renderIcon(ListOutline),
      permissions: ['contributor'],
      sort: 0,
    },
    children: [
      {
        path: 'list',
        name: 'conference_list',
        meta: {
          title: '会议列表',
          activeMenu: routeName,
          affix: true,
          // keepAlive: true,
          // hidden: true,
        },
        component: () => import('@/views/contributor/conference/list.vue'),
      },
      {
        path: 'index/:id',
        name: 'conference_index',
        meta: {
          title: '会议详情',
          hidden: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/contributor/conference/index.vue'),
      },
    ],
  },
];

export default routes;
