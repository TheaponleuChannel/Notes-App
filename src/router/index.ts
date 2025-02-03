import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import NoteList from '@/components/NoteList.vue'
import FormNote from '@/views/FormNote.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'note',
    component: NoteList
  },
  {
    path: '/add',
    name: 'add',
    component: FormNote
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: FormNote
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
