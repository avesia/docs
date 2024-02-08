<template>
        <ContentDoc :head="false">
            <template v-slot="{ doc }">
                <DocAreaHeader :title="doc.title" />
                <div class="flex">
                    <DocIndex />
                    <article class="article mx-3 my-3">
                        <ContentRenderer :value="doc" />
                    </article>
                </div>
            </template>
            <template #not-found>
                <ContentNotFound />
            </template>
        </ContentDoc>
</template>

<style>
.article h1,
.article h2,
.article h3,
.article h4,
.article h5,
.article h6 {
    margin-top: 1.5rem;
}

.article h1 {
    font-size: 2rem;
    line-height: 3rem;
    font-weight: bold;
}

.article h2 {
    font-size: 1.5rem;
    line-height: 3rem;
}

.article h3 {
    font-size: 1.25rem;
    line-height: 2.5rem;
}

.article p {
    margin: 10px 0;
}

.article a {
    text-decoration: underline;
}

.article h1 a, .article h2 a, .article h3 a {
    text-decoration: none;
}

.article h2 a:hover::before, .article h3 a:hover::before {
    content: '# '
}

.article img, .article video {
    display: block;
    max-width: 100%;
    margin: auto;
}

.article ul {
    list-style-type: disc;
    list-style-position: inside;
}
</style>
