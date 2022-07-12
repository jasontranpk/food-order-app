import { useContext, useState } from 'react';

import Checkout from './Checkout';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';

import CartContext from '../store/cart-context';
import CartItem from './CartItem';

function Cart(props) {
	const [isCheckout, setIsCheckout] = useState(false);
	const cartCtx = useContext(CartContext);
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);
	function cartItemRemoveHandler(id) {
		cartCtx.removeItem(id);
	}
	function cartItemAddHandler(item) {
		cartCtx.addItem({ ...item, amount: 1 });
	}

	function orderHandler() {
		setIsCheckout(true);
	}

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItem = cartCtx.items.length > 0 ? true : false;
	const modalActions = (
		<div className={classes.actions}>
			<button onClick={props.onClose} className={classes['button--alt']}>
				Close
			</button>
			{hasItem && (
				<button onClick={orderHandler} className={classes.button}>
					Order
				</button>
			)}
		</div>
	);
	return (
		<Modal onBackdropClick={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout cancelBtnOnClick={props.onClose} />}
			{!isCheckout && modalActions}
		</Modal>
	);
}

export default Cart;
