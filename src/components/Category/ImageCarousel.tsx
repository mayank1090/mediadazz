import React from 'react'
import Image from 'next/image'
import billboard from "../../../public/billboard.jpg";
import hoarding from "../../../public/hoarding.jpg";
import lamppost from "../../../public/lampposat.jpg";
import { useRouter } from 'next/navigation';

export const ImageCarousel = () => {
  const router = useRouter();

    const Carouseldata = [
        {image:billboard,
          title:"Billboards"
        },
        {image:hoarding,
          title:"Hoardings "
        },
        {image:lamppost,
          title:"Lamp posts"
        },
        {image:billboard,
          title:"Billboards"
        },
        {image:hoarding,
          title:"Hoardings "
        },
        {image:lamppost,
          title:"Lamp posts"
        },
        {image:lamppost,
          title:"Lamp posts"
        }
      ]
  return (
    <div className="mt-8 flex lg:gap-6 gap-3 overflow-x-auto no-scrollbar">
    {Carouseldata.map((item, index)=>(<div onClick={()=>router.push("/subcategory")} key={index} className='flex flex-col flex-1 min-w-40 gap-5'>
      <Image src={item?.image} className='w-full rounded-lg ' alt='image'/>
      <h4 className="text-center font-medium text-base font-satoshi">{item?.title}</h4>
    </div>))}
</div>
  )
}
