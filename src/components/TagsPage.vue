<template>
    <div v-cloak>
        <div class="row">
            <div class="col-lg-12">
                <h4>Tags</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <span v-if="tags.length>0">Zeige {{ tags.length }} Tags</span>
                <span class="loading" v-if="loading">
                    ...lade Daten
                </span>
                <ul class="list-group">
                    <a v-for="tag in tags" @click="toArticles(tag.name, $event)" href="#"
                                 class="list-group-item d-flex justify-content-between align-items-center" :key="tag.id">
                        {{ tag.name}}
                        <span class="badge badge-secondary badge-pill">{{ tag.frequency }}</span>
                    </a>
                </ul>
            </div>
            <div class="col-lg-4">

                Sortieren nach
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="name" v-model="sort">
                        Tagname
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="frequency" v-model="sort">
                        Häufigkeit
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="changed" v-model="sort">
                        Letzter Änderung
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../http';

    export default {
        data() {
            return {
                tags: [],
                sort: this.getSort(),
                loading: false
            }
        },
        methods: {
            getSort: function() {
                if (sessionStorage.getItem("TagsPage.sort")) {
                    return sessionStorage.getItem("TagsPage.sort")
                }
                return 'frequency'
            },
            loadData: function () {
                this.loading = true
                var params = {
                    sort: this.sort
                }
                HTTP.get('tags', { params: params })
                    .then(response => {
                        this.tags = response.data
                        this.loading = false
                        sessionStorage.setItem("TagsPage.sort", this.sort)
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            toArticles: function (tag, e) {
                e.preventDefault()
                sessionStorage.setObj('xxx', ["a", "b", "c"])
                console.log(sessionStorage.getObj('xxx'));
                console.log(tag)
            }
        },
        created: function () {
            this.loadData()
        }
    }

</script>

<style scoped>

</style>
