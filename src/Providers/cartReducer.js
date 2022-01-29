const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedCard = [...state.cart];
      const index = updatedCard.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) {
        updatedCard.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedItem = { ...updatedCard[index] };
        console.log(updatedItem);
        updatedItem.quantity++;
        updatedCard[index] = updatedItem;
      }
      return {
        ...state,
        cart: updatedCard,
        total: state.total + action.payload.offPrice,
      };
    }
    case "DECREMENT_PRODUCT": {
      console.log(state);
      const updatedCard = [...state.cart];
      const index = updatedCard.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = { ...updatedCard[index] };
      if (updatedItem.quantity === 1) {
        const filteredCart = updatedCard.filter(
          (item) => item.id !== action.payload.id
        );
        return { ...state, cart: filteredCart };
      } else {
        updatedItem.quantity--;
        updatedCard[index] = updatedItem;
        return {
          ...state,
          cart: updatedCard,
          total: state.total - action.payload.offPrice,
        };
      }
    }
    case "REMOVE_PRODUCT": {
      console.log(state);
      const updatedCard = [...state.cart];
      const index = updatedCard.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = { ...updatedCard[index] };

      const filteredCart = updatedCard.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: filteredCart,
        total: state.total - action.payload.offPrice,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
