<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="标题"> 文章标题 </n-card>
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
          会议名称
        </n-descriptions-item>
        <n-descriptions-item label="作者">投稿人a</n-descriptions-item>
        <n-descriptions-item label="更新日期">2022-6-19</n-descriptions-item>
        <n-descriptions-item label="状态">
          <n-tag type="warning"> 审核中</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="摘要">
          Smart contract (SC) is an extension of BlockChain technology. Ethereum BlockChain was the
          first to incorporate SC and thus started a new era of crypto-currencies and electronic
          transactions. Solidity helps to program the SCs. Still, soon after Solidity’s emergence in
          2014, Solidity-based SCs suffered many attacks that deprived the SC account holders of
          their precious funds. The main reason for these attacks was the presence of
          vulnerabilities in SC. This paper discusses SC vulnerabilities and classifies them
          according to the domain knowledge of the faulty operations. This classification is a
          source of reminding developers and software engineers that for SC’s safety, each SC
          requires proper testing with effective tools to catch those classes’ vulnerabilities.
        </n-descriptions-item>
        <n-descriptions-item label="文件"><a>下载</a></n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="审核意见"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      -
    </n-card>
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
