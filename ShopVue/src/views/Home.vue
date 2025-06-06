<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">
      Todos os produtos
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div class="flex justify-center gap-4 mt-6">
      <button
        @click="previousPage"
        class="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        :disabled="offset === 0"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCardComponent.vue'

const props = defineProps({
  selectedCategory: String,
  searchQuery: String
})

const products = ref([])
const offset = ref(0)
const limit = 12

const fetchProducts = async () => {
  let url = ''
  if (props.selectedCategory) {
    // Busca por categoria com paginação
    url = `https://dummyjson.com/products/category/${props.selectedCategory}?limit=${limit}&skip=${offset.value}`
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${offset.value}`
  }

  try {
    const response = await axios.get(url)
    let filteredProducts = response.data.products

    // Se houver busca por texto, filtra localmente (DummyJSON não tem endpoint search com categoria)
    if (props.searchQuery) {
      const query = props.searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      )
    }

    products.value = filteredProducts
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    products.value = []
  }
}

const nextPage = () => {
  offset.value += limit
  fetchProducts()
}

const previousPage = () => {
  if (offset.value >= limit) {
    offset.value -= limit
    fetchProducts()
  }
}

watch(() => props.selectedCategory, () => {
  offset.value = 0
  fetchProducts()
})

watch(() => props.searchQuery, () => {
  offset.value = 0
  fetchProducts()
})

onMounted(fetchProducts)
</script>
