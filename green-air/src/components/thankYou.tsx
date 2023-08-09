export const ThankYou = () => {
	return (
		<section className="flex flex-col justify-center items-center w-full gap-4 py-[36px]">
			<figure className="w-[60px] h-[60px]">
				<img
					src="./assets/images/icon-thank-you.svg"
					alt="Form compleated, thank you!"
				/>
			</figure>
			<h2>Thank you</h2>
			<span className="text-center">
				<p>Thanks for register!</p>
				<p>
					Please login to enjoy the app
				</p>
			</span>
		</section>
	);
};