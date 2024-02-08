<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

    const route = useRoute();

    const path = ref("");

    const paths = route.path.split("/");

    path.value = `/${paths[1]}/${paths[2]}`;
    

    const query: QueryBuilderParams = {
        where: [{
            no_index: { $not: true },
            doc_type: { $not: 'info' }
        }]
    }
</script>

<template>
    <ul class="block min-w-80 py-3 px-8">
        <ContentList :query="query" :path="path">
            <template v-slot="{ list }">
                <li class="mb-1" v-for="article in list" :key="article._path">
                    <NuxtLink class="block rounded-md px-2 py-1" :to="article._path" :class="{'bg-blue-950 border-t border-t-blue-900 font-bold' : route.path == article._path}">
                        {{ article.title }}
                    </NuxtLink>
                </li>
            </template>
            <template #not-found>
            </template>
        </ContentList>
    </ul>
</template>
