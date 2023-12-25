import { Todos } from "./todos";

export default function App() {
	return (
		<>
			<div className="min-h-screen md:px-0 px-2.5 py-5">
				<p className="text-2xl font-semibold text-center p-5 ">Welcome</p>
				<Todos />
			</div>
		</>
	);
}
