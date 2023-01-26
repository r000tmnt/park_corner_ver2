<template>
  <v-app dark>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container id="parent_container">
        {{currentLocation}}
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      items: [
        {
          icon: 'mdi-format-list-bulleted-type',
          title: 'Commission type',
          to: '/'
        },
        {
          icon: 'mdi-briefcase-edit-outline',
          title: 'Commission case',
          to: '/'
        },
        {
          icon: 'mdi-account-star',
          title: 'Customer',
          to: '/'
        }
      ],
      currentLocation: 'Commission type',
    }
  }
}
</script>
