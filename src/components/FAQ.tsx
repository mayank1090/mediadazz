'use client';

import React, { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is MediaDazz?",
    answer: "MediaDazz is a leading advertising and media marketplace in the UAE, offering a comprehensive platform for businesses to find, book, and manage advertising spaces across a variety of channels, including digital, print, outdoor, and more. Our mission is to simplify media buying and maximize ROI for advertisers."
  },
  {
    id: 2,
    question: "Is MediaDazz trustworthy?",
    answer: "Yes, MediaDazz is a trusted platform with verified partners and secure payment processing. We maintain high standards for all our advertising partners and provide transparent reporting for all campaigns."
  },
  {
    id: 3,
    question: "Why should I trust MediaDazz with my media planning budget?",
    answer: "MediaDazz offers competitive pricing, verified inventory, and comprehensive campaign management tools. Our platform provides detailed analytics and ROI tracking to ensure your media planning budget delivers maximum value."
  },
  {
    id: 4,
    question: "What regulations apply to billboard advertising in Dubai?",
    answer: "Billboard advertising in Dubai is regulated by the Dubai Municipality and follows specific guidelines regarding content, placement, and safety standards. MediaDazz ensures all campaigns comply with local regulations."
  },
  {
    id: 5,
    question: "How does MediaDazz ensure the effectiveness of its media campaigns?",
    answer: "We use advanced analytics, A/B testing, and performance tracking to optimize campaign effectiveness. Our platform provides real-time insights and recommendations to improve campaign performance."
  },
  {
    id: 6,
    question: "What billboard sizes are available for advertising in Dubai?",
    answer: "MediaDazz offers various billboard sizes including 48-sheet, 96-sheet, and digital billboards in multiple formats. We provide detailed specifications and location information for each available space."
  },
  {
    id: 7,
    question: "What is the process for launching a billboard advertising campaign in Dubai?",
    answer: "The process includes: 1) Browse available inventory, 2) Select your preferred locations and dates, 3) Upload your creative materials, 4) Review and approve the campaign, 5) Launch and monitor performance through our dashboard."
  },
  {
    id: 8,
    question: "How competitive is the media market in the UAE?",
    answer: "The UAE media market is highly competitive with numerous opportunities across digital, print, and outdoor advertising. MediaDazz helps you navigate this competitive landscape by providing access to premium inventory at competitive rates."
  }
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number>(1); // First item is open by default

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? -1 : id);
  };

  return(
         <div className="py-[3.375rem] px-6 lg:px-24 lg:py-[6.25rem] xl:px-[7.75rem] flex flex-col gap-[2.625rem] lg:gap-6 lg:flex-row ">
            <aside className='flex flex-col gap-2.5 lg:gap-3 lg:max-w-[40%] xl:max-w-[30%]'>
            <h3 className="font-satoshi font-bold text-sm text-brand">common questions</h3>
            <h2 className="font-satoshi font-bold text-[2rem] lg:text-4xl xl:leading-14 xl:text-[2.625rem] leading-[2.625rem]">Frequently
            asked questions</h2>
            </aside>
    <section className="w-full" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
      
      <div className="space-y-3 ">
        {faqData.map((item) => {
          const isOpen = openItem === item.id;
          
          return (
            <div
              key={item.id}
              
              className={`rounded-xl border p-4 border-[#EEEEEE] transition-all duration-300 ease-in-out ${
                isOpen 
                  ? 'bg-[#F9F9FA]' 
                  : 'bg-white cursor-pointer'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left cursor-pointer flex items-center gap-3 transition-colors duration-200 ${
                  isOpen 
                    ? 'text-brand' 
                    : 'text-black'
                }`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className={`flex-shrink-0 rounded-md overflow-hidden ${isOpen?'bg-[#F3F3F5]':"bg-white"}  h-8 w-8 p-1.5`}>
                  {isOpen ? (
                    <IoRemove className="w-full h-full text-black" aria-hidden="true" />
                  ) : (
                    <IoAdd className="w-full h-full text-black " aria-hidden="true" />
                  )}
                </div>
                <span className="font-bold text-base font-satoshi">{item.question}</span>
                
              </button>
              
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden mt-3 transition-all duration-300 ease-in-out ${
                  isOpen 
                    ? 'block opacity-100' 
                    : ' hidden  opacity-0'
                }`}
                aria-hidden={!isOpen}
              >
                <div className="">
                  <p className="text-black font-satoshi font-medium text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
    </div>
  );
};

export default FAQ;
