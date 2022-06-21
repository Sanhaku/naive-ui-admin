<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <h1>稿件列表</h1>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage, NTag } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { useRouter } from 'vue-router';
  import { listContributionsforReviewer } from '@/api/contribution';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';

  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();

  const params = ref({
    pageSize: 10,
  });

  const columns = [
    {
      title: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '投稿会议',
      key: 'conferenceId',
      width: 100,
    },
    {
      title: '标题',
      key: 'title',
      width: 160,
    },
    {
      title: '文件',
      key: 'filename',
      width: 160,
    },
    {
      title: '更新日期',
      key: 'updateDate',
      width: 120,
      render(row) {
        return formatDate(row.updateDate, FormatsEnums.YMDHIS);
      },
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      render(row) {
        return h(
          NTag,
          {
            type: getStatusColor(row.status),
          },
          {
            default: () => {
              switch (row.status) {
                case -1:
                  return '待审核';
                case 1:
                  return '通过';
                case 2:
                  return '拒绝';
                case 3:
                  return '已撤回';
                case 4:
                  return '需要修改';
                default:
                  return '审核中';
              }
            },
          }
        );
      },
    },
    {
      title: '审稿意见',
      key: 'comment',
      width: 160,
    },
  ];

  function getStatusColor(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'error';
      case 3:
        return '';
      default:
        return 'warning';
    }
  }

  const actionColumn = reactive({
    width: 100,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '审阅',
            onClick: handleOpen.bind(null, record),
          },
        ],
      });
    },
  });

  const loadDataTable = async (res) => {
    const list = await listContributionsforReviewer();
    return { list, ...params, ...res };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function handleOpen(record: Recordable) {
    router.push({ name: 'contribution_review', params: { id: record.id } });
  }
</script>

<style lang="less" scoped></style>
