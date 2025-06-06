import { reactive, readonly } from 'vue'

const state = reactive({
  items: [] // { produto, quantidade }
})

function adicionarProduto(produto, quantidade = 1) {
  const item = state.items.find(i => i.produto.id === produto.id)
  if (item) {
    item.quantidade += quantidade
  } else {
    state.items.push({ produto, quantidade })
  }
}

function removerProduto(idProduto) {
  const index = state.items.findIndex(i => i.produto.id === idProduto)
  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

function atualizarQuantidade(idProduto, novaQuantidade) {
  const item = state.items.find(i => i.produto.id === idProduto)
  if (item) {
    item.quantidade = novaQuantidade
    if (item.quantidade <= 0) {
      removerProduto(idProduto)
    }
  }
}

function limparCarrinho() {
  state.items.splice(0)
}

const getters = {
  totalItens: () => state.items.reduce((acc, i) => acc + i.quantidade, 0),
  totalPreco: () => state.items.reduce((acc, i) => acc + i.produto.price * i.quantidade, 0)
}

export function useCart() {
  return {
    state: readonly(state),
    adicionarProduto,
    removerProduto,
    atualizarQuantidade,
    limparCarrinho,
    getters
  }
}
