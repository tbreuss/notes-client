<template>
    <div id="app" class="container">
        <header class="header clearfix">
            <nav>
                <ul class="nav nav-pills float-right">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/articles">Einträge</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/tags">Tags</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/articles/add">Neu</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="loggedIn" to="/logout" class="nav-link">Logout</router-link>
                        <router-link v-if="!loggedIn" to="/login" class="nav-link">Login</router-link>
                    </li>
                </ul>
            </nav>
            <h3 class="text-muted">
                <router-link to="/">Notes</router-link>
            </h3>
        </header>
        <main role="main">
            <router-view/>
        </main>
        <footer class="footer">

        </footer>
    </div>
</template>

<script>
  import auth from '@/utils/auth'
  export default {
    data () {
      return {
        loggedIn: auth.loggedIn()
      }
    },
    created () {
      auth.onChange = loggedIn => {
        this.loggedIn = loggedIn
      }
    }
  }
</script>

<style scoped>
</style>
