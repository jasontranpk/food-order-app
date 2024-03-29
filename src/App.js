import { useState } from 'react';

import Header from './Layout/Header';
import Meals from './Meals/Meals';
import Cart from './Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	function showCartHandler() {
		setCartIsShown(true);
	}
	function hideCartHandler() {
		setCartIsShown(false);
	}
	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}

			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
