import { createWebHistory, createRouter } from "vue-router";
import Index from "../screen/IndexScreen.vue";
import BackStage from "../screen/BackStageScreen.vue";
import Preview from "../screen/PreviewArticleScreen.vue";
import NotFound from "../screen/NotFound.vue";
import Login from "../screen/LoginScreen.vue";
const webHistory = createWebHistory();
const routes = [
  { path: "/", redirect: "/index" },
  { path: "/index", component: Index },
  { path: "/login", component: Login },
  { path: "/backstage", component: BackStage },
  { path: "/preview", component: Preview },
  { path: "/:notfound(.*)", component: NotFound },
];

const router = createRouter({
  history: webHistory,
  routes,
});
export default router;
