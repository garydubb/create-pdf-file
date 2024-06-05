export default function Home() {
	const generatePdf = async () => {
		const res = await fetch("/api/generatePdf", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST", // You probably can use get aswell, you can use a post request with a custom body to generate dynamic data in your pdf view, I am going to cover that in a different post :)
		});
		return res.json();
	};

	return (
		<div>
			<main>
				<button type="button" onClick={generatePdf}>
					Create PDF
				</button>
			</main>
		</div>
	);
}
