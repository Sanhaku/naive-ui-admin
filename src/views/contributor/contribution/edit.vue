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
              <n-input v-model:value="formValue.conferenceId" placeholder="输入会议名称" disabled />
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
              <n-upload
                directory-dnd
                action=""
                accept="application/pdf"
                :custom-request="customRequest"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                      <UploadOutlined />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0"> 上传文件大小不超过10M </n-p>
                </n-upload-dragger>
              </n-upload>
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
  import { ref, unref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { UploadCustomRequestOptions, useMessage } from 'naive-ui';
  import { UploadOutlined } from '@vicons/antd';
  import { useUserStore } from '@/store/modules/user';
  import { showContribution, UpdateContribution } from '@/api/contribution';
  import { getUploadUrl } from '@/api/oss';

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

  const defaultValueRef = () => ({
    name:
      userStore.getUserInfo.firstName +
      ' ' +
      userStore.getUserInfo.midName +
      ' ' +
      userStore.getUserInfo.lastName,
    conferenceId: '',
    title: '',
    abstract: '',
    filename: '',
  });

  let formValue = reactive(defaultValueRef());

  const customRequest = async ({ file }: UploadCustomRequestOptions) => {
    const res = await getUploadUrl({ filename: file.name });
    console.log(res);
    if (res) {
      const filename = res.filename;
      const url = res.url;
      formValue.filename = filename;
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.onload = function () {
        alert(`Loaded: ${xhr.status} ${xhr.response}`);
        if (xhr.status == 200) {
          message.success('上传成功');
        } else {
          message.error('上传失败，请重新尝试');
        }
      };
      xhr.send(file.file);
    }
  };

  onMounted(async () => {
    const data = await showContribution(router.currentRoute.value.params.id);
    formValue.abstract = data.abstract;
    formValue.filename = data.filename;
    formValue.title = data.title;
    formValue.conferenceId = data.conferenceId;
  });

  function formSubmit() {
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { title, abstract, filename } = formValue;
        const params = {
          title,
          abstract,
          conferenceId: router.currentRoute.value.params.id,
          filename,
        };
        const res = await UpdateContribution(params);
        if (res) {
          message.success('修改成功');
          router.replace({ name: 'my_contribution_list' });
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
</script>
