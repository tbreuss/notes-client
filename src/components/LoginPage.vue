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
                <input v-on:keyup.enter="login" v-model="form.username" type="text" :class="getClass('username')" id="username" ref="username">
            </div>
            <div class="form-group">
                <label for="password">Passwort</label>
                <input v-on:keyup.enter="login" v-model="form.password" :class="getClass('password')" type="password" id="password">
            </div>
            <button type="button" class="btn btn-primary" @click="login" ref="loginBtn">Login</button>
            {{ errors }}
        </div>
    </div>
</template>

<script>
  import { postLogin } from '../utils/api'

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
        postLogin(this.form)
          .then(token => {
            localStorage.setItem('token', token)
            this.$refs.loginBtn.disabled = false
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
    },
    mounted() {
      if (!this.isAuthenticated) {
        this.$refs.username.focus()
      }
    }
  }
</script>

<style scoped>

</style>
