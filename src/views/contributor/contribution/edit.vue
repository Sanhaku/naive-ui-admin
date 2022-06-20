<template>
  <div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="投稿会议" path="conference">
              <n-input v-model:value="formValue.conference" placeholder="输入会议名称" disabled />
            </n-form-item>
            <n-form-item label="作者" path="name">
              <n-input v-model:value="formValue.name" placeholder="请输入姓名" disabled />
            </n-form-item>
            <n-form-item label="标题" path="title">
              <n-input placeholder="请输入标题" v-model:value="formValue.title" />
            </n-form-item>
            <n-form-item label="摘要" path="abstract">
              <n-input
                v-model:value="formValue.abstract"
                type="textarea"
                placeholder="请输入摘要"
              />
            </n-form-item>

            <n-form-item label="正文" path="img">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="uploadList"
                helpText="文件大小不超过20MB"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">提交</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';
  import { useUserStore } from '@/store/modules/user';
  import { createContribution, UpdateContribution } from '@/api/contribution';

  const globSetting = useGlobSetting();
  const router = useRouter();
  const userStore = useUserStore();
  const rules = {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    },
    conference: {
      required: true,
      message: '请输入会议名称',
      trigger: 'blur',
    },
    title: {
      required: true,
      message: '请输入标题',
      trigger: 'blur',
    },
    abstract: {
      required: true,
      message: '请输入摘要',
      trigger: 'blur',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const defaultValueRef = () => ({
    name:
      userStore.getUserInfo.firstName +
      ' ' +
      userStore.getUserInfo.midName +
      ' ' +
      userStore.getUserInfo.lastName,
    conference: router.currentRoute.value.params.name,
    title: '',
    abstract: '',
  });

  let formValue = reactive(defaultValueRef());
  const uploadList = ref([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);
  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
  });

  //TODO 文件上传
  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { title, abstract } = formValue;
        const params = {
          title,
          abstract,
          conferenceId: router.currentRoute.value.params.id,
          fileName,
        };
        const res = await UpdateContribution(params);
        if (res) {
          message.success('提交成功');
        }
      } else {
        message.error('请填写完整信息');
      }
    });
  }

  function resetForm() {
    formRef.value.restoreValidation();
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }

  function uploadChange(list: string[]) {
    console.log(list);
  }
</script>
