import Vue from "vue";
import VueRouter from "vue-router";
import TrelloBoard from '@/views/TrelloBoard.vue'
import TaskView from '@/views/TaskView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "board",
    component: TrelloBoard,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: TaskView
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
}

);

export default router;
