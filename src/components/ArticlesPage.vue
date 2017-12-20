<template>
    <div v-cloak>
        <div class="row">
            <div class="col-lg-12">
                <h4>Artikel</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <span v-if="articles.length>0"else>Zeige {{ pagingFrom }} bis {{ pagingTo }} von {{ paging.totalItems }} Artikel</span>
                <span v-if="!loading && articles.length==0">Keine Artikel gefunden</span>
                <span class="loading" v-if="loading">
                        ...lade Daten
                </span>
                <div class="list-group">
                    <router-link v-for="article in articles" :to="'/article/' + article.id"
                                 class="list-group-item list-group-item-action" :key="article.id">
                        {{ article.title }}<br>
                        <article-tags :tags="article.tags"></article-tags>
                    </router-link>
                    <nav style="margin-top:20px" v-if="paging.pageCount>1">
                        <ul class="pagination justify-content-center">
                            <li v-bind:class="{ disabled: paging.currentPage <= 1, 'page-item': true}"><a
                                    class="page-link" @click="loadPrevPage" href="#">Vorherige Seite</a></li>
                            <li v-bind:class="{ disabled: paging.currentPage >= paging.pageCount, 'page-item': true}">
                                <a class="page-link" @click="loadNextPage" href="#">Nächste Seite</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="col-lg-4">

                Filtern nach<br>
                <input @change="loadData(true)" type="text" v-model="q" class="form-control">

                Sortieren nach<br>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="title" v-model="sort">
                        Titel
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="changed" v-model="sort">
                        Letzter Änderung
                    </label>
                </div>

                Tags<br>
                <div v-for="tag in tags" class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="checkbox" :value="tag" v-model="selectedTags">
                        {{ tag }}
                    </label>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../http';

    export default {
        name: 'ArticlesPage',
        data() {
            return {
                loading: false,
                articles: [],
                tags: [],
                q: this.getQ(),
                sort: this.getSort(),
                page: this.getPage(),
                paging: {},
                selectedTags: [],
            }
        },
        computed: {
            pagingFrom: function () {
                return (this.paging.currentPage - 1) * this.paging.itemsPerPage + 1
            },
            pagingTo: function () {
                return Math.min(this.paging.currentPage * this.paging.itemsPerPage, this.paging.totalItems)
            }
        },
        methods: {
            loadData: function (resetPage = false) {
                var params = {}
                if (this.q) {
                    params.q = this.q
                }
                if (this.selectedTags) {
                    params.tags = this.selectedTags
                }
                if (this.sort) {
                    params.sort = this.sort
                }
                if (resetPage) {
                    this.page = 1
                }
                params.page = this.page
                this.loading = true
                HTTP.get('articles', {params: params})
                    .then(response => {
                        this.articles = response.data.articles
                        this.paging = response.data.paging
                        this.loading = false
                        sessionStorage.setItem("ArticlesPage.page", this.page)
                        sessionStorage.setItem("ArticlesPage.q", this.q)
                        sessionStorage.setItem("ArticlesPage.sort", this.sort)
                        this.loadTags()
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            loadPrevPage: function (event) {
                event.preventDefault();
                this.page = this.paging.currentPage - 1;
                this.loadData();
            },
            loadNextPage: function (event) {
                event.preventDefault();
                this.page = this.paging.currentPage + 1;
                this.loadData();
            },
            loadTags: function () {
                var params = {}
                if (this.q) {
                    params.q = this.q
                }
                if (this.selectedTags) {
                    params.tags = this.selectedTags
                }
                HTTP.get('selectedtags', {params: params})
                    .then(response => {
                        this.tags = response.data
                    })
                    .catch(e => {
                        console.error(e)
                    })
            },
            getPage: function() {
                if (sessionStorage.getItem("ArticlesPage.page")) {
                    return sessionStorage.getItem("ArticlesPage.page")
                }
                return 1
            },
            getQ: function() {
                if (sessionStorage.getItem("ArticlesPage.q")) {
                    return sessionStorage.getItem("ArticlesPage.q")
                }
                return ''
            },
            getSort: function() {
                if (sessionStorage.getItem("ArticlesPage.sort")) {
                    return sessionStorage.getItem("ArticlesPage.sort")
                }
                return 'title'
            },
        },
        created: function () {
            this.loadData()
        }
    }

</script>

<style scoped>

</style>
