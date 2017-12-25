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
                        <input @change="loadData" class="form-check-input" type="radio" value="frequency"
                               v-model="sort">
                        Häufigkeit
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="changed" v-model="sort">
                        Letzter Änderung
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input @change="loadData" class="form-check-input" type="radio" value="created" v-model="sort">
                        Letzter Eintrag
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { getTags } from '../utils/api'

  export default {
    data () {
      return {
        tags: [],
        sort: this.getSort(),
        loading: false
      }
    },
    methods: {
      getSort: function () {
        if (sessionStorage.getItem('TagsPage.sort')) {
          return sessionStorage.getItem('TagsPage.sort')
        }
        return 'frequency'
      },
      loadData: function () {
        this.loading = true
        var params = {
          sort: this.sort
        }
        getTags(params)
          .then((tags) => {
            this.tags = tags
            this.loading = false
            sessionStorage.setItem('TagsPage.sort', this.sort)
          })
          .catch(error => {
            console.error(error)
          })
      },
      toArticles: function (tag, e) {
        e.preventDefault()
        sessionStorage.setObj('ArticlesPage.selectedTags', [tag])
        this.$router.push('/articles')
      }
    },
    created: function () {
      this.loadData()
    }
  }

</script>

<style scoped>

</style>
