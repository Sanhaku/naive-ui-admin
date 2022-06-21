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
        <h1>投稿记录</h1>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage, NTag, useDialog } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { useRouter } from 'vue-router';
  import { listContributionsOfContributor, UpdateContribution } from '@/api/contribution';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';

  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();
  const dialog = useDialog();

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
      width: 200,
    },
    {
      title: '更新日期',
      key: 'updateDate',
      width: 160,
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
      width: 200,
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
            label: '查看',
            onClick: handleOpen.bind(null, record),
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '撤回',
            onClick: handleDelete.bind(null, record),
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const loadDataTable = async (res) => {
    const list = await listContributionsOfContributor();
    return { list, ...params, ...res };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function handleOpen(record: Recordable) {
    router.push({ name: 'contribution_index', params: { id: record.id } });
  }
  function handleEdit(record: Recordable) {
    router.push({ name: 'edit_contribution', params: { id: record.id } });
  }
  async function handleDelete(record: Recordable) {
    dialog.info({
      title: '提示',
      content: '你确定要撤回投稿吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        let params = record;
        params.status = 3;
        const res = await UpdateContribution(params);
        if (res) {
          message.success('撤回成功');
        }
      },
      onNegativeClick: () => {},
    });
  }
</script>

<style lang="less" scoped></style>
