import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

function cartReducer(state, action) {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		console.log(action.item.id);
		let updatedItems;
		if (existingCartItemIndex !== -1) {
			const updateItem = {
				...state.items[existingCartItemIndex],
				amount:
					state.items[existingCartItemIndex].amount +
					action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updateItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updateItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updateItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'CLEAR') {
		return defaultCartState;
	}
	return defaultCartState;
}

function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	function addItemToCartHandler(item) {
		dispatchCartAction({ type: 'ADD', item: item });
	}
	function removeItemFromCart(id) {
		dispatchCartAction({ type: 'REMOVE', id: id });
	}
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCart,
		clearCart: clearCartHandler,
	};
	function clearCartHandler() {
		dispatchCartAction({ type: 'CLEAR' });
	}
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;
