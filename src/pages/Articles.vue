<template>
    <layout-default v-cloak>
        <div class="row">
            <div class="col-lg-12">
                <h4>Einträge</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <span v-if="articles.length>0" else>Zeige {{ pagingFrom }} bis {{ pagingTo }} von {{ paging.totalItems
                    }} Einträgen</span>
                <span v-if="!loading && articles.length==0">Keine Einträge gefunden</span>
                <span class="loading" v-if="loading">
                        ...lade Daten
                </span>
                <div class="list-group">
                    <router-link v-for="article in articles" :to="'/articles/' + article.id"
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
                    <input class="form-check-input" id="articles-sort-radio-1" @change="loadData" type="radio" value="title" v-model="sort">
                    <label class="form-check-label" for="articles-sort-radio-1">Titel</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" id="articles-sort-radio-2" @change="loadData" type="radio" value="popular" v-model="sort">
                    <label class="form-check-label" for="articles-sort-radio-2">Beliebtheit</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" id="articles-sort-radio-3" @change="loadData" type="radio" value="changed" v-model="sort">
                    <label class="form-check-label" for="articles-sort-radio-3">Letzter Änderung</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" id="articles-sort-radio-4" @change="loadData" type="radio" value="created" v-model="sort">
                    <label class="form-check-label" for="articles-sort-radio-4">Letzter Eintrag</label>
                </div>

                Tags<br>
                <div v-for="(tag, index) in tags" class="form-check">
                    <input class="form-check-input" :id="'articles-tags-radio-' + index" @change="loadData" type="checkbox" :value="tag" v-model="selectedTags">
                    <label class="form-check-label" :for="'articles-tags-radio-' + index">{{ tag }}</label>
                </div>
            </div>
        </div>
    </layout-default>
</template>

<script>
  import { getArticles, getSelectedTags } from '../utils/api'

  export default {
    name: 'ArticlesPage',
    data () {
      return {
        loading: false,
        articles: [],
        tags: [],
        q: this.getQ(),
        sort: this.getSort(),
        page: this.getPage(),
        paging: {},
        selectedTags: this.getSelectedTags(),
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
        getArticles(params)
          .then(data => {
            this.articles = data.articles
            this.paging = data.paging
            this.loading = false
            sessionStorage.setItem('ArticlesPage.page', this.page)
            sessionStorage.setItem('ArticlesPage.q', this.q)
            sessionStorage.setItem('ArticlesPage.sort', this.sort)
            this.loadTags()
          })
      },
      loadPrevPage: function (event) {
        event.preventDefault()
        this.page = this.paging.currentPage - 1
        this.loadData()
      },
      loadNextPage: function (event) {
        event.preventDefault()
        this.page = this.paging.currentPage + 1
        this.loadData()
      },
      loadTags: function () {
        var params = {}
        if (this.q) {
          params.q = this.q
        }
        if (this.selectedTags) {
          params.tags = this.selectedTags
        }
        getSelectedTags(params)
          .then((tags) => {
            this.tags = tags
            sessionStorage.setObj('ArticlesPage.selectedTags', this.selectedTags)
          })
          .catch(error => {
            console.error(error)
          })
      },
      getPage: function () {
        if (sessionStorage.getItem('ArticlesPage.page')) {
          return sessionStorage.getItem('ArticlesPage.page')
        }
        return 1
      },
      getQ: function () {
        if (sessionStorage.getItem('ArticlesPage.q')) {
          return sessionStorage.getItem('ArticlesPage.q')
        }
        return ''
      },
      getSort: function () {
        if (sessionStorage.getItem('ArticlesPage.sort')) {
          return sessionStorage.getItem('ArticlesPage.sort')
        }
        return 'title'
      },
      getSelectedTags: function () {
        if (sessionStorage.getObj('ArticlesPage.selectedTags')) {
          return sessionStorage.getObj('ArticlesPage.selectedTags')
        }
        return []
      }
    },
    created: function () {
      this.loadData()
    }
  }

</script>

<style scoped>

</style>
