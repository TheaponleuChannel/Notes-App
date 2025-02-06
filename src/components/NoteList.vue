<script setup lang="ts">
import router from '../router'
import { Notes } from '../data-store';
import { onMounted, ref } from 'vue';
import NoteService from '../service/NoteService';

    const dataArray = ref<any[]>(Notes);
    let notes = ref<any[]>([]);

    // Delete note with api
    // const deleteNote = async (id: number) => {
    //   try {
    //     await NoteService.deleteNote(id);
    //     fetchNotes();
    //   } catch {
    //     console.error('Error deleting note');
    //   }
    // }

    const deleteNote = (index: number) => {
      dataArray.value.splice(index, 1);
    }

    const navigateToForm = () => {
        return router.push({ name: 'add' })
    }

    const convertDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-CA', { 
          year: 'numeric', 
          day: '2-digit', 
          month: '2-digit',
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true 
        });
    }

    const edit = (note: any) => {
        return router.push({ name: 'edit'+ note.id })
    }


    // Fetch notes
    // const fetchNotes = async () => {
    // try {
    //   // notes.value = await NoteService.getNotes();
    //   notes.value = await NoteService.getNotes();
    // } catch (error) {
    //     console.error('Error fetching notes:', error);
    // }
    // };


  // onMounted(fetchNotes);
  onMounted(() => {
    notes.value = Notes;
  })


</script>

<template>
    <div class="container mx-auto">
      <header class="flex justify-between container p-4">
          <h1 class="text-2xl font-bold">My Notes</h1>
          <section>
              <button class="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"  @click="navigateToForm"  >Add Note</button>
          </section>
      </header>
      <div v-if="notes.length" class="flex flex-wrap justify-center gap-6 p-4 rounded-xl box-shadow ">
        <section  v-for="(note, index) in dataArray" :key="index" class="w-96 content" >
          <div class="card rounded-xl bg-blue-100 border-2 border-indigo-500" >
            <section class="bg-white rounded-xl flex justify-between items-center p-2 ">
              <div>
                <h2 class="text-xl font-bold">
                  {{note.title}}
                </h2>
              </div>
              <div class="flex gap-4 opacity-0 action ">
                <router-link :to="'/edit/' + note.id" class="cursor-pointer text-green-500 text-xl tooltip " title='Edit'>
                    <i class="fa fa-edit"></i>
                </router-link>

                <button class="cursor-pointer text-red-500 text-xl tooltip" title='Delete' @click="deleteNote(index)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </section>
            <article class="h-[100px] p-2 break-words overflow-hidden">
              <span class="w-full text-blue-600  overflow-hidden text-ellipsis line-clamp-3" >
                {{note.content}}
              </span>
            </article>
            <section class="flex justify-between items-center p-2">
              <p class="text-blue-500 opacity-80 text-xs">Created: {{convertDate(note.createdDate)}}</p>
              <p class="text-blue-500 opacity-80 text-xs">Updated: {{convertDate(note.updatedDate)}}</p>
            </section>
          </div>
  
        </section>

      </div>
      <div v-else class="text-center p-4 rounded-xl box-shadow">
        <p>No note found</p>
      </div>
    </div>
  
</template>

<style>
.box-shadow {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.content:hover .action {
  opacity: 100;
  transition: opacity 0.3s ease-in-out;
}
</style>