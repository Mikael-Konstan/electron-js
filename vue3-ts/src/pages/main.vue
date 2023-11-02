<script setup lang="ts">
import { ref } from "vue";
import type { ElTree } from 'element-plus'

const rootPath = ref("D:/work/20220331_test/asset/erp");

const treeData = ref(111);

const test = function () {
  console.log("renderer process", "title");
  (<any>window).electronAPI.execShellCommand(111, 222);
};
</script>

<template>
  <div>
    <h1>Test</h1>
    <div>
      <el-button type="primary" @click="test()">Button Test</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
