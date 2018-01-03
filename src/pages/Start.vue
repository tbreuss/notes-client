<template>
    <div class="hello">
        <articles :mode="'popular'"><h4 slot="title">Die beliebtesten Einträge</h4></articles>
        <articles :mode="'latest'"><h4 slot="title">Die neuesten Einträge</h4></articles>
        <articles :mode="'modified'"><h4 slot="title">Die aktuellsten Einträge</h4></articles>
    </div>
</template>

<script>
  export default {
    name: 'StartPage',
  }
</script>

<style scoped>

</style>
