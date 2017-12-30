<template>
    <div>
        <div v-if="error">
            <h1>Error {{ error.status }}</h1>
            <p>{{ error.statusText }}</p>
            <p><strong>The response:</strong></p>
            <pre>{{ error }}</pre>
        </div>
        <div v-else>
            <h1>Error</h1>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    created() {
      if (!this.error) {
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>

</style>
