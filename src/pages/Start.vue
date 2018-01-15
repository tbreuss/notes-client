<template>
    <layout-start>
        <div class="col-md-6">
            <articles :mode="'popular'"><h4 slot="title" class="widget-articles__title">Die meist gesehenen Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'latest'"><h4 slot="title" class="widget-articles__title">Die neuesten Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'modified'"><h4 slot="title" class="widget-articles__title">Die aktuellsten Einträge</h4></articles>
        </div>
        <div class="col-md-6">
            <articles :mode="'liked'"><h4 slot="title" class="widget-articles__title">Die beliebtesten Einträge</h4></articles>
        </div>
    </layout-start>
</template>

<script>
  export default {
    name: 'StartPage'
  }
</script>

<style scoped>

</style>
