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
        <n-descriptions-item label="摘要">
          {{ contribution.abstract }}
        </n-descriptions-item>
        <n-descriptions-item label="正文"
          ><a :href="url">{{ contribution.filename }}</a></n-descriptions-item
        >
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="审阅结果"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-form
        :label-width="80"
        :model="contribution"
        :rules="rules"
        label-placement="left"
        ref="formRef"
        class="py-8"
      >
        <n-form-item label="结果" path="title">
          <n-radio-group v-model:value="contribution.status" name="radiogroup">
            <n-space>
              <n-radio v-for="result in results" :key="result.value" :value="result.value">
                {{ result.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="审稿意见" path="abstract">
          <n-input
            v-model:value="contribution.comment"
            type="textarea"
            placeholder="请输入审稿意见"
          />
        </n-form-item>

        <div style="margin-left: 80px">
          <n-space>
            <n-button type="primary" @click="formSubmit">提交</n-button>
            <n-button @click="handleCancel">取消</n-button>
          </n-space>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { showConference } from '@/api/conference';
  import { showContribution, UpdateContribution } from '@/api/contribution';
  import { Contribution } from '@/model/contribution';
  import { onMounted, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { formatDate, FormatsEnums } from '@/utils/dateUtil';
  import { useMessage } from 'naive-ui';
  import { getDownloadUrl } from '@/api/oss';

  const router = useRouter();

  const results = [
    {
      value: 4,
      label: '需要修改',
    },
    {
      value: 1,
      label: '通过',
    },
    {
      value: 2,
      label: '拒绝',
    },
  ];

  const rules = {
    status: {
      required: true,
    },
    comment: {
      required: true,
      message: '请输入审稿意见',
      trigger: 'blur',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();

  const contribution = reactive(new Contribution());
  let conferenceName = ref('');
  let url = ref('');

  onMounted(async () => {
    const data = await showContribution(router.currentRoute.value.params.id);
    contribution.set(data);
    const { name } = await showConference(contribution.conferenceId);
    conferenceName.value = name;
    contribution.status = 4;
    const res = await getDownloadUrl({ filename: contribution.filename });
    url.value = res.url;
  });

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const res = await UpdateContribution(contribution);
        if (res) {
          message.success('提交成功');
          router.replace({ name: 'reviewer_contributions' });
        }
      } else {
        message.error('请填写完整信息');
      }
    });
  }

  function handleCancel() {
    router.replace({ name: 'reviewer_contributions' });
  }
</script>

<style lang="less" scoped></style>
