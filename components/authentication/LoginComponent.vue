<template>
  <div class="login">
    <tiles>
      <card-component
        :title="$t('authentication.login')"
        icon="login"
        class="tile is-child"
      >
        <form @submit.prevent="login">
          <b-field horizontal :label="$t('authentication.username')">
            <b-input v-model="userName" name="name" type="name" required />
          </b-field>
          <b-field horizontal :label="$t('authentication.password')">
            <b-input v-model="password" name="name" type="password" required />
          </b-field>
          <div class="field is-horizontal">
            <button
              slot="left"
              type="submit"
              class="button is-primary login-btn"
            >
              {{ $t('authentication.login') }}
            </button>
          </div>
        </form>
      </card-component>
    </tiles>
  </div>
</template>

<script>
import Tiles from '@/components/default/Tiles'
import CardComponent from '@/components/default/card/CardComponent'

export default {
  name: 'LoginComponent',
  components: { Tiles, CardComponent },
  data() {
    return {
      userName: '',
      password: '',
      message: false,
    }
  },
  methods: {
    login() {
      this.message = true
      this.$auth
        .loginWith('local', {
          data: {
            loginForm: {
              userName: this.userName,
              password: this.password,
            },
          },
        })
        .then(() => {
          // this.$router.push('/')
        })
      this.$auth.onError(() => {
        if (this.message) {
          this.$buefy.toast.open({
            message: `Hibás email vagy jelszó!`,
            type: 'is-danger',
          })
        }
        this.message = false
      })
    },
  },
}
</script>

<style scoped></style>
