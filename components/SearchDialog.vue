<script setup lang="ts">
    import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js';
    import type { SearchResult } from "@/server/api/search.json.get";

    const fuseOptions: IFuseOptions<SearchResult> = {
        includeMatches: true,
        keys: [
            "body",
            "title",
        ]
    }

    const input: Ref<HTMLInputElement | null> = ref(null);
    const results: Ref<FuseResult<SearchResult>[]> = ref([]);
    const files: Ref<SearchResult[]> = ref([]);

    onMounted(() => {
        input.value?.focus();
    })


    useFetch<SearchResult[]>("/api/search.json").then(d => {
        if (d.data.value) {
            files.value = d.data.value
        }
    })

    function search() {
        if (files.value && input.value) {
            const fuse = new Fuse(files.value, fuseOptions);

            results.value = fuse.search(input.value.value);
        }
    }
</script>

<template>
    <div class="searcharea_bg" @click="$emit('dialog-close')">

    </div>
    <div class="searcharea bg-slate-900 rounded-xl shadow-lg border-2 border-slate-600 overflow-x-hidden">
        <div class="flex flex-col h-full">
            <label class="flex items-center gap-4 w-full bg-slate-800 px-5 py-3 cursor-text">
                <img src="/avesia3d3.svg" alt="avesia" class="block w-6 select-none">
                <input ref="input" type="text" placeholder="Search" class="block flex-grow bg-transparent focus:outline-none placeholder:text-slate-400" @input="search">
            </label>
            <div class="block flex-grow overflow-y-auto">
                <ul>
                    <li v-for="result of results">
                        <NuxtLink class="flex items-center justify-start gap-3 px-5 py-2 mb-1 hover:bg-slate-600" :to="result.item.path" @click="$emit('dialog-close')">
                            <p>{{ result.item.title }}</p>
                            <div class="flex-grow flex gap-1 opacity-50 overflow-hidden">
                                <p class="overflow-hidden truncate" v-for="match of result.matches">
                                    {{ match.value }}
                                </p>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.searcharea_bg {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgb(255 255 255 / 0.3);

    z-index: 99;
}

.searcharea {
    position: fixed;
    top: 50%;
    left: 50%;

    display: block;

    width: 640px;
    height: 400px;

    z-index: 100;
    transform: translate(-50%, -50%);
}
</style>
