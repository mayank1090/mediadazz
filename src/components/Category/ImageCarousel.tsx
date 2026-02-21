import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { SubCategory } from '@/store/categoryApi';

interface ImageCarouselProps {
  data: SubCategory[];
  basePath?: string; // Optional base path for navigation, defaults to "/subcategory"
  // If basePath contains [slug], it will be replaced with the actual slug
  // Otherwise, slug will be appended as a query parameter: ?slug=xxx
}

export const ImageCarousel = ({ data, basePath = "/subcategory" }: ImageCarouselProps) => {
  const router = useRouter();

  const handleNavigation = (slug: string) => {
    let path: string;
    
    if (basePath.includes('[slug]')) {
      // Replace [slug] placeholder with actual slug
      path = basePath.replace('[slug]', slug);
    } else if (basePath.includes('?')) {
      // If basePath already has query params, append slug with &
      path = `${basePath}&slug=${slug}`;
    } else {
      // Default: append slug as query parameter
      path = `${basePath}?slug=${slug}`;
    }
    
    router.push(path);
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 flex lg:gap-6 gap-3 overflow-x-auto no-scrollbar">
      {data.map((item, index) => (
        <div 
          onClick={() => handleNavigation(item.sub_category_slug)} 
          key={index} 
          className='flex flex-col flex-1 min-w-40 gap-5 cursor-pointer'
        >
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image 
              src={item.sub_category_image} 
              className='w-full h-full object-cover rounded-lg' 
              alt={item.sub_category_name}
              width={160}
              height={160}
              unoptimized={item.sub_category_image.startsWith('http')}
            />
          </div>
          <h4 className="text-center font-medium text-base font-satoshi">{item.sub_category_name}</h4>
        </div>
      ))}
    </div>
  )
}
