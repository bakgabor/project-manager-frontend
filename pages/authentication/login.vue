<template>
  <div>
    <section class="section is-main-section">
      <login-component />
    </section>
  </div>
</template>

<script>
import LoginComponent from '@/components/authentication/LoginComponent'

export default {
  name: 'login',
  components: { LoginComponent },
}
</script>

<style scoped></style>
