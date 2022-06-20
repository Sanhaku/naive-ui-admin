import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ListOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'reviewConference';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/conferences',
    name: routeName,
    component: Layout,
    redirect: '/conferences/list',
    meta: {
      title: '参审会议',
      isRoot: true,
      activeMenu: routeName,
      icon: renderIcon(ListOutline),
      permissions: ['reviewer'],
      sort: 0,
    },
    children: [
      {
        path: 'list',
        name: 'reviewer_conferences',
        meta: {
          title: '参审会议列表',
          activeMenu: routeName,
          affix: true,
          keepAlive: true,
          // hidden: true,
        },
        component: () => import('@/views/reviewer/conferenceList.vue'),
      },
      {
        path: 'index/:id',
        name: 'conference_detail',
        meta: {
          title: '会议详情',
          hidden: true,
          activeMenu: routeName,
        },
        component: () => import('@/views/reviewer/conference.vue'),
      },
    ],
  },
];

export default routes;
