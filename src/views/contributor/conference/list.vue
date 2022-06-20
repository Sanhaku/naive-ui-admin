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
        <h1>会议列表</h1>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { useRouter } from 'vue-router';
  import { listAllConferences } from '@/api/conference';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';

  const router = useRouter();
  const message = useMessage();
  const actionRef = ref();

  const columns = [
    {
      title: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '会议名称',
      key: 'name',
      width: 200,
    },
    {
      title: '地点',
      key: 'location',
      width: 100,
    },
    {
      title: '开始日期',
      key: 'startDate',
      width: 160,
      render(row) {
        return formatDate(row.startDate, FormatsEnums.YMD);
      },
    },
    {
      title: '结束日期',
      key: 'endDate',
      width: 160,
      render(row) {
        return formatDate(row.endDate, FormatsEnums.YMD);
      },
    },
    {
      title: '会议链接',
      key: 'url',
      width: 200,
    },
  ];

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
            label: '查看详情',
            onClick: handleOpen.bind(null, record),
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  });
  const params = reactive({
    pageSize: 5,
  });
  const loadDataTable = async (res) => {
    const list = await listAllConferences();
    return { list, ...params, ...res };
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function handleOpen(record: Recordable) {
    router.push({ name: 'conference_index', params: { id: record.id } });
  }
</script>

<style lang="less" scoped></style>
