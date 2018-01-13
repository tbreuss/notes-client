<template>
    <layout-default>
    <articles :mode="'popular'"><h4 slot="title" class="widget-articles__title">Die beliebtesten Einträge</h4></articles>
        <articles :mode="'latest'"><h4 slot="title" class="widget-articles__title">Die neuesten Einträge</h4></articles>
        <articles :mode="'modified'"><h4 slot="title" class="widget-articles__title">Die aktuellsten Einträge</h4></articles>
    </layout-default>
</template>

<script>
  export default {
    name: 'StartPage'
  }
</script>

<style scoped>

</style>
