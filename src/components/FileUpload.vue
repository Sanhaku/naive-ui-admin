<template>
  <n-upload
    multiple
    directory-dnd
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :max="1"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <UploadOutlined />
        </n-icon>
      </div>
      <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0"> 上传文件大小不超过20M </n-p>
    </n-upload-dragger>
  </n-upload>
</template>

<script lang="ts" setup>
  import { UploadOutlined } from '@vicons/antd';
</script>
