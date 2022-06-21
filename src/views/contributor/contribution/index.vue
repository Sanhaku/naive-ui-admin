<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="标题"> {{ contribution.title }} </n-card>
    </div>
    <n-card
      :bordered="false"
      title="基本信息"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions label-placement="left" class="py-2" :column="1">
        <n-descriptions-item>
          <template #label>投稿会议</template>
          {{ conferenceName }}
        </n-descriptions-item>
        <n-descriptions-item label="作者">{{ contribution.userId }}</n-descriptions-item>
        <n-descriptions-item label="更新日期">{{
          formatDate(contribution.updateDate, FormatsEnums.YMDHIS)
        }}</n-descriptions-item>
        <n-descriptions-item label="状态">
          <n-tag :type="getStatusColor(contribution.status)">
            {{ getStatus(contribution.status) }}</n-tag
          >
        </n-descriptions-item>
        <n-descriptions-item label="摘要">
          {{ contribution.abstract }}
        </n-descriptions-item>
        <n-descriptions-item label="正文"
          ><a>{{ contribution.filename }}</a></n-descriptions-item
        >
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="审稿意见"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      {{ contribution.comment }}
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { showConference } from '@/api/conference';
  import { showContribution } from '@/api/contribution';
  import { Contribution } from '@/model/contribution';
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';

  const router = useRouter();

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

  function getStatus(status) {
    switch (status) {
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
  }
  const contribution = reactive(new Contribution());
  let conferenceName = ref('');
  onMounted(async () => {
    const data = await showContribution(router.currentRoute.value.params.id);
    contribution.set(data);
    const { name } = await showConference(contribution.conferenceId);
    conferenceName.value = name;
  });
</script>

<style lang="less" scoped></style>
