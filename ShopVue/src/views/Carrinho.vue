<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Seu Carrinho</h1>

    <div v-if="items.length === 0" class="text-center text-gray-600">
      Seu carrinho está vazio.
    </div>

    <div v-else>
      <div
        v-for="item in items"
        :key="item.produto.id"
        class="flex items-center gap-4 border-b border-gray-300 py-4"
      >
        <img
          :src="item.produto.thumbnail"
          :alt="item.produto.title"
          class="w-24 h-24 object-cover rounded"
        />

        <div class="flex-1">
          <h2 class="font-semibold text-lg">{{ item.produto.title }}</h2>
          <p class="text-gray-600">${{ item.produto.price.toFixed(2) }}</p>
        </div>

        <!-- Controle de quantidade -->
        <div class="flex items-center border rounded overflow-hidden">
          <button
            @click="decrementar(item.produto.id)"
            class="px-3 py-1 text-xl font-bold hover:bg-gray-200 disabled:opacity-50"
            :disabled="item.quantidade <= 1"
          >
            −
          </button>
          <span class="px-4 py-1 text-lg">{{ item.quantidade }}</span>
          <button
            @click="incrementar(item.produto.id)"
            class="px-3 py-1 text-xl font-bold hover:bg-gray-200"
          >
            +
          </button>
        </div>

        <!-- Botão remover -->
        <button
          @click="remover(item.produto.id)"
          class="text-red-600 hover:underline ml-4"
        >
          Remover
        </button>
      </div>

      <div class="text-right mt-6 text-xl font-bold">
        Total: ${{ total.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart.js'

const { state, adicionarProduto, removerProduto, atualizarQuantidade } = useCart()

const items = computed(() => state.items)

function incrementar(id) {
  const item = state.items.find(i => i.produto.id === id)
  if (item) {
    atualizarQuantidade(id, item.quantidade + 1)
  }
}

function decrementar(id) {
  const item = state.items.find(i => i.produto.id === id)
  if (item && item.quantidade > 1) {
    atualizarQuantidade(id, item.quantidade - 1)
  }
}

function remover(id) {
  removerProduto(id)
}

const total = computed(() =>
  state.items.reduce((acc, item) => acc + item.produto.price * item.quantidade, 0)
)
</script>
