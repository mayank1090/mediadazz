'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowLeft, FiUser, FiMail, FiBriefcase, FiUsers } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import OrdersTable from '@/components/OrdersTable';
import Loader from '@/components/Loader';
import { useGetUserDetailsMutation, useUpdateUserDetailsMutation } from '@/store/authApi';
import { countryDialCodes } from '@/data/countryDialCodes';
import Wishlist from '@/components/Wishlist';

interface UserData {
	name: string | null;
	mobile: string | null;
	companyname: string | null;
	designation: string | null;
	email: string | null;
	createdate: string;
	mobileverified: string;
	isactive: string;
}

interface FormValues {
	fullName: string;
	companyName: string;
	designation: string;
	email: string;
}

export default function ProfilePageContent() {
	const pathname = usePathname();
	
	// Determine active tab from URL path
	const getActiveTabFromPath = (path: string) => {
		// Normalize path by removing trailing slashes
		const normalizedPath = path.replace(/\/$/, '');
		if (normalizedPath === '/profile/wishlist') return 'wishlist';
		if (normalizedPath === '/profile/orders') return 'orders';
		return 'personal-details';
	};

	const [activeTab, setActiveTab] = useState(() => getActiveTabFromPath(pathname));
	const [countryCode, setCountryCode] = useState('+971');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [originalValues, setOriginalValues] = useState<FormValues | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null);

	const [getUserDetails] = useGetUserDetailsMutation();
	const [updateUserDetails, { isLoading: isUpdating }] = useUpdateUserDetailsMutation();

	// Update active tab when pathname changes
	useEffect(() => {
		const tab = getActiveTabFromPath(pathname);
		setActiveTab(tab);
	}, [pathname]);

	// Parse mobile number from API response (format: "+91-9111823829")
	const parseMobileNumber = (mobile: string | null) => {
		if (!mobile) return { countryCode: '+971', phoneNumber: '' };
		
		// Check if mobile contains a dash (format: "+91-9111823829")
		if (mobile.includes('-')) {
			const [code, number] = mobile.split('-');
			return { countryCode: code || '+971', phoneNumber: number || '' };
		}
		
		// Try to extract country code from the beginning
		const dialCodes = countryDialCodes.map(c => c.dial_code).sort((a, b) => b.length - a.length);
		for (const dialCode of dialCodes) {
			if (mobile.startsWith(dialCode)) {
				return {
					countryCode: dialCode,
					phoneNumber: mobile.substring(dialCode.length).replace(/[-\s]/g, '')
				};
			}
		}
		
		return { countryCode: '+971', phoneNumber: mobile.replace(/[-\s+]/g, '') };
	};

	// Fetch user details when personal-details tab is active
	useEffect(() => {
		const fetchUserDetails = async () => {
			if (activeTab !== 'personal-details') return;

			const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
			if (!token) {
				toast.error('Please login to view your profile', { position: 'top-right' });
				return;
			}

			setIsLoading(true);
			try {
				const fd = new FormData();
				fd.append('token', token);

				const res = await getUserDetails(fd).unwrap() as { status?: string; data?: UserData; msg?: string };

				if (res?.status === 'success' && res?.data) {
					const data = res.data;
					setUserData(data);

					// Parse mobile number
					const { countryCode: code, phoneNumber: phone } = parseMobileNumber(data.mobile);
					setCountryCode(code);
					setPhoneNumber(phone);
					setEmail(data.email || '');

					// Set form values
					const formValues: FormValues = {
						fullName: data.name || '',
						companyName: data.companyname || '',
						designation: data.designation || '',
						email: data.email || '',
					};

					setOriginalValues(formValues);
				} else {
					toast.error(res?.msg || 'Failed to fetch user details', { position: 'top-right' });
				}
			} catch (err: unknown) {
				console.error('getUserDetails error', err);
				const errorMessage = (err as { data?: { msg?: string } })?.data?.msg || 'Network error while fetching user details';
				toast.error(errorMessage, { position: 'top-right' });
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserDetails();
	}, [activeTab, getUserDetails]);

	const validationSchema = Yup.object({
		fullName: Yup.string().required('Full Name is required'),
		companyName: Yup.string().required('Company Name is required'),
		designation: Yup.string().required('Designation is required'),
	});

	const initialValues: FormValues = originalValues || {
		fullName: '',
		companyName: '',
		designation: '',
		email: '',
	};

	// Check if form values have changed
	const hasChanges = (values: FormValues): boolean => {
		if (!originalValues) return false;
		return (
			values.fullName !== originalValues.fullName ||
			values.companyName !== originalValues.companyName ||
			values.designation !== originalValues.designation
		);
	};

	const handleSubmit = async (values: FormValues) => {
		const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
		if (!token) {
			toast.error('Please login to update your profile', { position: 'top-right' });
			return;
		}

		try {
			const fd = new FormData();
			fd.append('token', token);
			fd.append('user_name', values.fullName);
			fd.append('company_name', values.companyName);
			fd.append('designation', values.designation);

			const res = await updateUserDetails(fd).unwrap() as { status?: string; msg?: string; data?: UserData };

			if (res?.status === 'success') {
				toast.success(res?.msg || 'Profile updated successfully!', { position: 'top-right' });
				// Update original values to reflect the saved state
				setOriginalValues(values);
				// Update user data if response includes updated data
				if (res?.data) {
					setUserData(res.data);
				}
			} else {
				toast.error(res?.msg || 'Failed to update profile', { position: 'top-right' });
			}
		} catch (err: unknown) {
			console.error('updateUserDetails error', err);
			const errorMessage = (err as { data?: { msg?: string } })?.data?.msg || 'Network error while updating profile';
			toast.error(errorMessage, { position: 'top-right' });
		}
	};

	// Get user display name and designation for header
	const displayName = userData?.name || 'User';
	const displayDesignation = userData?.designation || '';
	const displayCompany = userData?.companyname || '';

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
							<h1 className="text-lg lg:text-2xl font-bold font-satoshi ">{displayName}</h1>
							<p className="text-[#6B7280] text-sm lg:text-xl font-medium mt-1.5">
								{displayDesignation && displayCompany 
									? `${displayDesignation} @${displayCompany}` 
									: displayDesignation || displayCompany || 'User'}
							</p>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex gap-3.5">
						<Link
							href="/profile/wishlist"
							className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'wishlist' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Wishlist
						</Link>
						<Link
							href="/profile"
							className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'personal-details' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Personal Details
						</Link>
						<Link
							href="/profile/orders"
							className={`px-[1.125rem] py-3 rounded-full border-[#EEEEEE] border font-medium text-sm lg:text-base font-satoshi transition-colors ${
								activeTab === 'orders' 
									? 'bg-brand border-0 !font-bold  text-white' 
									: 'bg-white text-black'
							}`}
						>
							Orders
						</Link>
					</div>
				</div>
                </div>
          <div className={`flex-1 relative p-6 lg:py-12 bg-white md:bg-[#FAFAFA] flex flex-col ${activeTab==="wishlist"?"pt-0":""} justify-between md:py-7 lg:px-24 xl:px-[7.75rem]`}>
				{/* Main Content */}
                <div className="">
				{activeTab === 'personal-details' && (
					<div className="">
						{isLoading ? (
							<div className="flex items-center justify-center py-12">
								<Loader />
							</div>
						) : (
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
								enableReinitialize
								validateOnBlur
								validateOnChange
							>
								{({ values, isSubmitting, touched, errors }) => {
									const hasFormChanges = hasChanges(values);
									return (
										<Form>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24 md:pb-0 md:gap-5 max-h-[440px] overflow-y-auto  md:max-h-full">
												{/* Mobile Number (Read-only) */}
												<div>
													<label className="block font-satoshi text-base font-medium mb-3">
														Mobile No.
													</label>
													<div className="flex border border-[#EEEEEE] rounded-[0.625rem]">
														<div className="flex-1 px-[1.125rem] mr-[1.125rem] py-4 max-w-[25%] text-gray-600">
															{countryCode}
														</div>
														<div className="flex-2 px-[1.125rem] py-4 border-l border-[#EEEEEE] text-gray-600">
															{phoneNumber}
														</div>
													</div>
												</div>

												{/* Full Name */}
												<div>
													<label className="block font-satoshi text-base font-medium mb-3">
														Full Name
													</label>
													<div className="relative">
														<FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
														<Field
															type="text"
															name="fullName"
															placeholder="Enter full name"
															className="w-full pl-12 pr-4 py-4 border border-[#EEEEEE] rounded-[0.625rem] focus:outline-none focus:border-brand"
														/>
													</div>
													<ErrorMessage name="fullName">
														{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}
													</ErrorMessage>
												</div>

												{/* Company Name */}
												<div>
													<label className="block font-satoshi text-base font-medium mb-3">
														Company Name
													</label>
													<div className="relative">
														<FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
														<Field
															type="text"
															name="companyName"
															placeholder="Enter Company name"
															className="w-full pl-12 pr-4 py-4 border border-[#EEEEEE] rounded-[0.625rem] focus:outline-none focus:border-brand"
														/>
													</div>
													<ErrorMessage name="companyName">
														{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}
													</ErrorMessage>
												</div>

												{/* Designation */}
												<div>
													<label className="block font-satoshi text-base font-medium mb-3">
														Designation
													</label>
													<div className="relative">
														<FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
														<Field
															as="select"
															name="designation"
															className="w-full pl-12 pr-10 py-4 border border-[#EEEEEE] text-[#6B7280] rounded-[0.625rem] focus:outline-none  focus:border-brand appearance-none bg-white"
														>
															<option className='text-[#6B7280]' value="">Enter your designation</option>
															<option value="CEO">CEO</option>
															<option value="CTO">CTO</option>
															<option value="Marketing Manager">Marketing Manager</option>
															<option value="Brand Manager">Brand Manager</option>
															<option value="Media Planner">Media Planner</option>
															<option value="Account Manager">Account Manager</option>
															<option value="Other">Other</option>
														</Field>
														<div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
															<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
															</svg>
														</div>
													</div>
													<ErrorMessage name="designation">
														{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}
													</ErrorMessage>
												</div>

												{/* Email Address (Read-only) */}
												<div>
													<label className="block font-satoshi mb-3 text-base font-medium ">
														Email Address
													</label>
													<div className="relative">
														<FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
														<div className="w-full pl-12 pr-4 py-4 border border-[#EEEEEE] rounded-[0.625rem] text-gray-600">
															{email || 'No email address'}
														</div>
													</div>
												</div>
											</div>

											{/* Update Profile Button */}
											<div className="absolute bottom-0 w-[calc(100%-48px)] md:w-full mb-7 md:mb-0 md:relative md:mt-8">
												<button
													type="submit"
													disabled={!hasFormChanges || isSubmitting || isUpdating}
													className={`text-white py-5 w-full rounded-xl focus:outline-none text-lg font-satoshi font-bold ${
														!hasFormChanges || isSubmitting || isUpdating
															? 'bg-gray-400 cursor-not-allowed'
															: 'bg-brand'
													}`}
												>
													{isSubmitting || isUpdating ? <Loader /> : 'Update Profile'}
												</button>
											</div>
										</Form>
									);
								}}
							</Formik>
						)}
					</div>
				)}

				{/* Wishlist Tab Content */}
				{activeTab === 'wishlist' && (
					<div className="">
						<Wishlist />
					</div>
				)}

				{/* Orders Tab Content */}
				{activeTab === 'orders' && (
					<OrdersTable />
				)}

                </div>
			</div>
		</div>
	);
}
