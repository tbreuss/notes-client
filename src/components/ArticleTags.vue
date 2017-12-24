<template>
    <div v-cloak>
        <span v-for="tag in tags"><span class="badge badge-secondary">{{ tag }}</span>&nbsp;</span>
    </div>
</template>

<script>
  export default {

    props: ['tags'],
    methods: {}
  }

</script>

<style scoped>

</style>
