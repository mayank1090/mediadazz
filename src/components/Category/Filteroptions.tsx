'use client'

import React, { useState, useMemo } from 'react'
import { IoChevronDown, IoChevronUp, IoSearch } from 'react-icons/io5'
import { useGetFiltersQuery } from '@/store/categoryApi'

interface FilterOptionItem {
  display: string  // What to show in UI
  value: string    // What to send in API
}

interface FilterOption {
  id: string
  label: string
  options: FilterOptionItem[]
  type: 'radio' | 'checkbox' | 'range'
}

interface FilteroptionsProps {
  category_name?: string
  category_type?: string
  selectedFilters?: Record<string, string[]>
  onFiltersChange?: (filters: Record<string, string[]>) => void
}

const Filteroptions = ({ 
  category_name = 'outdoor-ooh-media', 
  category_type = 'category',
  selectedFilters: externalSelectedFilters,
  onFiltersChange
}: FilteroptionsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [internalSelectedFilters, setInternalSelectedFilters] = useState<Record<string, string[]>>({})
  const [localitySearch, setLocalitySearch] = useState('')
  
  // Use external filters if provided, otherwise use internal state
  const selectedFilters = externalSelectedFilters ?? internalSelectedFilters
  
  // Helper function to update filters
  const updateFilters = (updater: Record<string, string[]> | ((prev: Record<string, string[]>) => Record<string, string[]>)) => {
    if (onFiltersChange) {
      // Controlled mode - call parent's onChange
      const newFilters = typeof updater === 'function' ? updater(selectedFilters) : updater
      onFiltersChange(newFilters)
    } else {
      // Uncontrolled mode - update internal state
      if (typeof updater === 'function') {
        setInternalSelectedFilters(updater)
      } else {
        setInternalSelectedFilters(updater)
      }
    }
  }

  // Fetch filters from API
  const { data: filtersData, isLoading, error } = useGetFiltersQuery({
    category_name,
    category_type,
  })

  // Build filter options from API response dynamically
  const filterOptions: FilterOption[] = useMemo(() => {
    if (!filtersData) return []

    const options: FilterOption[] = []

    // Helper function to format label from key (e.g., "subcategory" -> "Sub-Category")
    const formatLabel = (key: string): string => {
      // Handle special cases
      if (key === 'subcategory') return 'Sub-Category'
      if (key === 'displaytype') return 'Display Type'
      if (key === 'maxprice' || key === 'minprice') return '' // Skip price filters for now
      
      // Capitalize first letter and add spaces before capitals
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
    }

    // Process each filter key in the API response
    Object.entries(filtersData).forEach(([key, value]) => {
      // Skip non-array fields
      if (!Array.isArray(value) || key === 'maxprice' || key === 'minprice') {
        return
      }

      if (value.length === 0) return

      let filterItems: FilterOptionItem[] = []

      // Special handling for subcategory
      if (key === 'subcategory') {
        filterItems = value
          .filter((item: any) => item.subcategories_status === 'Active')
          .map((item: any) => ({
            display: item.subcategories_name,
            value: item.subcategories_urlslug
          }))
      } else {
        // For all other filters, use name/value structure
        filterItems = value.map((item: any) => {
          // Check if item has name and value properties
          if (item.name && item.value) {
            return {
              display: item.name,
              value: item.value
            }
          }
          // Fallback for legacy structure (if any)
          return {
            display: item.name || item.value || String(item),
            value: item.value || item.name || String(item)
          }
        })
      }

      if (filterItems.length > 0) {
        options.push({
          id: formatLabel(key),
          label: formatLabel(key),
          options: filterItems,
          type: 'checkbox'
        })
      }
    })

    return options
  }, [filtersData])

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleFilterChange = (sectionId: string, option: string, type: 'radio' | 'checkbox' | 'range') => {
    updateFilters(prev => {
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
    const emptyFilters: Record<string, string[]> = {}
    updateFilters(emptyFilters)
  }

  const getTotalAppliedFilters = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0)
  }

  // Filter locality options based on search
  const filteredLocalityOptions = useMemo(() => {
    const localitySection = filterOptions.find(option => option.id === 'Locality')
    if (!localitySection) return []
    
    return localitySection.options.filter(item => 
      item.display.toLowerCase().includes(localitySearch.toLowerCase())
    )
  }, [filterOptions, localitySearch])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 font-satoshi">Loading filters...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-red-600 font-satoshi">Error loading filters. Please try again.</p>
      </div>
    )
  }

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
                {/* Selected Locality Chips */}
                {section.id === 'Locality' && selectedFilters['Locality'] && selectedFilters['Locality'].length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedFilters['Locality'].map((localityValue) => {
                      // Find the display name for this value
                      const localityItem = section.options.find(item => item.value === localityValue)
                      const displayName = localityItem?.display || localityValue
                      
                      return (
                        <span
                          key={localityValue}
                          className="flex items-center bg-white border border-[#F0682F] rounded-full p-1 pr-4 gap-1.5 "
                        >
                          <button
                            type="button"
                            className="p-1.5 flex items-center justify-center rounded-full bg-[#FFEAE1] "
                            onClick={() =>
                              updateFilters(prev => ({
                                ...prev,
                                Locality: prev.Locality?.filter((l) => l !== localityValue) || []
                              }))
                            }
                            aria-label={`Remove ${displayName}`}
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor" className="x w-4 h-4 text-brand">
                              <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.415L11.414 10l4.95 4.95a1 1 0 01-1.414 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="text-sm font-satoshi font-medium">{displayName}</span>
                        </span>
                      )
                    })}
                  </div>
                )}
                {/* Locality Search Bar */}
                {section.id === 'Locality' && (
                  <div className="mb-4">
                    <div className="relative">
                      <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search Locality"
                        value={localitySearch}
                        onChange={(e) => setLocalitySearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-[#6B7280] placeholder-[#6B7280] focus:outline-none "
                      />
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="space-y-0">
                  {(section.id === 'Locality' ? filteredLocalityOptions : section.options).map((optionItem, index) => (
                    <div key={optionItem.value}>
                      {index > 0 && <div className="border-t border-gray-200 my-2" />}
                      <label className="flex items-center py-2 cursor-pointer">
                        <input
                          type={section.type}
                          name={section.id}
                          checked={selectedFilters[section.id]?.includes(optionItem.value) || false}
                          onChange={() => handleFilterChange(section.id, optionItem.value, section.type)}
                          className={`mr-3 ${
                            section.type === 'radio' 
                              ? 'w-4 h-4 border-2 border-gray-300 rounded-full appearance-none checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200'
                              : 'w-4 h-4 border-2 border-gray-300 rounded appearance-none checked:bg-orange-500 checked:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200'
                          }`}
                        />
                        <span className={`text-[#6B7280] text-sm  md:text-base font-medium font-satoshi`}>
                          {optionItem.display}
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