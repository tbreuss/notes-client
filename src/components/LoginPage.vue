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
                <input v-on:keyup.enter="login" v-model="form.username" type="text" :class="getClass('username')" id="username" v-focus>
                <div class="invalid-feedback">{{ errors.username }}</div>
            </div>
            <div class="form-group">
                <label for="password">Passwort</label>
                <input v-on:keyup.enter="login" v-model="form.password" :class="getClass('password')" type="password" id="password">
                <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
            <button type="button" class="btn btn-primary" @click="login" ref="loginBtn">Login</button>
        </div>
    </div>
</template>

<script>
  import { postLogin } from '@/utils/api'
  import auth from '@/utils/auth'

  export default {
    name: 'LoginPage',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        formSent: false,
        errors: {},
        isAuthenticated: auth.loggedIn()
      }
    },
    methods: {
      login () {
        auth.login(this.form.username, this.form.password, (loggedIn, errors) => {
          if (!loggedIn) {
            this.errors = errors
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
          }
          this.formSent = true
        })
      },
      getClass (field) {
        if (!this.formSent) {
          return 'form-control'
        }
        if (field in this.errors) {
          return 'form-control is-invalid'
        }
        return 'form-control is-valid'
      }
    }
  }
</script>

<style scoped>

</style>
