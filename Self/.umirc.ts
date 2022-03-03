import { defineConfig } from 'umi';

export default defineConfig({
  theme: {
    "primary-color": "#1DA57A",
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
