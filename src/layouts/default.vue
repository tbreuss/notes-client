<template>
    <div id="app" class="layout-default">
        <header class="header clearfix">
            <div class="container">
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
            </div>
        </header>
        <div class="container">
            <main role="main">
                <slot/>
            </main>
        </div>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">Place sticky footer content here.</span>
            </div>
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
      document.body.classList.remove('login')
    }
  }
</script>