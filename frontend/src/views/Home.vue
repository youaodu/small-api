<template>
  <div class="page-home flex-full">
    <dailog v-model="addGroupDialogVisible" title="项目分组管理" width="80%" confirmButtonText="确定" cancelButtonText="取消"
      @confirm="handleConfirm" @cancel="handleCancel">
      <template #header-right>
        <el-button class="btn-add" type="primary" :icon="Plus" @click="showDialog">
          新增项目
        </el-button>
      </template>
      <div class="dailog-content">
        <div class="dailog-content-title">
          按住可以拖动顺序
        </div>
        <!-- 列表 -->
        <VueDraggable ref="el" v-model="items">
          <div class="case-item" v-for="(item, index) in items" :key="index">
            <div class="case-item-title">{{ `分组${index + 1}` }}</div>
            <div class="group-btn">
              <el-button link type="warning" @click="() => handleDelete(index)">删除</el-button>
              <el-button link type="primary" @click="() => handleDelete(index)">编辑</el-button>
            </div>
          </div>
        </VueDraggable>
      </div>
    </dailog>
    <dailog v-model="editGroupDialogVisible" title="新建/编辑分组" width="80%" confirmButtonText="确定" cancelButtonText="取消">
      <p>新增组</p>
    </dailog>

    <el-row class="full-height-row">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="container">
          <div class="menu">
            <div class="menu-item menu-button"
              v-for="(item, index) in   [{ name: '所有项目', icon: 'icon-suoyou' }, { name: '星标项目', icon: 'icon-shoucang' }]  "
              :key="'menu' + index" @click="() => handleMune(index)">
              <i class="iconfont menu-item-icon" :class="[item.icon, { 'is-active': index == activeMenuIndex }]"></i>
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div class="left-menu">
            <div class="add-group">
              <div class="add-group-name">分组</div>
              <el-tooltip class="box-item" effect="dark" content="添加分组/管理分组" placement="top">
                <div class="add-group-new" @click="handleManageGroup()">+</div>
              </el-tooltip>
            </div>
            <ul>
              <li v-for="(  menuItem, index  ) in menuItems  " :key="'select-item' + index"
                :class="{ active: selectedIndex === index }" @click="handleSelect(index)">
                <i class="iconfont icon-list2f icon"></i>
                {{ menuItem.title }}
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="19">
        <div class="container-right">
          <div class="search-container">
            <el-input placeholder="请输入搜索关键词" @keyup.enter.native="handleSearch" v-model="searchText"></el-input>
            <el-icon class="el-icon--right" @click="handleSearch" :size="22">
              <i-ep-search />
            </el-icon>
          </div>
          <div class="tab">
            <div class="tab-name">
              {{ ['所有项目', '星标项目'][activeMenuIndex] }}
            </div>
            <div class="toggle-change">
              <div class="toggle-change-item" @click="toggleDisplayStyle" :class="{
                'active': displayStyle === 'list',
              }
                ">
                <i class="iconfont icon-list2f"></i>
              </div>
              <div class="toggle-change-item" @click="toggleDisplayStyle" :class="{
                'active': displayStyle === 'table',
              }
                ">
                <i class="iconfont icon-grid"></i>
              </div>
            </div>
          </div>
          <div :class="{
            'list-view': displayStyle === 'list',
            'table-view': displayStyle === 'table',
          }
            ">
            <div v-for="(  item, index  ) in   items  " :key="index" :class="{
              'list-item': displayStyle === 'list',
              'table-cell': displayStyle === 'table',
            }
              ">
              {{ item }}
            </div>
          </div>
          <el-button type="primary" @click="addGroupDialogVisible = true">
            新建项目
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { nextTick, onMounted, reactive, ref, toRefs } from "vue";
import { List, Plus } from "@element-plus/icons-vue";
import { VueDraggable } from 'vue-draggable-plus';
import dailog from "@/components/common/Dialog.vue";

let state = reactive({
  activeMenuIndex: 0,
  selectedIndex: -1,
  addGroupDialogVisible: false,
  searchText: "",
  editGroupDialogVisible: false,
  // 新增组
  displayStyle: "list",
  // 默认为列表样式
});

const menuItems = ref([
  {
    title: "分组一",
    path: "/home",
  },
  {
    title: "分组二",
    path: "/services",
  },
  {
    title: "分组三",
    path: "/about",
  },
  // 可以继续添加更多菜单项
]);

const { activeMenuIndex, selectedIndex, addGroupDialogVisible, searchText, editGroupDialogVisible, displayStyle } = toRefs(state);

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]);
const el = ref();

//一级菜单选择
const handleMune = (index) => {
  state.activeMenuIndex = index;
};

// 分组
const handleSelect = (index) => {
  selectedIndex.value = index;
};

// 新增/管理分组
const handleManageGroup = () => {
  addGroupDialogVisible.value = true;
};

const handleSearch = () => {
  // 在这里处理搜索逻辑
  console.log("搜索关键词:", searchText.value);
  // 执行搜索操作...
};

const handleConfirm = () => {
  console.log('确实');
};

const handleCancel = () => {
  console.log('取消');
};

//新增组
const showDialog = () => {
  editGroupDialogVisible.value = true;
};

// 切换列表
const toggleDisplayStyle = () => {
  displayStyle.value = displayStyle.value === "list" ? "table" : "list";
}
</script>
<style lang="scss" scoped>
.page-home {
  background-color: var($bs_page_bgColor);
}

.full-height-row {
  display: flex;
  height: 100%;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  background-color: $bs_gray_bgColor;
}

.menu {
  background-color: $bs_menu_gray_bgColor;
  width: 72px;
  height: 100%;

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    box-sizing: border-box;
    font-weight: 500;

    &-icon {
      margin-top: 8px;
    }

    &-icon.is-active {
      color: $bs_primary_color; // 选中时的背景色
    }
  }

  // 基础按钮样式
  .menu-button {
    padding: 12px 20px;
    font-size: $bs_small_font_size;
    background-color: $bs_menu_gray_bgColor; // 默认背景色
    color: $bs-font-color;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease; // 平滑过渡效果

    // 按下时的即时样式
    &:active {
      background-color: #ccc; // 按下时的背景色
      transform: translateY(1px); // 可选，按下时的微小位移效果
    }

    // 获得焦点时的样式，提升可访问性
    &:focus {
      outline: 2px solid $bs_primary_color; // 焦点轮廓
      box-shadow: 0 0 3px rgba(77, 166, 255, 0.5); // 可选的阴影效果
    }
  }
}

.left-menu {
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  .add-group {
    padding: 4px 2px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: $bs-font-color;
    font-size: $bs_small_font_size;

    &-new {
      font-size: $bs_large_font_size;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
    border-radius: 4px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    font-size: $bs_font_size;
    color: $bs-font-text;

    .icon {
      margin-right: 12px;
    }
  }

  li:hover {
    color: $bs_primary_color;

    /* 维持文本颜色不变 */
    .icon {
      color: $bs_primary_color;
    }
  }

  li.active {
    background-color: $bs_fog_blue_color;
    color: $bs_primary_color;
    /* 示例中的激活颜色 */

    .icon {
      color: $bs_primary_color;
    }
  }
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;

  .right {
    display: flex;
    align-items: center;

    .btn-add {
      margin-right: 8px;
      flex-shrink: 0;
      width: 100px;
    }
  }
}

.search-container {
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 8px 11px;
  background-color: $bs_white_bgColor;

  .el-input {
    width: 100%;
    margin-right: 10px;
  }

  .el-button {
    height: 32px;
  }
}

.container-right {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: $bs_extra_light_gary;

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 8px 0;

    &-name {
      font-size: $bs-font-title;
      color: $bs-font-text;
      font-weight: 500;
    }

    .toggle-change {
      display: flex;
      border: $bs_primary_color solid 2px;
      border-radius: 4px;

      &-item {
        height: 26px;
        width: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $bs_primary_color;
      }

      .active {
        background-color: $bs_primary_color;
        color: #fff;
      }
    }
  }

  .list-view {
    display: flex;
    flex-direction: column;
  }

  .table-view {
    display: flex;
    flex-wrap: wrap;
    /* 允许换行 */
    gap: 10px;
    /* 间距，可根据需要调整 */
  }

  .list-item {
    border: $bs_light_gray solid 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: $bs_white_bgColor;
    padding: 10px;
    box-sizing: border-box;
  }

  .table-cell {
    flex: 0 0 calc(33.3333% - 10px);
    /* 占据1/3空间减去间距，保证换行时对齐 */
    min-width: 100px;
    /* 设置最小宽度，防止正方形过小 */
    aspect-ratio: 1 / 1;
    /* 维持宽高比为1:1 */
    border: $bs_light_gray solid 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: $bs_white_bgColor;
    padding: 10px;
    box-sizing: border-box;
  }
}

.search-container {
  ::v-deep(.el-input) {
    margin-right: 0px;
  }

  ::v-deep(.el-input__wrapper) {
    box-shadow: none;
    padding: 0px;
  }

  ::v-deep(.el-input__wrapper:hover) {
    box-shadow: none;
  }
}

.dailog-content {
  width: 100%;

  .case-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: $bs_defalut_bg;
    border-bottom: $bs_extra_light_gary solid 1px;
  }

  .case-item:last-child {
    border: none;
  }

  &-title {
    text-align: left;
    width: 100%;
    font-size: $bs_small_font_size;
    color: $bs-font-text;
  }
}
</style>
