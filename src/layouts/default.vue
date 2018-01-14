<template>
    <div id="app" class="layout-default d-flex flex-column">
        <header class="header clearfix">
            <div class="container pl-0 pr-0">
                <nav class="navbar navbar-expand-md navbar-dark pl-0 pr-0">
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
                            <li class="nav-item" v-if="hasPermission('article.add')">
                                <router-link class="nav-link" to="/articles/add">Neu</router-link>
                            </li>
                            <li v-if="loggedIn" class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{ getUsername() }}
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <router-link to="/settings" class="dropdown-item">Einstellungen</router-link>
                                    <router-link to="/logout" class="dropdown-item">Logout</router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <div class="container container-content" style="flex:1">
            <div class="row">
                <div class="col-md-9 pl-sm-0 pr-sm-0 pr-md-2 pr-lg-3">
                    <slot/>
                </div>
                <div class="col-md-3 pl-sm-0 pr-sm-0 pl-md-2 pl-lg-3">
                    <slot name="aside"></slot>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container pl-0 pr-0">
                <span class="text-muted">&copy; 2018</span>
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
    methods: {
      hasPermission(scope) {
        return auth.hasPermission(scope)
      },
      getUsername() {
        let payload = auth.getPayload()
        return payload['user']['name']
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