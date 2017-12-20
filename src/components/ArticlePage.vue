<template>
    <div>
        <div class="loading" v-if="loading">
            Lade...
        </div>
        <div v-else>
            <h1>{{ article.title }}</h1>
            <p>{{ article.abstract }}</p>
            <div class="content"><vue-markdown :source="article.content"></vue-markdown></div>
            <div class="tags"><article-tags :tags="article.tags"></article-tags></div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../http';

    export default {
        props: ['id'],
        data() {
            return {
                loading: false,
                article: {},
            }
        },
        created: function () {
            this.loading = true
            HTTP.get('articles/' + this.id)
                .then(response => {
                    this.article = response.data
                    this.loading = false
                })
                .catch(e => {
                    console.error(e)
                })
        },
        methods: {
            markdown: function (value) {
                //return value;
                if (!value) return ''
                return markdown.toHTML(value)
            }
        }
    }

</script>

<style scoped>

</style>
