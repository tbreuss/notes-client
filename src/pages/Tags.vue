<template>
    <layout-default>
        <h4>Tags</h4>
        <span v-if="tags.length>0">Zeige {{ tags.length }} Tags</span>
        <span class="loading" v-if="loading">...lade Daten</span>
        <ul class="list-group">
            <a v-for="tag in tags" @click="toArticles(tag.name, $event)" href="#"
               class="list-group-item d-flex justify-content-between align-items-center" :key="tag.id">
                {{ tag.name}}
                <span class="badge badge-secondary badge-pill">{{ tag.frequency }}</span>
            </a>
        </ul>
        <div slot="aside">
            Sortieren nach
            <div class="form-check">
                <input class="form-check-input" @change="loadData" id="tags-sort-radio-1" type="radio" value="name" v-model="sort">
                <label class="form-check-label" for="tags-sort-radio-1">Tagname</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" @change="loadData" id="tags-sort-radio-2" type="radio" value="frequency" v-model="sort">
                <label class="form-check-label" for="tags-sort-radio-2">Häufigkeit</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" @change="loadData" id="tags-sort-radio-3" type="radio" value="changed" v-model="sort">
                <label class="form-check-label" for="tags-sort-radio-3">Letzter Änderung</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" @change="loadData" id="tags-sort-radio-4" type="radio" value="created" v-model="sort">
                <label class="form-check-label" for="tags-sort-radio-4">Letzter Eintrag</label>
            </div>
        </div>
    </layout-default>
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
