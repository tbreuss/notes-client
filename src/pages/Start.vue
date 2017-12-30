<template>
    <div class="hello">
        <articles :mode="'popular'"><h4 slot="title">Die beliebtesten Artikel</h4></articles>
        <articles :mode="'latest'"><h4 slot="title">Die neuesten Artikel</h4></articles>
        <articles :mode="'modified'"><h4 slot="title">Die aktuellsten Artikel</h4></articles>
    </div>
</template>

<script>
  export default {
    name: 'StartPage',
  }
</script>

<style scoped>

</style>
