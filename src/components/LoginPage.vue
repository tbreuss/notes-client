<template>
    <div>
        <div v-if="isAuthenticated">
            <h4>Angemeldet</h4>
            <button type="button" @click="logout">Logout</button>
        </div>
        <div v-else>
            <h4>Login</h4>
            <div class="form-group">
                <label for="username">Benutzername</label>
                <input v-model="form.username" type="text" :class="getClass('username')" id="username">
            </div>
            <div class="form-group">
                <label for="password">Passwort</label>
                <input v-model="form.password" :class="getClass('password')" type="password" id="password">
            </div>
            <button type="button" class="btn btn-primary" @click="login" ref="loginBtn">Login</button>
            {{ errors }}
        </div>
    </div>
</template>

<script>
  import { HTTP } from '../http'

  export default {
    name: 'LoginPage',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        formSent: false,
        errors: [],
        isAuthenticated: this.checkAuth()
      }
    },
    methods: {
      login () {
        var config = {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }
        HTTP.post('/auth/login', this.form, config)
          .then(response => {
            this.$refs.loginBtn.disabled = false
            localStorage.setItem('token', response.data.token)
            this.$router.push('/add-article')
          })
          .catch(error => {
            this.errors = error.response.data
          })
      },
      logout () {
        localStorage.removeItem('token')
        this.isAuthenticated = false
        this.$router.push('/articles')
      },
      getClass (field) {
        if (!this.formSent) {
          return 'form-control'
        }
        if (field in this.errors) {
          return 'form-control is-invalid'
        }
        return 'form-control is-valid'
      },
      checkAuth () {
        var jwt = localStorage.getItem('token')
        return jwt ? true : false
      }
    }
  }
</script>

<style scoped>

</style>
