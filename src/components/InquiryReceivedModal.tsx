import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import enquiryCeleb from "../../public/Enquiryceleb.png"

export default function InquiryReceivedModal({ onClose, count }: { onClose: () => void; count: number }) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/profile");
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 mt-[88px] ">
            <div className="bg-white shadow-xl pt-0  p-6 md:p-9  flex flex-col items-center relative
                md:rounded-2xl md:w-[90vw] md:max-w-lg
                sm:rounded-none w-screen h-[calc(100vh-88px)] md:h-fit  justify-center
            ">
                <button
                    className="absolute top-5 right-5 text-2xl text-[#222]"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <IoMdClose />
                </button>
                <div className="flex flex-col items-center ">
                    <Image src={enquiryCeleb} alt="Success" width={100} height={100} />
                    <h2 className="font-satoshi font-bold text-2xl text-center mt-10  mb-1.5">Inquiry Received !</h2>
                    <p className="text-[#6B7280] font-medium font-satoshi text-base text-center mb-3">
                        Your order for {count} media spaces has been executed. We&apos;ll be back shortly with the best offer details.
                    </p>
                    <p className="text-[#6B7280] fixed bottom-0 mb-9 md:relative md:mb-0 font-medium font-satoshi text-sm text-center mt-6">
                        Redirecting you to your Account Section for Inquiries
                    </p>
                </div>
            </div>
        </div>
    );
}