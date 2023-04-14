const { create } = require("zustand");

const useCart = create((set, get) => ({
  cart: [],
  product: {},
  openModal: false,

  onOpenModal: () => set((state) => ({ openModal: true })),
  onCloseModal: () => set((state) => ({ openModal: false })),
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),

  addItemToCart: (params) => {
    const { newItem } = params;
    set((state) => {
      const newCart = [...state.cart, newItem];
      return {
        ...state,
        cart: newCart,
      };
    });
  },

  removeItemFromCart: (params) => {
    const { itemIndex } = params;
    set((state) => {
      const newCart = state.cart.filter((element, elementIndex) => {
        return elementIndex !== itemIndex;
      });

      return {
        ...state,
        cart: newCart,
      };
    });
  },

  emptyCart: () => {
    set((state) => {
      const newCart = [];
      return {
        ...state,
        cart: newCart,
      };
    });
  },

  setProduct: (params) => {
    const { newProduct } = params;
    set((state) => {
      return {
        ...state,
        product: newProduct,
      };
    });
  },
}));

export default useCart;
