<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="投稿须知">
        1)来稿务必重点突出，论据充分，数据可靠，文字简练。每篇论文(含图、表、参考文献、英文摘要)一般不超过6000字(有创新性的论文可适当放宽要求，但要突出创新点)。论文必须包括(按顺序)：题目、摘要、关键词(3～8个)、分类号、正文、参考文献。中文题名不超过20个汉字，文章格式参见论文模版。
        2)论文摘要应尽量写成报道性摘要，包括研究的目的、方法、结果和结论。切忌把应在引言中出现的内容写入摘要，不要对论文内容作自我评价。采用第3人称的写法，不要使用“本文”、“作者”等作主语，建议采用“为了（针对，根据）......对......进行研究（分析）”、“阐述……过程，提出......观点”等，以200～300字左右为宜。
        3)文稿用5号宋体，量和单位符号等必须符合国家标准的规定。稿中外文字母、符号必须分清大、小写、正、斜体，上、下角的字母、数码和符号要清晰，矩阵、矢量用黑体表示。
        4)文中图、表只附最必要的，凡能用文字说明的尽量不用图表。
        5)来稿如不符合上述要求，编辑部将先退请作者修改后再送审。
      </n-card>
    </div>
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
  import { createContribution } from '@/api/contribution';

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
        const res = await createContribution(params);
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
