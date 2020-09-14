

export default {
  add_counter (state, payload) {
    payload.count++
  },

  add_to_cart (state, payload) {
    payload.check = true
    
    state.cartList.push(payload)
  }
}