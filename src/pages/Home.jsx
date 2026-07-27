import Hero from "../components/Hero";
import Categories from "../components/Categories";

export default function Home() {
	return (
		<div className="flex flex-col gap-8">
			<Hero />
			<Categories />
		</div>
	);
}
