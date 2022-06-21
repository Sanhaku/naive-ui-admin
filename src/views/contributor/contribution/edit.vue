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
                :action="uploadUrl"
                method="PUT"
                :headers="headers"
                accept="application/pdf"
                @before-upload="beforeUpload"
                @finish="finish"
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
  import { useMessage } from 'naive-ui';
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
  let uploadUrl = ref('');
  const headers = { token: userStore.getToken };

  async function beforeUpload({ file, fileList }) {
    const fileInfo = file.file;
    const fileType = ['application/pdf'];
    const maxSize = 10;
    // 设置最大值，则判断
    if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
      message.error(`上传文件最大值不能超过${maxSize}M`);
      return false;
    }
    // 设置类型,则判断
    if (!fileType.includes(fileInfo.type)) {
      message.error('只能上传pdf格式的文件');
      return false;
    }
    const res = await getUploadUrl({ filename: file.name });
    console.log(res);
    if (res) {
      formValue.filename = res.filename;
      // uploadUrl.value = '/upload' + res.url.slice(42);
      uploadUrl.value = res.url;
      file.name = res.filename;
      return true;
    }
    message.error('上传失败，请稍后再试');
    return false;
  }

  function finish({ event: Event }) {
    const res = eval('(' + Event.target.response + ')');
    console.log('finish: ', res);
  }

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
          router.push({ name: 'my_contribution_list' });
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
