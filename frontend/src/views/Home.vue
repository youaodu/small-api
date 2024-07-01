<template>
  <div class="page-home flex-full">
    <el-dialog v-model="visible" :show-close="false" width="500">
      <template #header="{ close, titleId }">
        <div class="my-header">
          <div :id="titleId" :class="titleClass">项目分组管理</div>
          <div class="right">
            <el-button class="btn-add" type="primary" :icon="Plus">
              新增项目
            </el-button>
            <el-icon :size="20" @click="close">
              <i-ep-close />
            </el-icon>
          </div>
        </div>
      </template>
      This is dialog content.
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-row class="full-height-row">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="container">
          <div class="menu">
            <div
              class="menu-item menu-button"
              v-for="(item, index) in ['所有项目', '星标项目']"
              :key="'menu' + index"
              @click="() => handleMune(index)"
            >
              <div
                class="menu-item-icon"
                :class="index == activeMenuIndex && 'is-active'"
              />
              <div>{{ item }}</div>
            </div>
          </div>
          <div class="left-menu">
            <div class="add-group">
              <div class="add-group-name">分组</div>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="添加分组/管理分组"
                placement="top"
              >
                <div class="add-group-new" @click="handleManageGroup()">+</div>
              </el-tooltip>
            </div>
            <ul>
              <li
                v-for="(menuItem, index) in menuItems"
                :key="'select-item' + index"
                :class="{ active: selectedIndex === index }"
                @click="handleSelect(index)"
              >
                <div class="icon" />
                {{ menuItem.title }}
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="19">
        <div class="container-aa">22</div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, ref, toRefs } from "vue";
import { Plus } from "@element-plus/icons-vue";

let state = reactive({
  activeMenuIndex: 0,
  selectedIndex: -1,
  visible: false,
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

const { activeMenuIndex, selectedIndex, visible } = toRefs(state);

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
  visible.value = true;
};
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
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
    &-icon.is-active {
      background-color: $bs_primary_color; // 选中时的背景色
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
      background-color: #ffffff;
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }
  }

  li:hover {
    color: $bs_primary_color; /* 维持文本颜色不变 */
    .icon {
      background-color: $bs_primary_color;
    }
  }
  li.active {
    background-color: $bs_fog_blue_color;
    color: $bs_primary_color; /* 示例中的激活颜色 */

    .icon {
      background-color: $bs_primary_color;
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
.container-aa {
  height: 100%;
}
</style>
