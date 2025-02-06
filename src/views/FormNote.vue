<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Notes } from "../data-store";
import NoteService from "../service/NoteService";

const route = useRoute();
const router = useRouter();
let title = ref("");
let content = ref("");
const noteId = Number(route.params.id);
const note = Notes.find((i) => i.id === noteId);

if(note) {
    title.value = note.title;
    content.value = note.content
}


onMounted(() => {
    //  noteId = Number(route.params.id);
    //  noteId && getNoteById(noteId);
})

//get note by id with api
// const getNoteById = async (id: number) => {
//     try {
//         const note = await NoteService.getNote(id);
//         title.value = note.title;
//         content.value = note.content;
//     } catch (error) {
//         console.error(error);
//     }
// }

const submit = () => {
    noteId ? update(note) : save();
};

const save = () => {
    if (title.value.trim()) {
    Notes.push(
        {
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            title: title.value,
            content: content.value,
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString()
        }
    );
    router.push("/");
  }
}

const update = (note: any) => {
    if(title.value.trim()) {
        note.title = title.value;
        note.content = content.value;
        note.updatedDate = new Date().toISOString();
    router.push("/");
    }
}

//save with api
// const save = async () => {
//     if (title.value ) {
//         try {
//             await NoteService.createNote({title: title.value, content: content.value});
//         } catch (error) {
//             console.error(error, "error");
//         }
//     } else {
//         return alert("Title is required");
//     }
//     router.push("/");
// }

//update with api
// const update = async () => {
//     if (title.value) {
//         try {
//             await NoteService.updateNote(noteId, {title: title.value, content: content.value, id: noteId});
//         } catch (error) {
//             console.error(error, "error");
//         }
//     } else {
//         return alert("Title is required");
//     }
//     router.push("/");


// }
</script>

<template>
<div class="w-1/2 mx-auto absolute left-1/2 transform -translate-x-1/2 ">
        <header class="flex justify-between py-2">
          <h1 class="text-2xl font-bold">{{noteId ? 'Edit' : 'Add'}} Note</h1>
          <section class="flex gap-4">
              <button class="bg-gray-500 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 rounded" @click="$router.push({ name: 'note' })"  >Back</button>
              <button class="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded" @click="submit">Save</button>

          </section>
        </header>
        <form class="bg-white shadow-md rounded flex flex-col gap-6 p-4">
            <div class="mb-6">

                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title *" required v-model="title">

                <p class="text-red-500 text-xs italic" v-if="!title">Please Enter Title.</p>
            </div>

            <div class="mb-6">
                <textarea class="shadow appearance-none w-full mb-6" name="content" v-model="content" id="content" placeholder="Content" cols="30" rows="5"></textarea>
            </div>

        </form>
    </div>
  </template>
  
  <style>

  </style>
  