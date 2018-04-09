<template>
    <div id="app" class="layout-default d-flex flex-column">
        <header class="header clearfix">
            <div class="container pl-0 pr-0">
                <navbar></navbar>
            </div>
        </header>
        <div class="container container-content pl-sm-0 pr-sm-0" style="flex:1">
            <div class="row">
                <slot></slot>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <span>A tiny <a target="_blank" href="http://tebe.ch">tebe.ch</a> project</span>
            </div>
        </footer>
    </div>
</template>

<script>
  export default {
    created () {
      document.body.classList.remove('login')
    }
  }
</script>