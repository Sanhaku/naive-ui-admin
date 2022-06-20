<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" :title="conference.name">
        {{ conference.description }}
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="会议信息"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item label="id">
          {{ conference.id }}
        </n-descriptions-item>
        <n-descriptions-item label="开始日期">
          {{ formatDate(conference.startDate, FormatsEnums.YMD) }}
        </n-descriptions-item>
        <n-descriptions-item label="结束日期">
          {{ formatDate(conference.endDate, FormatsEnums.YMD) }}
        </n-descriptions-item>
        <n-descriptions-item label="地点">
          {{ conference.location }}
        </n-descriptions-item>
        <n-descriptions-item label="会议链接">
          <div class="flex items-center">
            <a :href="conference.url" class="py-2" target="_blank">{{ conference.url }}</a>
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <br /><br />
    <div style="width: 300px; margin: auto">
      <n-button type="primary" @click="handleCreate" size="large" block> 投稿 </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { showConference } from '@/api/conference';
  import { Conference } from '@/model/conference';
  import { onMounted, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';
  export interface schemaItem {
    field: string;
    label: string;
  }
  const router = useRouter();

  const conference = reactive(new Conference());

  onMounted(async () => {
    const data = await showConference(router.currentRoute.value.params.id);
    conference.set(data);
  });

  function handleCreate() {
    router.push({
      name: 'create_contribution',
      params: { id: conference.id, name: conference.name },
    });
  }
</script>

<style lang="less" scoped></style>
