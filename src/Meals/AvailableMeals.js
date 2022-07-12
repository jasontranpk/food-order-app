import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

function AvailableMeal(props) {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMealsHandler = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://react-http-48f5c-default-rtdb.firebaseio.com/meals.json'
			);
			if (!response.ok) {
				throw new Error('Something wrongs!');
			}
			const data = await response.json();
			const loadedMeals = [];
			for (let meal of data) {
				if (meal !== null) {
					loadedMeals.push(meal);
				}
			}
			setMeals(loadedMeals);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		fetchMealsHandler();
	}, []);
	const mealsList = meals.map((meal) => {
		//console.log(meal);
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				price={meal.price}
				description={meal.description}
				name={meal.name}
			/>
		);
	});
	let content = <p>Found no meals</p>;

	if (mealsList.length > 0) {
		content = <ul>{mealsList}</ul>;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<section className={classes.meals}>
			<Card>{content}</Card>
		</section>
	);
}

export default AvailableMeal;
