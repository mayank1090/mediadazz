'use client'

import React, { useState } from 'react'
import { IoChevronDown, IoChevronUp, IoSearch } from 'react-icons/io5'

interface FilterOption {
  id: string
  label: string
  options: string[]
  type: 'radio' | 'checkbox' | 'range'
}

const Filteroptions = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [citySearch, setCitySearch] = useState('')

  const filterOptions: FilterOption[] = [
    {
      id: 'City',
      label: 'City',
      options: ['Dubai', 'Abu Dhabi', 'Sharjah'],
      type: 'checkbox' // <-- changed from 'radio' to 'checkbox'
    },
    {
      id: 'Sub-Category',
      label: 'Sub-Category',
      options: ['Billboard', 'Digital Display', 'Transit Advertising'],
      type: 'checkbox'
    },
    {
      id: 'Location',
      label: 'Location',
      options: ['Downtown', 'Airport', 'Shopping Mall', 'Highway'],
      type: 'checkbox'
    },
    {
      id: 'Prices',
      label: 'Prices',
      options: ['Under $1000', '$1000-$5000', '$5000-$10000', 'Above $10000'],
      type: 'checkbox'
    },
    {
      id: 'Type',
      label: 'Type',
      options: ['Static', 'Digital', 'Interactive'],
      type: 'radio'
    },
    {
      id: 'Reach',
      label: 'Reach',
      options: ['Local', 'Regional', 'National'],
      type: 'radio'
    },
    {
      id: 'Audience by Business Category',
      label: 'Audience by Business Category',
      options: ['Retail', 'Technology', 'Healthcare', 'Finance'],
      type: 'checkbox'
    },
    {
      id: 'Audience by Income Class',
      label: 'Audience by Income Class',
      options: ['Low Income', 'Middle Income', 'High Income'],
      type: 'checkbox'
    },
    {
      id: 'Audience by Age Group',
      label: 'Audience by Age Group',
      options: ['18-25', '26-35', '36-45', '46-55', '55+'],
      type: 'checkbox'
    },
    {
      id: 'Audience by Type',
      label: 'Audience by Type',
      options: ['Students', 'Professionals', 'Families', 'Seniors'],
      type: 'checkbox'
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleFilterChange = (sectionId: string, option: string, type: 'radio' | 'checkbox' | 'range') => {
    setSelectedFilters(prev => {
      const currentSelection = prev[sectionId] || []
      
      if (type === 'radio') {
        return {
          ...prev,
          [sectionId]: [option]
        }
      } else if (type === 'checkbox') {
        const isSelected = currentSelection.includes(option)
        return {
          ...prev,
          [sectionId]: isSelected 
            ? currentSelection.filter(item => item !== option)
            : [...currentSelection, option]
        }
      } else {
        // Handle range type if needed in the future
        return prev
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
  }

  const getTotalAppliedFilters = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0)
  }

  const filteredCityOptions = filterOptions
    .find(option => option.id === 'City')
    ?.options.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    ) || []

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-1 ">
            <h3 className='text-lg font-satoshi font-medium'>Filters</h3>
        <span className="text-[#6B7280] font-satoshi text-sm lg:text-base font-medium">
          {getTotalAppliedFilters()} filters applied
        </span>
        </div>
        <button 
          onClick={clearAllFilters}
          className="text-brand text-base font-bold underline cursor-pointer"
        >
          Clear Filters
        </button>
      </div>

      {/* Filter Sections */}
      <div className="space-y-2.5 ">
        {filterOptions.map((section) => (
          <div key={section.id} className="bg-white rounded-lg border border-gray-200">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between gap lg:gap-6 xl:gap-10 items-center p-5 text-left"
            >
              <span className="font-satoshi font-medium text-sm lg:text-base">
                {section.label}
              </span>
              {expandedSection === section.id ? (
                <IoChevronUp className="w-6 h-6 text-black" />
              ) : (
                <IoChevronDown className="w-6 h-6 text-black" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedSection === section.id && (
              <div className="px-4 pb-4">
                {/* Selected City Chip */}
                {section.id === 'City' && selectedFilters['City'] && selectedFilters['City'].length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedFilters['City'].map((city) => (
                      <span
                        key={city}
                        className="flex items-center bg-white border border-[#F0682F] rounded-full p-1 pr-4 gap-1.5 "
                      > <button
                          type="button"
                          className="p-1.5 flex items-center justify-center rounded-full bg-[#FFEAE1] "
                          onClick={() =>
                            setSelectedFilters(prev => ({
                              ...prev,
                              City: prev.City.filter((c) => c !== city)
                            }))
                          }
                          aria-label={`Remove ${city}`}
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="x w-4 h-4 text-brand">
                            <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.415L11.414 10l4.95 4.95a1 1 0 01-1.414 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-sm font-satoshi font-medium">{city}</span>
                       
                      </span>
                    ))}
                  </div>
                )}
                {/* City Search Bar */}
                {section.id === 'City' && (
                  <div className="mb-4">
                    <div className="relative">
                      <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search City"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-[#6B7280] placeholder-[#6B7280] focus:outline-none "
                      />
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-0">
                  {(section.id === 'City' ? filteredCityOptions : section.options).map((option, index) => (
                    <div key={option}>
                      {index > 0 && <div className="border-t border-gray-200 my-2" />}
                      <label className="flex items-center py-2 cursor-pointer">
                        <input
                          type={section.type}
                          name={section.id}
                          checked={selectedFilters[section.id]?.includes(option) || false}
                          onChange={() => handleFilterChange(section.id, option, section.type)}
                          className={`mr-3 ${
                            section.type === 'radio' 
                              ? 'w-4 h-4 border-2 border-gray-300 rounded-full appearance-none checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200'
                              : 'w-4 h-4 border-2 border-gray-300 rounded appearance-none checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200'
                          }`}
                        />
                        <span className={`text-[#6B7280] text-sm  md:text-base font-medium font-satoshi`}>
                          {option}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filteroptions