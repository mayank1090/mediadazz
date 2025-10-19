"use client";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";

export default function Calendar({
  selectedDates,
  onChange,
  onApplyAll, // <-- Add this prop for parent to handle "Apply to all"
}: {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  onApplyAll?: (dates: Date[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<[Date | null, Date | null]>([
    selectedDates[0] || null,
    selectedDates[1] || null,
  ]);
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // --- ADD THIS EFFECT ---
  useEffect(() => {
    setRange([
      selectedDates[0] || null,
      selectedDates[1] || null,
    ]);
  }, [selectedDates]);
  // -----------------------

  // Accept handler
  const handleAccept = () => {
    if (range[0] && range[1]) {
      setShowModal(true); // Show modal instead of applying directly
    }
  };

  // Reset handler
  const handleReset = () => {
    setRange([null, null]);
    onChange([]);
  };

  // Modal actions
  const handleApplyThis = () => {
    if (range[0] && range[1]) {
      onChange([range[0], range[1]]);
      setShowModal(false);
      setOpen(false);
    }
  };
  const handleApplyAll = () => {
    if (range[0] && range[1] && onApplyAll) {
      onApplyAll([range[0], range[1]]);
      setShowModal(false);
      setOpen(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        setShowModal(false);
      }
    }
    if (open || showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, showModal]);

  // Format selected range for input display
  const formatRange = () => {
    if (range[0] && range[1]) {
      return `${range[0].toLocaleDateString()} - ${range[1].toLocaleDateString()}`;
    }
    return "";
  };

  return (
    <div className="relative w-full max-w-full md:max-w-max  lg:max-w-36 xl:max-w-44" ref={wrapperRef}>
      <div className="relative max-w-full md:max-w-max  lg:max-w-36 xl:max-w-44">
        <input
          readOnly
          value={formatRange()}
          placeholder="Select Dates"
          className="border border-[#EEEEEE] max-w-full md:max-w-max   lg:max-w-36 xl:max-w-44  rounded-lg outline-none px-4 py-2 text-sm placeholder:text-[#6B7280] placeholder:font-satoshi placeholder:text-sm placeholder:font-medium font-satoshi w-full cursor-pointer bg-white pl-10"
          onClick={() => setOpen((prev) => !prev)}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none">
          <SlCalender />
        </span>
      </div>
      {open && (
        <div className="mt-2 bg-white absolute rounded-xl shadow-xl border border-gray-200 p-4 z-50 max-w-full md:max-w-max  ">
          <DatePicker
            inline
            selectsRange
            startDate={range[0]}
            endDate={range[1]}
            onChange={(update: [Date | null, Date | null]) => setRange(update)}
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="flex justify-between items-center px-2 py-2 bg-white border-b border-gray-200">
                <button onClick={decreaseMonth} className="text-brand text-lg px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
                <span className="font-satoshi font-medium text-base">
                  {monthDate.toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <button onClick={increaseMonth} className="text-brand text-lg px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
              </div>
            )}
            dayClassName={date => {
              if (range[0] && range[1]) {
                const time = date.getTime();
                const start = range[0].setHours(0,0,0,0);
                const end = range[1].setHours(0,0,0,0);
                if (time === start) return "bg-brand text-white rounded-l-lg";
                if (time === end) return "bg-brand text-white rounded-r-lg";
                if (time > start && time < end) return "bg-[#FFE5D0] text-brand";
              }
              if (
                (range[0] && date.getTime() === range[0].setHours(0,0,0,0)) ||
                (range[1] && date.getTime() === range[1].setHours(0,0,0,0))
              ) {
                return "bg-brand text-white rounded-lg";
              }
              return "hover:bg-[#FFF7F0]";
            }}
            calendarClassName="!z-50 overflow-hidden custom-calendar"
          />
          <div className="flex justify-between gap-2 mt-4">
            <button
              className="flex-1 py-2 rounded-lg border border-brand text-brand font-satoshi font-medium bg-white hover:bg-[#FFF7F0] transition"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
            <button
              className={`flex-1 py-2 rounded-lg bg-brand text-white font-satoshi font-medium ml-2 transition ${!(range[0] && range[1]) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleAccept}
              type="button"
              disabled={!(range[0] && range[1])}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Modal for apply to all */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="relative bg-white rounded-2xl p-9 w-[92vw] max-w-md modal-shadow">
            {/* close button */}
            <button
              aria-label="Close"
              onClick={() => { setShowModal(false); }}
              className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex flex-col items-center text-center pt-6 pb-4 px-2">
              {/* circular question mark */}
              <div className="h-[100px] w-[100px] rounded-full bg-[#F3F3F3] flex items-center justify-center mb-9">
                <span className="text-6xl font-medium text-[#F97316]">?</span>
              </div>

              <p className="font-satoshi text-base font-medium text-[#6B7280] mb-6 px-4">
                Apply same dates to all the media in cart?
              </p>

              <div className="flex gap-4 w-full px-4">
                <button
                  onClick={handleApplyThis}
                  className="flex-1 py-2.5 rounded-lg bg-white border border-[#E6E7EA] text-[#374151] font-satoshi text-sm font-medium hover:bg-[#F8F9FB] transition"
                >
                  No
                </button>
                <button
                  onClick={handleApplyAll}
                  className="flex-1 py-2.5 rounded-lg bg-brand text-white font-satoshi font-medium  text-sm hover:brightness-95 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles */}
      <style jsx global>{`
        .custom-calendar {
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          font-family: inherit;
        }
          .react-datepicker__header{
          background-color: white;
          border-bottom: none;

          }
        .custom-calendar .react-datepicker__day ,.react-datepicker__day-name{
          width: 2.2rem;
          height: 2.2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0.1rem;
          font-size: 1rem;
          font-family: inherit;
        }
        .custom-calendar .react-datepicker__day--selected,
        .custom-calendar .bg-brand {
          background: #F97316 !important;
          color: #fff !important;
        }
        .custom-calendar .bg-[#FFE5D0] {
          background: #FFE5D0 !important;
          color: #F97316 !important;
        }
        .custom-calendar .react-datepicker__day--in-range {
          background: #FFE5D0 !important;
          color: #F97316 !important;
        }
        .custom-calendar .react-datepicker__day--keyboard-selected {
          background: #F97316 !important;
          color: #fff !important;
        }
        @media (max-width: 600px) {
          .custom-calendar {
          max-width: 100% !important;
          overflow-x: auto;
            font-size: 0.95rem;
          }
          .custom-calendar .react-datepicker__day {
            width: 2rem;
            height: 2rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}