<template>
    <layout-login>
        <div class="form-signin">
            <h4>Einstellungen</h4>
            <input v-model="apiUrl" type="text" id="apiUrl" class="form-control" placeholder="API-URL" v-focus>
            <button v-if="!isTested || !isValid" type="button" class="btn btn-secondary btn-block" @click="testUrl" ref="loginBtn">Test</button>
            <button v-if="isTested && isValid" type="button" class="btn btn-secondary btn-block" @click="saveUrl" ref="loginBtn">Speichern</button>
            <div v-if="isTested && isValid" class="alert alert-success">API-URL ist korrekt</div>
            <div v-if="isTested && !isValid" class="alert alert-danger">API-URL ist falsch</div>
            <p><a href="./">Zurück zur App</a></p>
        </div>
    </layout-login>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        apiUrl: localStorage.API_URL,
        apiToken: localStorage.API_TOKEN,
        isValid: false,
        isTested: false
      }
    },
    methods: {
      saveUrl() {
        localStorage.API_URL = this.apiUrl
        delete localStorage.API_TOKEN
        this.isValid = false
        this.isTested = false
      },
      testUrl() {
        let http = axios.create()
        let url = this.apiUrl + '/ping'
        this.isTested = true
        http.get(url)
          .then((response) => {
            if (response.data.name == 'ch.tebe.notes') {
                this.isValid = true
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

</script>

<style scoped>

</style>
