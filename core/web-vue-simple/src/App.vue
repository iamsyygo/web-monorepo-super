<template>
  <el-tree :indent="indent" show-checkbox :data="data" :props="defaultProps" @node-click="handleNodeClick">
    <template v-slot:default="{ node }">
      <dTreeLine showLine :node="node" :indent="indent">
        <template v-slot:label-append>
          <el-button type="primary" size="small">操作</el-button>
        </template>
      </dTreeLine>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { ElTree, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
import { dTreeLine } from '@components/vue';
import '@components/vue/lib/d-tree-line.vue_vue_type_style_index_0_scoped_1a8acc2d_lang.css';
import { ref } from 'vue';
interface Tree {
  label: string;
  children?: Tree[];
}

const indent = ref(50);

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  { label: '北京市', children: [{ label: '北京市' }] },
  {
    label: '天津市',
    children: [
      {
        label: '天津市',
      },
    ],
  },
  {
    label: '河北省',
    children: [
      {
        label: '石家庄市',
      },
      {
        label: '唐山市',
      },
      {
        label: '秦皇岛市',
      },
      {
        label: '邯郸市',
      },
      {
        label: '邢台市',
      },
      {
        label: '保定市',
      },
      {
        label: '张家口市',
      },
      {
        label: '承德市',
      },
      {
        label: '沧州市',
      },
      {
        label: '廊坊市',
      },
      {
        label: '衡水市',
      },
    ],
  },
  {
    label: '山西省',
    children: [
      {
        label: '太原市',
      },
      {
        label: '大同市',
      },
      {
        label: '阳泉市',
      },
      {
        label: '长治市',
      },
      {
        label: '晋城市',
      },
      {
        label: '朔州市',
      },
      {
        label: '晋中市',
      },
      {
        label: '运城市',
      },
      {
        label: '忻州市',
      },
      {
        label: '临汾市',
      },
      {
        label: '吕梁市',
      },
    ],
  },
  {
    label: '内蒙古自治区',
    children: [
      {
        label: '呼和浩特市',
      },
      {
        label: '包头市',
      },
      {
        label: '乌海市',
      },
      {
        label: '赤峰市',
      },
      {
        label: '通辽市',
      },
      {
        label: '鄂尔多斯市',
      },
      {
        label: '呼伦贝尔市',
      },
      {
        label: '巴彦淖尔市',
      },
      {
        label: '乌兰察布市',
      },
      {
        label: '兴安盟',
      },
      {
        label: '锡林郭勒盟',
      },
      {
        label: '阿拉善盟',
      },
    ],
  },
  {
    label: '辽宁省',
    children: [
      {
        label: '沈阳市',
      },
      {
        label: '大连市',
      },
      {
        label: '鞍山市',
        children: [
          {
            label: '呼和浩特市',
          },
          {
            label: '包头市',
          },
          {
            label: '乌海市',
          },
          {
            label: '赤峰市',
          },
          {
            label: '通辽市',
          },
          {
            label: '鄂尔多斯市',
          },
          {
            label: '呼伦贝尔市',
          },
          {
            label: '巴彦淖尔市',
          },
          {
            label: '乌兰察布市',
          },
          {
            label: '兴安盟',
          },
          {
            label: '锡林郭勒盟',
          },
          {
            label: '阿拉善盟',
          },
        ],
      },
      {
        label: '抚顺市',
      },
      {
        label: '本溪市',
      },
      {
        label: '丹东市',
      },
      {
        label: '锦州市',
      },
      {
        label: '营口市',
      },
      {
        label: '阜新市',
      },
      {
        label: '辽阳市',
      },
      {
        label: '大连市',
      },
      {
        label: '鞍山市',
      },
      {
        label: '抚顺市',
      },
      {
        label: '本溪市',
      },
      {
        label: '丹东市',
      },
      {
        label: '锦州市',
      },
      {
        label: '营口市',
      },
      {
        label: '阜新市',
      },
      {
        label: '辽阳市',
      },
    ],
  },
];

const defaultProps = {
  children: 'children',
  label: 'label',
};
</script>

<style lang="scss">
$--element-tree-line-color: #dcdfe6 !default;
$--element-tree-line-style: dashed !default;
$--element-tree-line-width: 1px !default;
// 添加 el-tree-node__conten 默认没有的 position
.el-tree .el-tree-node__content {
  position: relative;
}

.element-tree-node-label-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}
.element-tree-node-label {
  font-size: 12px;
}
.element-tree-node-line-ver {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-left: $--element-tree-line-width $--element-tree-line-style $--element-tree-line-color;
  &.last-node-isLeaf-line {
    height: 50%;
  }
}
.element-tree-node-line-hor {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  height: 0;
  border-bottom: $--element-tree-line-width $--element-tree-line-style $--element-tree-line-color;
}
.element-tree-node-label-line {
  flex: 1;
  border-top: $--element-tree-line-width $--element-tree-line-style $--element-tree-line-color;
  align-self: center;
  margin: 0 10px;
}
</style>
