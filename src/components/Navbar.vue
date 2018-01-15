<template>
    <nav class="navbar navbar-expand-md navbar-dark pl-0 pr-0">
        <router-link class="navbar-brand" to="/">Notes</router-link>
        <button v-if="loggedIn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="loggedIn" class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/articles">Einträge</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/tags">Tags</router-link>
                </li>
                <li class="nav-item" v-if="hasPermission('article.add')">
                    <router-link class="nav-link" to="/articles/add">Neu</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ getUsername() }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <!-- router-link to="/user/settings" class="dropdown-item">Einstellungen</router-link -->
                        <router-link to="/logout" class="dropdown-item">Logout</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
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
