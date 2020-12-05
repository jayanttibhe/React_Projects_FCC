/** @format */

import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-tours-project';

const App = () => {
	const [loaing, setLoaing] = useState(true);
	const [tours, setTours] = useState([]);

	const removeTour = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		//console.log('newTours', newTours);
		setTours(newTours);
	};

	const fetchTours = async () => {
		setLoaing(true);

		try {
			const response = await fetch(url);
			const tours = await response.json();
			setLoaing(false);
			setTours(tours);
		} catch (error) {
			setLoaing(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	if (loaing) {
		return (
			<main>
				<Loading />
			</main>
		);
	}

	if (tours.length === 0) {
		return (
			<main>
				<div className='title'>
					<h2>No Tours Left</h2>
					<button className='btn' onClick={fetchTours}>
						Refrsh Data
					</button>
				</div>
			</main>
		);
	}

	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
};

export default App;
