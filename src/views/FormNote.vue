<script setup lang="ts">

import { ref } from "vue";
import { Notes } from "../data-store";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const title = ref("");
const content = ref("");
const id = Number(route.params.id);
const note = Notes.find((i) => i.id === id);

if(note) {
    title.value = note.title;
    content.value = note.content
}

const submit = () => {
    note ? update(note) : save();
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
</script>

<template>
<div class="w-1/2 mx-auto absolute left-1/2 transform -translate-x-1/2 ">
        <header class="flex justify-between py-2">
          <h1 class="text-2xl font-bold">{{note ? 'Edit' : 'Add'}} Note</h1>
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
  