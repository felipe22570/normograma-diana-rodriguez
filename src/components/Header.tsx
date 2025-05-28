import Image from "next/image";
import { Playwrite_HR } from "next/font/google";

const playwrite = Playwrite_HR({
	weight: "400",
});

const Header = () => {
	return (
		<div className="bg-[#1e2a3b] text-white">
			{/* Main Normograma Header */}
			<div className="container mx-auto py-10 px-6">
				<div className="flex flex-col items-center gap-6">
					<Image
						src="/icon.png"
						alt="Droguería Girafarma"
						width={60}
						height={60}
						className="rounded-full"
					/>
					<h1
						className={`text-6xl font-light tracking-wider text-center ${playwrite.className}`}
					>
						NORMOGRAMA
					</h1>
				</div>
			</div>

			{/* Author and Date Bar */}
			<div className="bg-[#243447] py-6">
				<div className="container mx-auto px-8 flex justify-center items-center">
					<h2 className="text-2xl">DIANA ALEJANDRA RODRÍGUEZ</h2>
				</div>
			</div>

			{/* Legislation Section */}
			<div className="container mx-auto py-8 px-6">
				<div className="flex items-center justify-center gap-6">
					<Image src="/university.png" alt="Universidad de Antioquia" width={60} height={60} />
					<h2 className="text-3xl">LEGISLACIÓN FARMACÉUTICA</h2>
					<Image src="/books.jpg" alt="Libros" width={100} height={100} />
				</div>
			</div>
		</div>
	);
};

export default Header;
