'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiUser, FiMail, FiBriefcase, FiChevronDown } from 'react-icons/fi';
import Dummyuser from '../../../public/Dummyuser.png';
import Listingcarousel from '@/components/listingcarousel';
import OrdersTable from '@/components/OrdersTable';

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState('personal-details');
	const [formData, setFormData] = useState({
		mobile: '670 567 332',
		companyName: 'OneClickDrive',
		personalEmail: 'Vinay@oneclickdrive.com',
		fullName: 'Vinay Pagarani',
		designation: 'CEO',
		businessEmail: 'Vinay@oneclickdrive.com'
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleUpdateProfile = () => {
		// Handle profile update logic here
		console.log('Updating profile:', formData);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<div className="mt-[5.5rem] lg:mt-28  p-6 lg:py-8   md:py-7 lg:px-24 xl:px-[7.75rem]">
				{/* Header Section */}
				<div className="mb-8">
					<div className="flex gap-[1.125rem] lg:gap-6 mb-6">
						<Link href="/" className="flex items-center justify-center h-fit p-2.5 border border-[#EEEEEE] rounded-[0.625rem] transition-colors">
							<FiArrowLeft className="h-4 w-4 lg:w-6 lg:h-6" />
						</Link>
						<div>
							<h1 className="text-lg lg:text-2xl font-bold font-satoshi ">Vinay Pagarani</h1>
							<p className="text-[#6B7280] text-sm lg:text-xl font-medium mt-1.5">CEO @Oneclickdrive</p>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex gap-3.5">
						<button
							onClick={() => setActiveTab('wishlist')}
							className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'wishlist' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Wishlist
						</button>
						<button
							onClick={() => setActiveTab('personal-details')}
                            className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'personal-details' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Personal Details
						</button>
						<button
							onClick={() => setActiveTab('orders')}
                            className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'orders' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Orders
						</button>
					</div>
				</div>
                </div>
          <div className={`flex-1 relative p-6 lg:py-12 bg-white md:bg-[#FAFAFA] flex flex-col ${activeTab==="wishlist"?"pt-0":""} justify-between md:py-7 lg:px-24 xl:px-[7.75rem]`}>
				{/* Main Content */}
                <div className="">
				{activeTab === 'personal-details' && (
					<div className="">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24 md:pb-0 md:gap-5 max-h-[440px] overflow-y-auto  md:max-h-full">
							{/* Left Column */}
								{/* Mobile Number */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Mobile No.
									</label>
									<div className="flex gap-2">
										<div className="relative">
											<select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
												<option value="+971">+971</option>
												<option value="+1">+1</option>
												<option value="+91">+91</option>
											</select>
											<FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
										</div>
										<input
											type="text"
											value={formData.mobile}
											onChange={(e) => handleInputChange('mobile', e.target.value)}
											className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
									</div>
								</div>

								{/* Company Name */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Company Name
									</label>
									<div className="relative">
										<FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="text"
											value={formData.companyName}
											onChange={(e) => handleInputChange('companyName', e.target.value)}
											className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
									</div>
								</div>

								{/* Personal Email */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Personal Email Address
									</label>
									<div className="relative">
										<FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="email"
											value={formData.personalEmail}
											onChange={(e) => handleInputChange('personalEmail', e.target.value)}
											className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
									</div>
								</div>

							{/* Right Column */}
							
								{/* Full Name */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Full Name
									</label>
									<div className="relative">
										<FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="text"
											value={formData.fullName}
											onChange={(e) => handleInputChange('fullName', e.target.value)}
											className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
									</div>
								</div>

								{/* Designation */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Designation
									</label>
									<div className="relative">
										<FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="text"
											value={formData.designation}
											onChange={(e) => handleInputChange('designation', e.target.value)}
											className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
										<FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
									</div>
								</div>

								{/* Business Email */}
								<div>
									<label className="block text-base font-medium  mb-3">
										Business Email Address
									</label>
									<div className="relative">
										<FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
										<input
											type="email"
											value={formData.businessEmail}
											onChange={(e) => handleInputChange('businessEmail', e.target.value)}
											className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
										/>
									</div>
								</div>
						</div>
					</div>
				)}

				{/* Wishlist Tab Content */}
				{activeTab === 'wishlist' && (
					<div className="">
						{/* <div className="py-12">
							<FiUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
							<p className="text-gray-600">Start adding items to your wishlist to see them here.</p>
						</div> */}
                        <Listingcarousel/>
					</div>
				)}

				{/* Orders Tab Content */}
				{activeTab === 'orders' && (
					// <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
					// 	<div className="py-12">
					// 		<FiBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					// 		<h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
					// 		<p className="text-gray-600">Your order history will appear here once you make your first purchase.</p>
					// 	</div>
					// </div>
					<OrdersTable />
				)}

                </div>

				{/* Update Profile Button */}
				{activeTab === 'personal-details' && (
					<div className="absolute bottom-0 w-[calc(100%-48px)] md:w-full mb-7 md:mb-0 md:relative md:mt-8">
						<button
							onClick={handleUpdateProfile}
							className=" text-white py-5 w-full rounded-xl bg-brand  focus:outline-none text-lg font-satoshi font-bold"
						>
							Update Profile
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
