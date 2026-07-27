import { useState, useEffect } from "react";

// Hook untuk mendeteksi arah scroll
export function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState(null);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const updateScrollDirection = () => {
			const scrollY = window.scrollY;
			const direction = scrollY > lastScrollY ? "down" : "up";

			// Cegah trigger jika scroll kurang dari 10px (biar tidak sensitif/getar)
			if (
				direction !== scrollDirection &&
				(scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
			) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		window.addEventListener("scroll", updateScrollDirection);
		return () =>
			window.removeEventListener("scroll", updateScrollDirection);
	}, [scrollDirection]);

	return scrollDirection;
}
