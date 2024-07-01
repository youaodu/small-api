import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: "Icon", // 添加图标解析器
        }),
        ElementPlusResolver(),
      ],
    }),
    Components({
      // 配置Element Plus采用saas样式配色系统
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"], // 允许使用Element Plus图标集
        }),
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    }),
    // 配置Icons插件以支持图标自动安装
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // 这里将 @ 设置为 src 目录的别名
      "@components": "/src/components", // 也可以为特定的子目录设置别名
      // 更多别名...
    },
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `
        @use "@/assets/styles/mixin.scss" as *; 
      `,
      },
    },
  },
});
