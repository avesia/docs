<script setup lang="ts">
    const props = defineProps({
        title: String,
    })

    const route = useRoute();
    
    const link = ref("");
    const name = ref("avesia3d Docs");

    useHead({
        title: `${props.title} - ${name.value}`
    })

    const paths = route.path.split("/");

    link.value = `/${paths[1]}/${paths[2]}`;

    if (paths.length >= 3) {
        queryContent(paths[1], paths[2]).where({
            _type: "markdown",
            doc_type: "info"
        }).findOne().then((info) => {
            if (info.title) {
                name.value = info.title;

                useHead({
                    title: `${props.title} - ${name.value}`
                })
            }
        })
    }
</script>

<template>
    <header class="flex items-center justify-start gap-5 pt-5 pb-1 px-8">
        <p class="text-3xl font-bold"><NuxtLink :to="link">{{ name }}</NuxtLink></p>
    </header>
</template>
