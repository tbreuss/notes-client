<template>
    <div class="layout-login container">
        <slot/>
    </div>
</template>

<script>
  export default {
    created () {
      document.body.classList.add('login')
    }
  }
</script>