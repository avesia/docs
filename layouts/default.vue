<script setup lang="ts">

const currentUrl = ref("");

if (process.client) {
    currentUrl.value = window.location.pathname;
}

const localePath = useLocalePath();

const { locale } = useI18n();

const searchIsOpen = ref(false);

function openSearch() {
    searchIsOpen.value = true;
}

</script>

<template>
    <div>
        <div class="flex w-full max-w-7xl mx-auto items-center justify-end gap-5 px-8 py-1 text-sm">
            <p><NuxtLink class="hover:opacity-75" to="https://www.avesia3d.com">{{ $t("Back to avesia3d.com") }}</NuxtLink></p>
            <p><NuxtLink class="hover:opacity-75" to="https://www.avesia3d.com/discord">{{ $t("Join the communtiy") }}</NuxtLink></p>
        </div>
    </div>
    <header class="flex w-full max-w-7xl mx-auto items-center justify-between px-8 py-3 gap-14">
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
            <img src="/avesia3d3.svg" alt="avesia3d" class="block w-8">
            <p>{{ $t("Docs") }}</p>
        </NuxtLink>
        <div class="flex-grow flex items-center justify-center">
            <button @click="openSearch" class="flex-grow flex items-center justify-start gap-3 bg-gray-400 hover:bg-gray-100 bg-opacity-20 hover:bg-opacity-20 px-3 py-1 text-left cursor-pointer"><KeyButtonView>Ctrl</KeyButtonView><KeyButtonView>K</KeyButtonView><span class="block">{{ $t("Search docs") }}</span></button>
        </div>
        <ul class="flex items-center gap-5">
            <li><NuxtLink class="hover:opacity-75" :to="localePath('/guides')">{{ $t("Guides") }}</NuxtLink></li>
            <li><NuxtLink class="hover:opacity-75" :to="localePath('/report-bugs')">{{ $t("Report bugs") }}</NuxtLink></li>
            <li><NuxtLink class="hover:opacity-75" :to="localePath('/roadmaps')">{{ $t("Roadmaps") }}</NuxtLink></li>
        </ul>
    </header>
    <main class="content-main w-full max-w-7xl mx-auto min-h-[80vh]">
        <slot></slot>
    </main>
    <footer class="my-2 w-full max-w-7xl mx-auto px-8 py-8">
        <img src="/avesia3d3.svg" alt="avesia3d" class="block w-8">
        <p class="text-xl">avesia3d</p>
    </footer>
    <ClientOnly>
        <SearchDialog v-if="searchIsOpen" @dialog-close="() => searchIsOpen = false" />
    </ClientOnly>
</template>

<style>
.content-main * {
    user-select: text;
}
</style>
