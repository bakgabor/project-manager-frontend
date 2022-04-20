<template>
  <div id="app">
    <!--    <nav-bar />-->
    <aside-menu :menu="menu" />
    <nuxt />
  </div>
</template>

<script>
// @ is an alias to /src
// import NavBar from '@/components/default/bar/NavBar'
import AsideMenu from '@/components/default/menu/AsideMenu'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    // NavBar,
  },
  computed: {
    menu() {
      return [
        this.$t('menu.generals'),
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: this.$t('menu.dashboard'),
          },
        ],
        this.$t('menu.projects'),
        [
          {
            to: '/project/list',
            icon: 'hexagon-multiple',
            label: this.$t('menu.projects'),
          },
          {
            to: '/project/table/list',
            icon: 'hexagon-multiple',
            label: this.$t('menu.projectsList'),
          },
        ],
      ]
    },
  },
  created() {
    // this.$store.commit('user', {
    //   name: 'John Doe',
    //   email: 'john@example.com',
    //   avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    // })
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
}
</script>
