<template>
    <div id="app" class="container">
        <header class="header clearfix">
            <nav>
                <ul class="nav nav-pills float-right">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/articles">Artikel</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/tags">Tags</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/add-article">Neu</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                </ul>
            </nav>
            <h3 class="text-muted">
                <router-link to="/">Wissen</router-link>
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
  export default {
    name: 'app'
  }
</script>

<style scoped>
</style>
