"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { LuSearch } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import { FiChevronRight } from "react-icons/fi"
import { FaCar } from "react-icons/fa"
import Image from 'next/image'
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import { useLazySearchProductsQuery, useAddToCartMutation } from '@/store/productApi'
import { toast } from 'react-toastify'

const UpperSearch = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTop, setMobileTop] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const [searchProducts, { data: searchData, isLoading: isSearching, error: searchError }] = useLazySearchProductsQuery()
  const [addToCart] = useAddToCartMutation()

  // Debounce search query
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // 300ms debounce delay

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query])

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      searchProducts(debouncedQuery)
    }
  }, [debouncedQuery, searchProducts])

  const products = searchData?.products_list || []
  const filtered = query.trim().length > 0 ? products : []

  const handleAddToCart = useCallback(async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation()
    
    if (!productId) {
      toast.error('Product ID is required', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const result = await addToCart({ product_id: productId }).unwrap();
      
      if (result.status === 'true') {
        toast.success(result.msg || 'Item added to cart', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(result.msg || 'Failed to add item to cart', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error: any) {
      const errorMessage = error?.data?.msg || error?.message || 'Failed to add item to cart';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [addToCart])

  const handleProductClick = useCallback((slug: string) => {
    router.push(`/productdetail/${slug}`)
    setShowSuggestions(false)
    setQuery("")
  }, [router])

  // Determine if viewport is mobile (Tailwind 'sm' breakpoint ~640px)
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 640)
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  // Recalculate top position for mobile overlay whenever suggestions open or on scroll/resize
  useEffect(() => {
    if (!showSuggestions || !isMobile) return

    const computeTop = () => {
      const rect = inputRef.current?.getBoundingClientRect()
      setMobileTop(rect ? rect.bottom : 0)
    }

    computeTop()
    window.addEventListener('scroll', computeTop, { passive: true })
    window.addEventListener('resize', computeTop)
    return () => {
      window.removeEventListener('scroll', computeTop)
      window.removeEventListener('resize', computeTop)
    }
  }, [showSuggestions, isMobile])

  // Lock background scroll when mobile suggestions are open
  useEffect(() => {
    if (showSuggestions && isMobile) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [showSuggestions, isMobile])

  return (
    <div className='flex-1 relative shrink-0 lg:max-w-[60%]'>
      <form
        role="search"
        aria-label="Search media"
        className="flex items-stretch gap-[0.875rem] w-full "
        onSubmit={e => e.preventDefault()}
        autoComplete="off"
      >
        <label htmlFor="hero-search" className="sr-only">
          Search by media type, location, or audience
        </label>
        <div className="relative w-full flex gap-2.5">
          <LuSearch
            aria-hidden="true"
            className="pointer-events-none hidden md:block absolute left-[1.125rem] top-1/2 -translate-y-1/2 text-balck"
            size={24}
          />
          <input
            id="hero-search"
            name="q"
            type="search"
            placeholder="Search by Media type, Location or Audience"
            className="w-full rounded-xl border outline-none border-[#EEEEEE] bg-white px-[1.125rem] md:pl-[3.25rem] md:pr-4 text-gray-800 shadow-[0px 4px 40px 0px #0000001A] placeholder:text-[#6B7280] placeholder:font-medium placeholder:text-sm placeholder:lg:text-lg"
            value={query}
            ref={inputRef}
            onChange={e => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => query && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
          />
          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <>
              {/* Mobile: fixed overlay attached under the input; background scroll locked */}
              {isMobile && (
                <div className="fixed inset-0 z-40">
                  {/* Clickable transparent area above list to close */}
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: 0, height: mobileTop }}
                    onClick={() => setShowSuggestions(false)}
                  />
                  <div
                    className="absolute left-0 right-0 bg-white border-t border-[#EEEEEE] shadow-2xl"
                    style={{ top: mobileTop, bottom: 0 }}
                  >
                    <div className="py-2 h-full overflow-y-auto">
                      {isSearching && query.trim().length > 0 ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-sm text-gray-500 font-satoshi">Searching...</div>
                        </div>
                      ) : searchError ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-sm text-red-500 font-satoshi">Error loading results</div>
                        </div>
                      ) : filtered.length > 0 ? (
                        filtered.map((item) => (
                          <div
                            key={item.product_id}
                            onClick={() => handleProductClick(item.product_slug_url)}
                            className="flex items-center px-4 py-3 hover:bg-[#F9FAFB] transition cursor-pointer border-b last:border-b-0 border-[#F3F4F6]"
                          >
                            {item.productimg ? (
                              <Image
                                src={item.productimg}
                                alt={item.product_name}
                                width={96}
                                height={64}
                                className="w-24 h-16 rounded-lg object-cover mr-5"
                              />
                            ) : (
                              <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F3F4F6] mr-4"></span>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-satoshi font-medium text-brand`}>
                                  {item.subcategories_name || item.categories_name}
                                </span>
                              </div>
                              <div className="font-bold text-base pt-1 font-satoshi truncate">{item.product_name}</div>
                              {item.products_reach_count && item.product_reach_type && item.product_reach_duration && (
                                <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                                  <FaCar className="w-4 h-4 text-black" />
                                  <span>{item.products_reach_count} {item.product_reach_type.toLowerCase()}/ {item.product_reach_duration}</span>
                                </div>
                              )}
                            </div>
                            <button 
                              onClick={(e) => handleAddToCart(e, item.product_id)}
                              className="px-3 hidden sm:flex py-2.5 text-white rounded-lg bg-brand items-center gap-0.5"
                            >
                              <GoPlus className="w-4 h-4 text-white"/>
                              <FaCartShopping className="w-5 h-5 text-white"/>
                            </button>
                          </div>
                        ))
                      ) : query.trim().length > 0 ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-sm text-gray-500 font-satoshi">No results found</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop/Tablet: absolute dropdown under input */}
              {!isMobile && (
                <div className="absolute left-0 top-[110%] w-full z-30 rounded-2xl bg-white shadow-2xl border border-[#EEEEEE] py-2 max-h-[420px] overflow-y-auto">
                  {isSearching && query.trim().length > 0 ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-sm text-gray-500 font-satoshi">Searching...</div>
                    </div>
                  ) : searchError ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-sm text-red-500 font-satoshi">Error loading results</div>
                    </div>
                  ) : filtered.length > 0 ? (
                    filtered.map((item) => (
                      <div
                        key={item.product_id}
                        onClick={() => handleProductClick(item.product_slug_url)}
                        className="flex items-center px-4 py-3 hover:bg-[#F9FAFB] transition cursor-pointer border-b last:border-b-0 border-[#F3F4F6]"
                      >
                        {item.productimg ? (
                          <Image
                            src={item.productimg}
                            alt={item.product_name}
                            width={96}
                            height={64}
                            className="w-24 h-16 rounded-lg object-cover mr-5"
                          />
                        ) : (
                          <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F3F4F6] mr-4"></span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-satoshi font-medium text-brand`}>
                              {item.subcategories_name || item.categories_name}
                            </span>
                          </div>
                          <div className="font-bold text-base pt-1 font-satoshi truncate">{item.product_name}</div>
                          {item.products_reach_count && item.product_reach_type && item.product_reach_duration && (
                            <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                              <FaCar className="w-4 h-4 text-black" />
                              <span>{item.products_reach_count} {item.product_reach_type.toLowerCase()}/ {item.product_reach_duration}</span>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={(e) => handleAddToCart(e, item.product_id)}
                          className="px-3  hidden sm:flex py-2.5 ml-3 text-white rounded-lg bg-brand items-center gap-0.5"
                        >
                          <GoPlus className="w-4 h-4 text-white"/>
                          <FaCartShopping className="w-5 h-5 text-white"/>
                        </button>
                      </div>
                    ))
                  ) : query.trim().length > 0 ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-sm text-gray-500 font-satoshi">No results found</div>
                    </div>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            if (query.trim().length > 0) {
              searchProducts(query)
              setShowSuggestions(true)
            }
          }}
          className="rounded-xl hidden md:block whitespace-nowrap font-satoshi bg-white text-brand px-5 py-[1.125rem] text-pretty text-xl font-bold  border border-brand hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform"
        >
          Search
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            if (query.trim().length > 0) {
              searchProducts(query)
              setShowSuggestions(true)
            }
          }}
          className="rounded-xl md:hidden whitespace-nowrap font-satoshi bg-brand py-4 px-[1.125rem] text-pretty text-xl font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <LuSearch className=" text-white h-5 w-5"/>
        </button>
      </form>
    </div>
  )
}

export default UpperSearch