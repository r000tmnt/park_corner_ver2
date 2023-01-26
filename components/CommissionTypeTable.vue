<template>
  <div>
    <v-data-table
     :headers="headers"
     :items="types"
     :search="search"
     :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>

      {{/* Need to customize the first col to display thumbnail */}}
      <template v-slot:item.thumbnail="props">
          <v-img></v-img>
      </template>


      <template v-slot:item.control="props">
          <div class="flex">
            <v-btn class="btn">Edit</v-btn>
            <v-btn class="btn">Remove</v-btn>
          </div>  
      </template>

    </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
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
          {
            name: 'Grayscal',
            acceptable: 1,
            price: 400
          },
          {
            name: 'Grayscal',
            acceptable: 1,
            price: 400
          },
          {
            name: 'Grayscal',
            acceptable: 1,
            price: 400
          },
        ],
      }
    },
  }
</script>