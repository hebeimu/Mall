

export default {
  addCart (context, payload) {
    return new Promise ((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
    
      if (oldProduct) {
        context.commit('add_counter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('add_to_cart', payload)
        resolve('添加了新的商品')
      }

    })
  }
}