<template>
    <el-dialog v-model="dialogVisible" :width="width" @closed="onClosed">
        <template #header="{ close, titleId }">
            <div class="my-header">
                <div :id="titleId" :class="titleClass">{{ title }}</div>
                <div class="right">
                    <!-- <el-button class="btn-add" type="primary" :icon="Plus" @click="showDialog">
                        新增项目
                    </el-button> -->
                    <slot name="header-right"></slot>
                </div>
            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="$emit('update:modelValue', false)">{{ cancelButtonText }}</el-button>
                <el-button type="primary" @click="onConfirm">{{ confirmButtonText }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '提示'
    },
    width: {
        type: String,
        default: '50%'
    },
    confirmButtonText: {
        type: String,
        default: '确定'
    },
    cancelButtonText: {
        type: String,
        default: '取消'
    }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'closed']);

const dialogVisible = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        dialogVisible.value = newValue;
    }
);

const onClosed = () => {
    emit('update:modelValue', false);
    emit('closed');
};

const onConfirm = () => {
    emit('confirm');
};
</script>
<style lang="scss" scoped>
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
</style>