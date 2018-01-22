<template>
    <layout-login>
        <div class="form-settings">

            <h1>API-Einstellungen</h1>

            <form v-on:submit.prevent>
                <div class="form-group row">
                    <label for="apiUrl" class="col-sm-2 col-form-label">API-URL</label>
                    <div class="col-sm-10">
                        <div class="input-group mb-3">
                            <input v-on:focus="resetValidation" ref="apiUrl" v-model="apiUrl" type="text" id="apiUrl" class="form-control" placeholder="API-URL eintragen" v-focus readonly>
                            <div class="input-group-append">
                                <button @click="testUrl" class="btn btn-secondary" ref="btnTest" type="button">Testen</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="token" class="col-sm-2 col-form-label">API-Token</label>
                    <div class="col-sm-10">
                        <textarea v-model="apiToken" type="text" cols="50" rows="6" class="form-control" id="token" placeholder="Kein API-Token vorhanden" readonly></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="offset-sm-2 col-sm-10">
                        <!-- <button type="button" class="btn btn-primary" @click="saveUrl">Speichern</button>-->
                        <a class="btn btn-link" href="./">Zurück zur App</a>
                    </div>
                </div>
                <div class="valid-feedback">Die API-URL ist gültig.</div>
                <div class="invalid-feedback">Die API-URL ist ungültig oder der Server ist nicht erreichbar.</div>
            </form>
        </div>
    </layout-login>
</template>

<script>
  import axios from 'axios'
  import storage from '@/utils/storage'

  export default {
    data () {
      return {
        apiUrl: process.env.API_URL,
        apiToken: storage.getApiToken()
      }
    },
    methods: {
      resetValidation() {
        this.$refs.apiUrl.classList.remove('is-valid')
        this.$refs.apiUrl.classList.remove('is-invalid')
        this.$refs.btnTest.classList.remove('btn-danger')
        this.$refs.btnTest.classList.remove('btn-success')
        this.$refs.btnTest.classList.add('btn-secondary')
      },
      saveUrl() {
        storage.setApiToken(this.apiToken)
      },
      testUrl() {
        this.resetValidation()
        let http = axios.create()
        let url = this.apiUrl + '/ping'
        http.get(url)
          .then((response) => {
            if (response.data.name == 'ch.tebe.notes') {
                this.$refs.apiUrl.classList.add('is-valid')
                this.$refs.btnTest.classList.add('btn-success')
            }
          })
          .catch(() => {
            this.$refs.apiUrl.classList.add('is-invalid')
            this.$refs.btnTest.classList.add('btn-danger')
          });
      }
    }
  }
</script>

<style scoped>

</style>
