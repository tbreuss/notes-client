<template>
    <div>
        <h4>Artikel hinzufügen</h4>
        <div class="form-group">
            <label for="title">Titel</label>
            <input v-model="article.title" type="text" :class="getClass('title')" id="title" ref="title">
            <div class="invalid-feedback">{{ errors.title }}</div>
        </div>
        <div class="form-group">
            <label for="abstract">Abstract</label>
            <textarea v-model="article.abstract" :class="getClass('abstract')" id="abstract"></textarea>
            <div class="invalid-feedback">{{ errors.abstract }}</div>
        </div>
        <div class="form-group">
            <label for="content">Content</label>
            <textarea v-model="article.content" :class="getClass('content')" id="content" rows="10" cols="10"></textarea>
            <div class="invalid-feedback">{{ errors.content }}</div>
        </div>
        <div class="form-group">
            <vue-markdown :source="article.content"></vue-markdown>
        </div>
        <div class="form-group">
            <label for="tags">Tags</label>
            <input v-model="article.tags" type="text" :class="getClass('tags')" id="tags">
            <div class="invalid-feedback">{{ errors.tags }}</div>
        </div>
        <button type="button" class="btn btn-primary" @click="submit" ref="submit">Speichern</button>
        <button type="button" class="btn btn-link" @click="reset" ref="reset">Zurücksetzen</button>
    </div>
</template>

<script>
    import {HTTP} from '../http';

    export default {
        data() {
            return {
                article: {
                    title: '',
                    abstract: '',
                    content: '',
                    tags: ''
                },
                errors: {},
                formSent: false
            }
        },
        computed: {},
        methods: {
            reset: function () {
                this.formSent = false
                this.article = {
                    title: '',
                    abstract: '',
                    content: '',
                    tags: ''
                }
            },
            submit: function () {
                this.$refs.reset.disabled = true
                this.$refs.submit.disabled = true
                this.formSent = true
                var config = {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }
                HTTP.post('add-article', this.article, config)
                    .then(response => {
                        this.$refs.reset.disabled = false
                        this.$refs.submit.disabled = false
                        var success = response.data.success
                        if (!success) {
                            this.errors = response.data.errors
                        } else {
                            this.$router.push('/articles')
                        }
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            getClass: function (field) {
                if (!this.formSent) {
                    return 'form-control'
                }
                if (field in this.errors) {
                    return 'form-control is-invalid'
                }
                return 'form-control is-valid'
            }
        },
        created: function () {
            this.$nextTick(function () {
                this.$refs.title.focus()
            })
        }
    }

</script>

<style scoped>

</style>
