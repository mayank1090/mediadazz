import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import cart from "../../public/cart.svg";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiMoneyWavy } from "react-icons/pi";
import { useRouter } from "next/navigation";

const cartItems = [
	{
		id: 1,
		image: "/first.svg",
		category: "Billboards",
		title: "LED Unipole on Deira Al Maktoum Bridge Road",
		price: "Price on Request",
		priceValue: 0,
	},
	{
		id: 2,
		image: "/first.svg",
		category: "Billboards",
		title: "Back-lit unipole billboard on Al Khawaneej Road, near...",
		price: "10,000 AED",
		priceValue: 10000,
	},
];

export default function MediaCartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const router = useRouter();

	if (!open) return null;

	// Responsive: full screen on mobile, side modal on desktop
	return (
		<div className="fixed inset-0 z-50 flex items-end md:items-start justify-center md:justify-end bg-black/30">
			<div className="w-full px-6 py-9 md:p-9 md:w-[480px] h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none shadow-xl flex flex-col relative animate-slideInRight">
				{/* Close Button */}
				<button
					className="absolute top-9 right-6 md:right-9 text-2xl text-[#222] z-10"
					onClick={onClose}
					aria-label="Close"
				>
					<IoMdClose />
				</button>
				{/* Header */}
				<div className="flex flex-col gap-1.5">
					<span className="font-satoshi font-bold text-2xl flex items-center gap-2">
						<Image src={cart} alt="Cart" width={24} height={24} />
						MediaCart
					</span>
					<span className="text-[#6B7280] font-medium text-base font-satoshi">
						{cartItems.length} AdSpace
					</span>
				</div>
				{/* Info */}
				<div className="mt-6 md:mt-8 mb-[0.875rem] p-[0.875rem] rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] flex items-center gap-2">
					<div className="bg-white p-2 rounded-full flex items-center justify-center">
						<IoInformationCircleOutline className="text-[#3B82F6] w-6 h-6" />
					</div>
					<span className="font-medium text-sm font-satoshi">
						Price will be Requested from Media Owner after you confirm your Order
					</span>
				</div>
				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto space-y-3.5">
					{cartItems.map((item) => (
						<div
							key={item.id}
							className="bg-white border border-[#E5E7EB] rounded-lg p-1.5 flex flex-col sm:flex-row"
						>
							<div className="rounded-lg overflow-hidden sm:max-w-[40%]">
								<Image
									src={item.image}
									alt={item.title}
									width={96}
									height={80}
									className="object-cover w-full h-full"
								/>
							</div>
							<div className="flex flex-col flex-1 px-[1.125rem] py-3.5">
								<span className="text-sm font-satoshi text-brand font-medium">
									{item.category}
								</span>
								<span className="font-satoshi font-medium text-base line-clamp-2 mt-3">
									{item.title}
								</span>
								<span className="flex items-center gap-2 text-sm font-satoshi  mt-5">
									<IoPricetagsOutline className="w-[1.125rem] h-[1.125rem]" />
									{item.price}
								</span>
							</div>
						</div>
					))}
				</div>
				{/* Footer */}
				<div className="pt-4">
					<div className="flex items-center justify-between mb-6 border border-[#EEEEEE] rounded-lg px-6 py-3.5">
						<span className="flex items-center gap-2.5 font-satoshi font-medium text-base">
							<PiMoneyWavy className="w-6 h-6" />
							Total Price
						</span>
						<span className="font-satoshi font-medium text-base">0 AED</span>
					</div>
					<button
						className="w-full bg-brand text-white font-bold font-satoshi text-lg rounded-xl py-5"
						onClick={() => {
							onClose();
							router.push("/order-summary");
						}}
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
}