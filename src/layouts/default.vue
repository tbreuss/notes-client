<template>
    <div id="app" class="layout-default d-flex flex-column">
        <header class="header clearfix">
            <div class="container">
                <nav class="navbar navbar-expand-lg">
                    <router-link class="navbar-brand" to="/">Notes</router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
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
                    </div>
                </nav>
            </div>
        </header>
        <div class="container" style="flex:1">
            <main role="main">
                <div class="row">
                    <div class="col-lg-9">
                        <slot/>
                    </div>
                    <div class="col-lg-3">
                        <slot name="aside"></slot>
                    </div>
                </div>
            </main>
        </div>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">&copy; 2018 made with love by...</span>
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