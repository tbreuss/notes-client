<template>
  <div class="hello">
    <articles :mode="'popular'"></articles>
    <articles :mode="'latest'"></articles>
    <articles :mode="'modified'"></articles>
  </div>
</template>

<script>
export default {
  name: 'StartPage',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
