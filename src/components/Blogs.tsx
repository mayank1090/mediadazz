import Image from "next/image"
import blogone from "../../public/blogone.png";
import blogtwo from "../../public/blogtwo.png";
import blogthree from "../../public/blogthree.jpg";
import { FiArrowUpRight } from "react-icons/fi";

export default function Blogs (){
    return(<>
     <div className="py-[3.375rem] px-6 lg:px-24 lg:py-[6.25rem] xl:px-[7.75rem]">
        <div className="flex justify-between items-end">
            <div className="lg:max-w-[40%] xl:max-w-[31%]">
                <h3 className="font-satoshi font-bold text-sm text-brand">FEATURED POSTS</h3>
                <h2 className="font-satoshi mt-3.5 font-bold text-[2rem] lg:text-4xl xl:text-5xl xl:leading-14 leading-[2.625rem]">Stay inform with the latest</h2>
            </div>
            <button className="px-[1.125rem] hidden lg:block py-3.5 bg-brand font-satoshi rounded-lg text-lg font-bold text-white hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg hover:md:shadow-orange-500/25 hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform">View all Posts</button>
        </div>
        <div className="mt-[2.625rem] md:mt-12 lg:mt-16 lg:flex lg:gap-6">
            <div className="rounded-tr-2xl flex-1 lg:flex flex-col rounded-tl-2xl overflow-hidden hidden">
               <Image src={blogone} alt="blogs" className="w-full min-h-[325px] lg:min-h-[348px] object-cover object-center"/>
               <div className="px-8 py-7 lg:px-6 xl:px-8 border border-[#EEEEEE] rounded-br-2xl rounded-bl-2xl">
                <h3 className="font-satoshi text-[1.75rem] leading-9 font-bold">FM Radio Stations in Dubai – Choosing the right mix for your brand</h3>
                <p className="mt-4 text-lg font-satoshi">You'll get a guaranteed free lifetime update ✨ and we will keep updating and improving to the latest Figma features!</p>
                <div className="flex justify-between items-center mt-6 ">
                    <button className="p-2 font-bold gap-1.5 font-satoshi text-base flex items-center border-[#EEEEEE] border rounded-lg"> Read more <FiArrowUpRight/></button>
                    <p className="font-satoshi font-medium text-sm text-[#6B7280]">2 days ago</p>
                </div>
               </div>
            </div>
            <div className="grid md:grid-cols-2 lg:flex lg:flex-col lg:flex-1 gap-6">
                <div className="flex flex-col flex-1 lg:flex-row rounded-2xl overflow-hidden">
                    <Image src={blogtwo} alt="blog" className="lg:max-w-[43%] w-full min-h-[325px] lg:min-h-0 h-full  object-cover object-center"/>
                    <div className="px-8 py-7 lg:px-6 xl:px-8 flex flex-col justify-between border border-[#EEEEEE] border-t-0 rounded-bl-2xl  rounded-br-2xl lg:border-t lg:border-l-0 lg:rounded-bl-none lg:rounded-tr-2xl ">
                <h3 className="font-satoshi text-2xl leading-9 font-bold">Advertising on Burj Khalifa: The World’s Tallest Billboard</h3>
               
                <div className="flex justify-between items-center mt-6  lg:gap-1">
                    <button className="p-2 font-bold gap-1.5 font-satoshi text-sm flex items-center border-[#EEEEEE] border rounded-lg"> Read more <FiArrowUpRight/></button>
                    <p className="font-satoshi font-medium text-sm text-[#6B7280]">2 days ago</p>
                </div>
               </div>

                </div>
                <div className="flex flex-col flex-1 lg:flex-row rounded-2xl overflow-hidden">
                    <Image src={blogthree} alt="blog" className="lg:max-w-[43%] min-h-[325px] lg:min-h-0 h-full  object-cover object-center"/>
                    <div className="px-8 lg:px-6 xl:px-8 py-7 flex flex-col justify-between border border-[#EEEEEE] border-t-0 rounded-bl-2xl  rounded-br-2xl lg:border-t lg:border-l-0 lg:rounded-bl-none lg:rounded-tr-2xl ">
                <h3 className="font-satoshi text-2xl leading-9 font-bold">Advertising on Burj Khalifa: The World’s Tallest Billboard</h3>
               
                <div className="flex justify-between items-center mt-6 lg:gap-1 ">
                    <button className="p-2 font-bold gap-1.5 font-satoshi text-sm flex items-center border-[#EEEEEE] border rounded-lg"> Read more <FiArrowUpRight/></button>
                    <p className="font-satoshi font-medium text-sm text-[#6B7280]">2 days ago</p>
                </div>
               </div>

                </div>
            </div>
        </div>
     </div>
    </>)
}