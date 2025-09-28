"use client"

import { useEffect, useRef, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { FiChevronRight } from "react-icons/fi"
import { FaCar } from "react-icons/fa"
import billboard from "../../../public/billboard.jpg"
import Image from 'next/image'
import { GoPlus } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";

const mockSuggestions = [
  {
    type: "Billboards",
    title: "Rd to King Al Azab, Dubai",
    cars: "5,000,000",
    image: billboard,
    action: true,
  },
  {
    type: "Billboards",
    title: "Rd to Shammari Al Azab, Dubai",
    cars: "9,000,000",
    image: billboard,
    action: true,
  },
  {
    type: "Billboards",
    title: "Rd to King Al Aya, Dubai",
    cars: "2,000,000",
    image: billboard,
    action: true,
  },
  {
    type: "Billboards",
    title: "Sharjah Bus Stand, Dubai",
    cars: "8,000,000",
    image: billboard,
    action: true,
  },
  {
    type: "Audience",
    title: "Sports Enthusiasts",
    subtitle: "Audience Category",
    image: billboard,
    action: false,
  },
  {
    type: "Location",
    title: "Sports City",
    subtitle: "Location",
    image: "",
    action: false,
  },
  {
    type: "Media",
    title: "Mall Advertising",
    subtitle: "Media Type",
    image: billboard,
    action: false,
  },
]

const UpperSearch = () => {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTop, setMobileTop] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const filtered = query
    ? mockSuggestions.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

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
          {showSuggestions && filtered.length > 0 && (
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
                      {filtered.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center px-4 py-3 hover:bg-[#F9FAFB] transition cursor-pointer border-b last:border-b-0 border-[#F3F4F6]"
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-16 rounded-lg object-cover mr-5"
                            />
                          ) : item.type === "Location" ? (
                            <span className="w-24 h-16 flex items-center justify-center rounded-lg bg-[#FFF3ED] mr-5">
                              <svg width="24" height="24" fill="#FF7A1A" viewBox="0 0 24 24"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.05 10.74 8.09 11.51.56.41 1.26.41 1.82 0C13.95 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.14 18.09 5 13.97 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.97-5.14 7.09-7 8.88z"/><circle cx="12" cy="11" r="2.5"/></svg>
                            </span>
                          ) : (
                            <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F3F4F6] mr-4"></span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-satoshi font-medium ${item.type === "Billboards" ? "text-brand" : "text-gray-500"}`}>
                                {item.type === "Billboards" ? "Billboards" : item.type === "Audience" ? "" : ""}
                              </span>
                            </div>
                            <div className="font-bold text-base pt-1 font-satoshi  truncate">{item.title}</div>
                            {item.cars && (
                              <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                                <FaCar className="w-4 h-4 text-black" />
                                <span>{item.cars} cars/ day</span>
                              </div>
                            )}
                            {item.subtitle && (
                              <div className="text-sm text-gray-400">{item.subtitle}</div>
                            )}
                          </div>
                          {item.action ? (
                            <button className="px-3 hidden sm:flex py-2.5 text-white rounded-lg bg-brand items-center gap-0.5 ">
                             <GoPlus className="w-4 h-4 text-white"/>
                             <FaCartShopping className="w-5 h-5 text-white"/>
                            </button>
                          ) : (
                            <FiChevronRight className="ml-4 w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop/Tablet: absolute dropdown under input */}
              {!isMobile && (
                <div className="absolute left-0 top-[110%] w-full z-30 rounded-2xl bg-white shadow-2xl border border-[#EEEEEE] py-2 max-h-[420px] overflow-y-auto">
                  {filtered.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-4 py-3 hover:bg-[#F9FAFB] transition cursor-pointer border-b last:border-b-0 border-[#F3F4F6]"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-16 rounded-lg object-cover mr-5"
                        />
                      ) : item.type === "Location" ? (
                        <span className="w-24 h-16 flex items-center justify-center rounded-lg bg-[#FFF3ED] mr-5">
                          <svg width="24" height="24" fill="#FF7A1A" viewBox="0 0 24 24"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.05 10.74 8.09 11.51.56.41 1.26.41 1.82 0C13.95 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.14 18.09 5 13.97 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 2.97-5.14 7.09-7 8.88z"/><circle cx="12" cy="11" r="2.5"/></svg>
                        </span>
                      ) : (
                        <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F3F4F6] mr-4"></span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-satoshi font-medium ${item.type === "Billboards" ? "text-brand" : "text-gray-500"}`}>
                            {item.type === "Billboards" ? "Billboards" : item.type === "Audience" ? "" : ""}
                          </span>
                        </div>
                        <div className="font-bold text-base pt-1 font-satoshi  truncate">{item.title}</div>
                        {item.cars && (
                          <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                            <FaCar className="w-4 h-4 text-black" />
                            <span>{item.cars} cars/ day</span>
                          </div>
                        )}
                        {item.subtitle && (
                          <div className="text-sm text-gray-400">{item.subtitle}</div>
                        )}
                      </div>
                      {item.action ? (
                        <button className="px-3 hidden sm:flex py-2.5 text-white rounded-lg bg-brand items-center gap-0.5 ">
                         <GoPlus className="w-4 h-4 text-white"/>
                         <FaCartShopping className="w-5 h-5 text-white"/>
                        </button>
                      ) : (
                        <FiChevronRight className="ml-4 w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <button
          type="submit"
          className="rounded-xl hidden md:block whitespace-nowrap font-satoshi bg-white text-brand px-5 py-[1.125rem] text-pretty text-xl font-bold  border border-brand hover:md:scale-[1.02]  outline-none  transition-all duration-300 ease-in-out transform"
        >
          Search
        </button>
        <button
          type="submit"
          className="rounded-xl md:hidden whitespace-nowrap font-satoshi bg-brand py-4 px-[1.125rem] text-pretty text-xl font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <LuSearch className=" text-white h-5 w-5"/>
        </button>
      </form>
    </div>
  )
}

export default UpperSearch