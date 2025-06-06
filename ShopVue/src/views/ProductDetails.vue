<template>
  <div class="flex flex-col md:flex-row p-10 gap-12 max-w-7xl mx-auto">
    <!-- Image Section -->
    <div class="flex flex-col gap-6">
      <img
        :src="produto?.thumbnail || '/images/palette.png'"
        :alt="produto?.title || 'Produto'"
        class="w-[500px] h-auto rounded-lg shadow-lg"
      />
      <div class="flex gap-3">
        <img
          :src="produto?.thumbnail || '/images/palette.png'"
          :alt="produto?.title || 'Thumbnail'"
          class="w-28 h-28 rounded border-4 border-blue-600"
        />
      </div>
    </div>

    <!-- Product Info Section -->
    <div class="flex-1">
      <p class="text-base text-gray-600 font-semibold uppercase tracking-wide">{{ produto?.category || 'Categoria' }}</p>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{{ produto?.title || 'Título do Produto' }}</h1>
      <div class="flex items-center space-x-3 text-lg mb-6">
        <span class="text-yellow-400 text-2xl">★</span>
        <span class="text-gray-700 font-semibold">{{ produto?.rating?.toFixed(1) || '0.0' }}</span>
        <span class="text-gray-400">|</span>
        <span class="text-gray-700 font-semibold">Brand:</span>
        <span class="text-gray-900 font-extrabold">{{ produto?.brand || 'Marca' }}</span>
        <span class="text-gray-400">|</span>
        <span class="text-gray-700 font-semibold">{{ produto?.stock || 0 }} in stock</span>
      </div>

      <!-- Pricing -->
      <div class="flex items-center space-x-6 mb-6">
        <span class="text-3xl font-extrabold text-gray-900">${{ produto?.price?.toFixed(2) || '0.00' }}</span>
        <span v-if="produto?.discountPercentage" class="line-through text-gray-400 text-xl">
          ${{ precoOriginal.toFixed(2) }}
        </span>
        <span v-if="produto?.discountPercentage" class="bg-orange-600 text-white px-3 py-1 text-base rounded-lg">
          Save {{ produto.discountPercentage.toFixed(0) }}%
        </span>
      </div>

      <!-- Description -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Description</h2>
        <p class="text-gray-800 text-base leading-relaxed">
          {{ produto?.description || 'Descrição do produto não disponível.' }}
        </p>
      </div>

      <!-- Quantity Selector -->
      <div class="flex items-center space-x-3 mb-8">
        <span class="text-base font-semibold text-gray-800">Quantity</span>
        <div class="flex items-center border border-gray-400 rounded-lg">
          <button
            @click="decrementar"
            class="px-4 py-2 text-2xl font-bold text-gray-700 hover:bg-gray-200 rounded-l-lg"
            :disabled="quantidade <= 1"
          >
            −
          </button>
          <span class="px-8 py-2 text-lg font-semibold">{{ quantidade }}</span>
          <button
            @click="incrementar"
            class="px-4 py-2 text-2xl font-bold text-gray-700 hover:bg-gray-200 rounded-r-lg"
          >
            +
          </button>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="adicionarCarrinho"
        class="bg-blue-700 text-white text-xl font-bold px-10 py-4 rounded-lg hover:bg-blue-800 w-full transition"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCart } from '@/composables/useCart.js'  // IMPORTANTE: crie este arquivo conforme te passei

const route = useRoute()
const produto = ref(null)
const quantidade = ref(1)
const precoOriginal = ref(0)

const { adicionarProduto } = useCart()

const incrementar = () => {
  quantidade.value++
}

const decrementar = () => {
  if (quantidade.value > 1) quantidade.value--
}

const adicionarCarrinho = () => {
  adicionarProduto(produto.value, quantidade.value)
  alert(`Adicionado ${quantidade.value}x ${produto.value.title} ao carrinho!`)
}

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    produto.value = response.data
    if (produto.value.discountPercentage) {
      precoOriginal.value = produto.value.price / (1 - produto.value.discountPercentage / 100)
    }
  } catch (error) {
    console.error('Erro ao carregar o produto:', error)
  }
})
</script>
