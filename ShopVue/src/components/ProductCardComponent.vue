<template>
  <div class="bg-white rounded-xl shadow p-4 relative hover:shadow-lg transition">
    <!-- Selo de desconto -->
    <div
      v-if="product.discountPercentage"
      class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold"
    >
      -{{ Math.round(product.discountPercentage) }}%
    </div>

    <!-- Imagem do produto -->
    <router-link :to="`/product/${product.id}`">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-40 object-cover rounded-lg mb-4"
      />
    </router-link>

    <!-- Título e categoria -->
    <div class="mb-2">
      <router-link :to="`/product/${product.id}`">
        <h2 class="font-semibold text-gray-800 text-sm truncate">
          {{ product.title }}
        </h2>
      </router-link>
      <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
        {{ product.category }}
      </span>
    </div>

    <!-- Avaliação e estoque -->
    <div class="text-sm text-gray-500 flex items-center gap-2 mb-1">
      <span>⭐ {{ product.rating }}</span>
      <span>• {{ product.stock }} in stock</span>
    </div>

    <!-- Preço -->
    <div class="mb-2">
      <span class="text-lg font-bold text-gray-900">
        ${{ product.price.toFixed(2) }}
      </span>
      <span
        v-if="discountedPrice"
        class="line-through text-sm text-gray-400 ml-2"
      >
        ${{ discountedPrice }}
      </span>
    </div>

    <!-- Botão -->
    <button
      class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const discountedPrice = computed(() => {
  const discount = props.product.discountPercentage
  if (!discount || discount === 0) return null
  return (props.product.price / (1 - discount / 100)).toFixed(2)
})
</script>
