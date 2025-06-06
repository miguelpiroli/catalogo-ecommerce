<template>
  <header class="bg-white shadow-md p-4 flex items-center gap-4 max-w-7xl mx-auto">

    <!-- Nome da loja como botão -->
    <div
      class="text-2xl font-bold text-blue-600 cursor-pointer select-none"
      @click="voltarParaHome"
    >
      ShopVue
    </div>

    <!-- Seleção de categoria -->
    <select
      :value="selectedCategory"
      @change="updateCategory"
      class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">Todas categorias</option>
      <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
        {{ cat.name }}
      </option>
    </select>

    <!-- Barra de busca -->
    <input
      type="search"
      :value="searchQuery"
      @input="updateSearch"
      @keyup.enter="onSearchEnter"
      placeholder="Buscar produtos..."
      class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <!-- Ícone carrinho -->
    <button class="relative text-gray-700 hover:text-blue-600" @click="abrirCarrinho">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13H5.4m13.6 0a2 2 0 11-4 0 2 2 0 114 0z" />
      </svg>
      <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
        {{ cartCount }}
      </span>
    </button>

  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart.js'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: String,
  searchQuery: String,
})

const emit = defineEmits(['update:selectedCategory', 'update:searchQuery', 'search'])

function updateCategory(event) {
  emit('update:selectedCategory', event.target.value)
}

function updateSearch(event) {
  emit('update:searchQuery', event.target.value)
}

function onSearchEnter() {
  emit('search')
}

const { state } = useCart()

const cartCount = computed(() =>
  state.items.reduce((acc, item) => acc + item.quantidade, 0)
)

function abrirCarrinho() {
  router.push('/carrinho')
}

function voltarParaHome() {
  router.push('/')
}
</script>
