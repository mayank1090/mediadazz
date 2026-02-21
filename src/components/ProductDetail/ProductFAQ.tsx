
"use client"
import { useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { IoAdd, IoRemove } from 'react-icons/io5';

interface FAQItem {
  faq_question: string;
  faq_answer: string;
}

interface ProductFAQProps {
  faqList?: FAQItem[];
}

export const ProductFAQ = ({ faqList = [] }: ProductFAQProps) => {
    const [openItem, setOpenItem] = useState<number | null>(null);
    const toggleItem = (id: number) => {
        setOpenItem(openItem === id ? null : id);
      };
      
  if (!faqList || faqList.length === 0) {
    return null;
  }
  
  return (
    <div>
        <h2 className="gap-3.5 flex items-center text-2xl font-bold font-satoshi ">
            <CiCircleQuestion className='w-6 h-6'/>
        FAQs
        </h2>
        <div className="mt-[1.125rem] md:mt-6 lg:mt-7">
        <section className="w-full" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
      
      <div className="space-y-3 ">
        {faqList.map((item, index) => {
          const isOpen = openItem === index;
          
          return (
            <div
              key={index}
              
              className={`rounded-xl border p-4 border-[#EEEEEE] transition-all duration-300 ease-in-out ${
                isOpen 
                  ? 'bg-[#F9F9FA]' 
                  : 'bg-white cursor-pointer'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full text-left cursor-pointer flex items-center gap-3 transition-colors duration-200 ${
                  isOpen 
                    ? 'text-brand' 
                    : 'text-black'
                }`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <div className={`flex-shrink-0 rounded-md overflow-hidden ${isOpen?'bg-[#F3F3F5]':"bg-white"}  h-8 w-8 p-1.5`}>
                  {isOpen ? (
                    <IoRemove className="w-full h-full text-black" aria-hidden="true" />
                  ) : (
                    <IoAdd className="w-full h-full text-black " aria-hidden="true" />
                  )}
                </div>
                <span className="font-bold text-base font-satoshi">{item.faq_question}</span>
                
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden mt-3 transition-all duration-300 ease-in-out ${
                  isOpen 
                    ? 'block opacity-100' 
                    : ' hidden  opacity-0'
                }`}
                aria-hidden={!isOpen}
              >
                <div className="">
                  <p className="text-black font-satoshi font-medium text-base whitespace-pre-line">
                    {item.faq_answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
        </div>
    </div>
  )
}
