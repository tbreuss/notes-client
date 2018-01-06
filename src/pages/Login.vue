<template>
    <layout-login>
        <div v-if="isAuthenticated">
            <h4>Angemeldet</h4>
            <button type="button" @click="logout">Logout</button>
        </div>
        <div v-else class="form-signin">

            <h2>Login</h2>

            <label for="username" class="sr-only">Benutzername</label>
            <input v-on:focus="reset()" v-on:keyup.enter="login" v-model="form.username" type="text" :class="getClass('username')" id="username" placeholder="Benutzername" v-focus>

            <label for="password" class="sr-only">Passwort</label>
            <input v-on:focus="reset()" v-on:keyup.enter="login" v-model="form.password" :class="getClass('password')" type="password" id="password" placeholder="Passwort">

            <button type="button" class="btn btn-primary btn-block" @click="login" ref="loginBtn">Login</button>

            <div style="margin-top:1em" class="alert alert-danger" role="alert" v-if="errors.username || errors.password">Benutzername/Passwort falsch</div>

        </div>
    </layout-login>
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
      reset() {
        this.formSent = false
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
