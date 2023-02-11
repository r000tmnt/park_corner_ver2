<template>
  <div>
    <v-data-table
     :headers="headers"
     :items="types"
     :search="search"
     :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>

        <div class="flex">
          <v-btn style="margin: 1%" color="primary" @click="addNewType = true">Add new type</v-btn>

          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </div>

      </template>

      {{/* Need to customize the first col to display thumbnail */}}
      <template v-slot:item.thumbnail="props">
          <v-img></v-img>
      </template>


      <template v-slot:item.control="props">
          <div class="flex">
            <v-btn class="btn" color="teal darken-2">Edit</v-btn>
            <v-btn class="btn" color="red darken-2">Remove</v-btn>
          </div>  
      </template>

    </v-data-table>

    {{/* form */}}
    <AddNewType :addNewType="addNewType" v-on:close="closeAddNewModal()" />

  </div>
</template>

<script>
  // import axios from '../server/axios.ts'

  export default {
    data () {
      return {
        search: '',
        addNewType: false,
        editType: false,
        headers: [
          {
            text: '',
            align: 'start',
            filterable: false,
            value: 'thumbnail',
          },
          { text: '名稱', value: 'name' },
          { text: '接受數量', value: 'acceptable' },
          { text: '價格', value: 'price' },
          { text: '操作', value: 'control', width: '10%' },
        ],
        types: [
          // {
          //   name: 'Grayscal',
          //   acceptable: 1,
          //   price: 400
          // },
          // {
          //   name: 'Grayscal',
          //   acceptable: 1,
          //   price: 400
          // },
          // {
          //   name: 'Grayscal',
          //   acceptable: 1,
          //   price: 400
          // },
        ],
      }
    },
    methods: {
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },

      closeAddNewModal(){
        this.addNewType = false
      }
    },
    created(){
      this.$store.dispatch('getCommissionType')
    }
  }
</script>