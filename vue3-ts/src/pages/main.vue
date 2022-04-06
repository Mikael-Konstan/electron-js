<script setup lang="ts">
import { ref } from "vue";
import type { ElTree } from 'element-plus'

const rootPath = ref("D:/work/20220331_test/asset/erp");
const rootPathCur = ref("");

const treeData = ref<any[]>();

const treeRef = ref<InstanceType<typeof ElTree>>()

const confirm = async function () {
  // console.log(rootPath.value);
  rootPathCur.value = rootPath.value;
  // console.log(rootPath.value);
  const filePath = await (<any>window).electronAPI.getDirectory(
    rootPathCur.value
  );
  //   console.log(filePath);
  let arr: any = [];
  getTreeData(filePath, arr);
  treeData.value = arr;
  // console.log(treeData.value);
};
const build = function () {
  console.log("renderer process", "title");
  const checkedNodes = treeRef.value!.getCheckedNodes(false, false);
  //   const checkedKeys = this.$refs.tree.getCheckedKeys();
  //   const PathList = toRaw(checkedNodes);
  const PathList = JSON.parse(JSON.stringify(checkedNodes));
  //   console.log(PathList);
  (<any>window).electronAPI.buildPath(PathList);
};
const getTreeData = function(obj: any, arr: any[]) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== "string") {
      let item = {
        label: key,
        rootPath: obj.rootPath,
        children: [],
      };
      arr.push(item);
      getTreeData(obj[key], item.children);
    }
  });
};
</script>

<template>
  <div>
    <h1>build</h1>
    <div>
      <el-input
        v-model="rootPath"
        placeholder="Please input root path"
        clearable
        style="width: 360px"
      >
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="confirm()"
        >Update Root Path</el-button
      >
      <el-button type="primary" style="margin-left: 10px" @click="build()"
        >Build</el-button
      >
      <p style="min-height: 18px; margin-left:20%; text-align: left">
        Root Path: {{ rootPathCur }}
      </p>
    </div>
    <el-tree :data="treeData" show-checkbox ref="treeRef"></el-tree>
  </div>
</template>

<style scoped lang="less">
.pathList {
  text-align: left;
  div {
    div {
      padding-left: 20px;
    }
  }
}
</style>
