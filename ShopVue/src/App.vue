<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Navbar from './components/Navbar.vue'

const categories = ref([])
const selectedCategory = ref('')
const searchQuery = ref('')
const cartCount = ref(3)

onMounted(async () => {
  const res = await axios.get('https://dummyjson.com/products/categories')
  categories.value = res.data
})

function buscarProdutos() {
  console.log('Buscar:', searchQuery.value, 'Categoria:', selectedCategory.value)
}
</script>

<template>
  <div>
    <Navbar
      :categories="categories"
      :selected-category="selectedCategory"
      :search-query="searchQuery"
      :cart-count="cartCount"
      @update:selectedCategory="selectedCategory = $event"
      @update:searchQuery="searchQuery = $event"
      @search="buscarProdutos"
    />

    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        :selected-category="selectedCategory"
        :search-query="searchQuery"
      />
    </RouterView>
  </div>
</template>
