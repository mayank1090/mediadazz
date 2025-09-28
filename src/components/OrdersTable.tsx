import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const orders = [
  {
    id: 1,
    inquiryId: "JVF9380G5",
    duration: "3 - 6 Months",
    total: "0 AED",
    status: "Pending",
  },
  // Add more orders as needed
];

export default function OrdersTable() {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full border border-[#E0E0E0] rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#F8F8F8] text-[#6B7280] text-base font-satoshi font-medium">
              <th className="p-6 text-left border-r border-[#E0E0E0]">Sr. No.</th>
              <th className="p-6 text-left border-r border-[#E0E0E0]">Inquiry Id</th>
              <th className="p-6 text-left border-r border-[#E0E0E0]">Time Duration</th>
              <th className="p-6 text-left border-r border-[#E0E0E0]">Order Total</th>
              <th className="p-6 text-left border-r border-[#E0E0E0]">Status</th>
              <th className="p-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} className="border-t bg-white font-bold font-satoshi text-base border-[#E0E0E0] last:border-b-0">
                <td className="p-6 font-satoshi  border-r border-[#E0E0E0]">{idx + 1}</td>
                <td className="p-6 font-satoshi font-bold border-r border-[#E0E0E0]">{order.inquiryId}</td>
                <td className="p-6 font-satoshi font-bold border-r border-[#E0E0E0]">{order.duration}</td>
                <td className="p-6 font-satoshi font-bold border-r border-[#E0E0E0]">{order.total}</td>
                <td className="p-6 border-r border-[#E0E0E0]">
                  <span className="bg-[#F3F4F6]  rounded px-3 py-1 text-sm font-medium">{order.status}</span>
                </td>
                <td className="p-6">
                  <button className="text-brand font-bold text-base font-satoshi flex items-center gap-1">
                    View <MdOutlineKeyboardArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Table */}
      <div className="block md:hidden">
        {orders.map((order, idx) => (
          <div key={order.id} className="bg-white rounded-2xl mb-4 overflow-hidden border border-[#E0E0E0]">
            <div className="flex border-b border-[#E0E0E0]">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Sr. No.</span>
              <span className="font-satoshi flex-1 text-base font-bold p-6">{idx + 1}</span>
            </div>
             <div className="flex border-b border-[#E0E0E0]">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Inquiry Id</span>
              <span className="font-satoshi flex-1 text-base font-bold p-6">{order.inquiryId}</span>
            </div>
             <div className="flex border-b border-[#E0E0E0]">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Time Duration</span>
              <span className="font-satoshi flex-1 text-base font-bold p-6">{order.duration}</span>
            </div>
             <div className="flex border-b border-[#E0E0E0]">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Order Total</span>
              <span className="font-satoshi flex-1 text-base font-bold p-6">{order.total}</span>
            </div>
             <div className="flex border-b border-[#E0E0E0]">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Status</span>
              <span className="font-satoshi flex-1 text-base font-bold p-6">{order.status}</span>
            </div>
              <div className="flex ">
              <span className="text-[#6B7280] flex-1 text-base p-6 font-medium font-satoshi bg-[#F8F8F8] border-r border-[#E0E0E0]">Actions</span>
              <button className="text-brand flex-1 w-full p-6 font-medium flex items-center gap-1">
                View <MdOutlineKeyboardArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}