"use client";

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiX, FiArrowLeft, FiUser, FiMail, FiBriefcase, FiUsers } from 'react-icons/fi';
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { toast } from 'react-toastify';
import NavLogo from '../../public/navLogo.svg';
import Loader from './Loader';
import { useUserLoginMutation, useVerifyOtpMutation, useUserRegisterMutation } from '@/store/authApi';
import { countryDialCodes } from '../data/countryDialCodes';

// Helper to get min/max for a dial code from countryDialCodes
function getNumberLengthForDialCode(dialCode: string) {
  const found = countryDialCodes.find(c => c.dial_code === dialCode);
  return found ? { min: found.minLength, max: found.maxLength } : { min: 7, max: 15 };
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  // Dynamic min/max for selected country
  const { min: phoneMin, max: phoneMax } = getNumberLengthForDialCode(countryCode);
  // Mobile validation: only numbers, correct length for country
  const isPhoneValid = new RegExp(`^\\d{${phoneMin},${phoneMax}}$`).test(phoneNumber);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState(false);

  // Reset modal state helper — ensures modal always starts from the phone step when opened
  const resetModalState = () => {
    setStep('phone');
    setPhoneNumber('');
    setCountryCode('+971');
    setOtp(['', '', '', '']);
    setIsVerifying(false);
    setOtpError(false);
  };

  // When the modal is opened, always reset internal state so it starts from the first step
  useEffect(() => {
    if (isOpen) {
      resetModalState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  
  // Profile form initial state for Formik
  const profileInitialValues = {
    fullName: '',
    companyName: '',
    designation: '',
    email: '',
  };

  const profileValidationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    companyName: Yup.string().required('Company Name is required'),
    designation: Yup.string().required('Designation is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const [sendOtp, { isLoading: isSendingOtp }] = useUserLoginMutation();
  const [verifyOtp, { isLoading: isVerifyingApi }] = useVerifyOtpMutation();
  const [registerUser, { isLoading: isRegistering }] = useUserRegisterMutation();

  const handleSendOTP = async () => {
    if (!isPhoneValid) {
      toast.error('Please enter a valid mobile number', { position: 'top-right' });
      return;
    }

    try {
      const fd = new FormData();
      fd.append('countrycode', countryCode);
      fd.append('mobile', phoneNumber);

      const res: any = await sendOtp(fd).unwrap();

      if (res?.status === 'success') {
        setStep('otp');
        toast.success(res.msg || 'OTP Sent Successfully!', { position: 'top-right' });
      } else {
        toast.error(res?.msg || 'Failed to send OTP', { position: 'top-right' });
      }
    } catch (err: any) {
      console.error('sendOtp error', err);
      toast.error(err?.data?.msg || 'Network error while sending OTP', { position: 'top-right' });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Clear error state when user starts typing
    if (otpError) {
      setOtpError(false);
    }
    
    // Handle pasting multiple digits
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('').slice(0, 4);
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 4) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty field or the last field
      const nextEmptyIndex = newOtp.findIndex((digit, i) => i > index && digit === '');
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(index + digits.length, 3);
      const nextInput = document.getElementById(`otp-${focusIndex}`);
      nextInput?.focus();
      
      // Auto-submit if all fields are filled
      if (newOtp.every(digit => digit !== '')) {
        console.log('Auto-submitting OTP:', newOtp);
        setTimeout(() => handleContinue(newOtp), 100);
      }
      return;
    }
    
    // Handle single digit input
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
      
      // Auto-submit if all fields are filled
      if (newOtp.every(digit => digit !== '')) {
        console.log('Auto-submitting OTP:', newOtp);
        setTimeout(() => handleContinue(newOtp), 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Clear error state when user pastes
    if (otpError) {
      setOtpError(false);
    }
    
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').split('').slice(0, 4);
    
    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 4) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty field or the last field
      const nextEmptyIndex = newOtp.findIndex((digit, i) => digit === '');
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 3;
      const nextInput = document.getElementById(`otp-${focusIndex}`);
      nextInput?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!isPhoneValid) {
      toast.error('Please enter a valid mobile number', { position: 'top-right' });
      return;
    }

    try {
      const fd = new FormData();
      fd.append('countrycode', countryCode);
      fd.append('mobile', phoneNumber);

      const res: any = await sendOtp(fd).unwrap();

      if (res?.status === 'success') {
        // Reset OTP fields when resending
        setOtp(['', '', '', '']);
        setOtpError(false);
        toast.success(res.msg || 'OTP Resent Successfully!', { position: 'top-right' });
      } else {
        toast.error(res?.msg || 'Failed to resend OTP', { position: 'top-right' });
      }
    } catch (err: any) {
      console.error('resendOtp error', err);
      toast.error(err?.data?.msg || 'Network error while resending OTP', { position: 'top-right' });
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '']);
    setOtpError(false);
    setIsVerifying(false);
  };

  // Formik submit handler for profile
  const handleProfileSubmit = async (values: typeof profileInitialValues) => {
    try {
      const fd = new FormData();
      fd.append('countrycode', countryCode);
      fd.append('mobile', phoneNumber);
      fd.append('name', values.fullName);
      fd.append('companyname', values.companyName);
      fd.append('designation', values.designation);
      fd.append('email', values.email);
      fd.append('token', localStorage.getItem('auth_token') || '');

      const res: any = await registerUser(fd).unwrap();

      if (res?.status === 'success') {
        localStorage.setItem('useractive', 'true');
        window.dispatchEvent(new CustomEvent('userLoginStatusChanged', { detail: { isLoggedIn: true } }));
        toast.success(res.msg || 'Profile Completed Successfully!', { position: 'top-right' });
        onClose();
      } else {
        toast.error(res?.msg || 'Registration failed', { position: 'top-right' });
      }
    } catch (err: any) {
      console.error('registerUser error', err);
      toast.error(err?.data?.msg || 'Network error while registering', { position: 'top-right' });
    }
  };

  // Removed unused handleProfileChange and setProfileData (not defined)

  const handleContinue = async (otpArray?: string[]) => {
    const currentOtp = otpArray || otp;
    if (!currentOtp.every(d => d !== '')) return;

    setIsVerifying(true);
    setOtpError(false);

    try {
      const fd = new FormData();
      fd.append('countrycode', countryCode);
      fd.append('mobile', phoneNumber);
      fd.append('otp', currentOtp.join(''));

      const res: any = await verifyOtp(fd).unwrap();

      setIsVerifying(false);

      if (res?.status === 'success') {
        // If API response indicates the user already exists, finalize login
        // and store token instead of navigating to profile completion.
        if (res.userdata?.status === true) {
          // store auth token
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
          }
          // mark user active and notify app
          localStorage.setItem('useractive', 'true');
          window.dispatchEvent(new CustomEvent('userLoginStatusChanged', { detail: { isLoggedIn: true } }));
          toast.success(res.msg || 'Logged in successfully!', { position: 'top-right' });
          onClose();
        } else {
          // New user: go to profile completion
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
          }
          setStep('profile');
          toast.success(res.msg || 'OTP Verified Successfully!', { position: 'top-right' });
        }
      } else {
        setOtpError(true);
        toast.error(res?.msg || 'Invalid OTP. Please try again.', { position: 'top-right' });
      }
    } catch (err: any) {
      setIsVerifying(false);
      setOtpError(true);
      console.error('verifyOtp error', err);
      toast.error(err?.data?.msg || 'Network error while verifying OTP', { position: 'top-right' });
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Only show on tablet/desktop */}
      <div className="hidden md:block fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      

      {/* Modal */}
      <div className="fixed inset-0 flex  h-screen items-center justify-center z-50 p-0 md:p-4">
        <div className={`bg-white w-full h-full md:max-h-fit my-4 flex flex-col px-6 py-9 md:p-0 md:block ${step==="phone" || step==="profile" ?"h-full":"md:h-fit"}  md:rounded-xl  md:shadow-lg ${step==="profile"?"md:max-w-3xl":"md:max-w-[30rem]"}`}>
          {/* Header */}
          {(step==="phone" || step==="otp") && (<div className='flex gap-5 items-center md:hidden mb-[2.625rem]'>
                  <button onClick={onClose} className='p-2 rounded-full bg-[#FAFAFA] border-[#EEEEEE] border'>
                    <FiArrowLeft className='w-6 h-6'/>
                    
                  </button>
                  <Image src={NavLogo} alt='NavLogo' className='max-h-6'/>
            </div>)}
          <div className="flex justify-between md:p-9 items-start md:pb-0 ">
            {(step === 'otp' || step === 'profile') && (
              <button
                onClick={step === 'otp' ? handleBackToPhone : () => setStep('otp')}
                className={`${step==="profile"?"hidden":""} ${step==="otp"?"hidden md:block":""} p-1 hover:bg-gray-100 rounded-full`}
              >
                <FiArrowLeft className="w-5 h-5 text-gray-600" />
                
              </button>
            )}

           

            <div className={` ${step==="otp" || step==="profile"?"md:max-w-[70%]":"md:max-w-[85%]"}`}>
            <h2 className={`text-2xl font-satoshi font-bold flex-1 ${step==="otp"?"md:text-center":""} `}>
              {step === 'phone' ? 'Get Started Now' : step === 'otp' ? 'Almost There!' : "Let's Complete your Profile"}
            </h2>
            {step==="phone"?<p className="font-satoshi font-medium pt-1.5 text-[#6B7280] text-base"> Enter your mobile number to log in or sign up in seconds.</p>:step==="otp"?<p className='font-medium md:text-center mt-1.5 text-base font-satoshi text-[#6B7280]'>Enter the 4 digit OTP sent via SMS to your number <span className='text-brand'> {countryCode}{phoneNumber}</span></p>:<p className='font-medium mt-1.5 text-base font-satoshi text-[#6B7280]'>To personalize your MediaDazz experience and connect you with right opportunities.</p>}
            </div>

            <button
              onClick={onClose}
              className={`p-1 hidden ${step==="profile"?"!block":""} md:block hover:bg-gray-100 rounded-full`}
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className=" md:p-9 pt-[2.625rem] flex-1 overflow-y-scroll md:max-h-[500px] no-scrollbar  flex flex-col gap-8 justify-between">
            {step === 'phone' ? (
              <>
                {/* Phone Step */}
                <div className="">

                <div className="mb-[1.125rem]">
                  <label className="block font-satoshi text-base font-medium mb-3">
                    Mobile No.
                  </label>
                  <div className="flex border border-[#EEEEEE] rounded-[0.625rem]">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="flex-1 px-3 pr-0 md:pr-[1.125rem] md:px-[1.125rem] mr-[1.125rem] py-4 max-w-[25%] text-base md:text-lg focus:outline-none "
                    >
                      {countryDialCodes.map((c) => (
                        // keep option text as dial code only so UI/design doesn't change
                        <option key={c.code} value={c.dial_code} title={c.name}>
                          {c.dial_code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter Mobile Number"
                      value={phoneNumber}
                      maxLength={phoneMax}
                      onChange={(e) => {
                        // sanitize input to digits only, and trim to max allowed
                        let digits = e.target.value.replace(/\D/g, '');
                        if (digits.length > phoneMax) digits = digits.slice(0, phoneMax);
                        setPhoneNumber(digits);
                      }}
                      className="flex-2 px-[1.125rem] py-4 border-l border-[#EEEEEE]  focus:outline-none "
                    />
                  </div>
                </div>
                  {/* Mobile validation error */}
                {!isPhoneValid && phoneNumber.length > 0 && (
                  <div className="text-red-500 text-xs mt-2 mb-2 font-medium">
                    Enter a valid mobile number
                  </div>
                )}

                <button
                  onClick={handleSendOTP}
                  className="w-full  text-white text-lg font-satoshi font-bold py-5 bg-brand rounded-xl  md:mb-[2.625rem]"
                  disabled={!isPhoneValid || isSendingOtp}
                  style={!isPhoneValid || isSendingOtp ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  {isSendingOtp ? <Loader/> : 'Send OTP'}
                </button>
                </div>
 
             <div className="">
                <div className="text-center gap-3.5 mb-6 flex items-center">
                  <span className="text-base font-medium font-satoshi shrink-0">Or Sign in with</span>
                  <div className="border-b border-[#EEEEEE] flex-1"></div>
                </div>

                <div className="flex gap-3 mb-[2.625rem]">
                  <button className="flex-1 flex items-center justify-center py-3.5 border border-[#EEEEEE] rounded-[0.625rem]">
                    <div className=" flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </button>
                  <button className="flex-1 flex items-center justify-center py-3.5 border border-[#EEEEEE] rounded-[0.625rem]">
                  <FaFacebook className='text-[#1877F2] w-6 h-6'/>
                  </button>
                  <button className="flex-1 flex items-center justify-center py-3.5 border border-[#EEEEEE] rounded-[0.625rem]">
                  <FaLinkedin className='text-[#1877F2] w-6 h-6'/>
                  </button>
                </div>

                 <p className="text-base font-medium text-[#6B7280] font-satoshi text-center">
                   By continuing, you agree to our{' '}
                  <span className='block'> <a href="#" className="text-black underline">Terms Of Service</a>
                   {' '}and{' '}
                   <a href="#" className=" text-black underline">Privacy Policy</a>
                   </span>
                 </p>
                 </div>
              </>
            ) : step === 'otp' ? (
              <>

                <div className="flex gap-2 justify-center md:mb-6 my-auto md:mt-0 ">
                  <div className={`rounded-[0.625rem] border ${otpError ? 'border-red-500 bg-[#FEE2E2]' : 'border-[#EEEEEE]'}`}>
                    <input
                      id="otp-0"
                      type="text"
                      maxLength={1}
                      value={otp[0]}
                      onChange={(e) => handleOtpChange(0, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(0, e)}
                      onPaste={handlePaste}
                      className={`w-[2.875rem] h-[3.875rem] text-center text-lg font-semibold focus:outline-none ${otpError ? 'text-red-500' : ''}`}
                    />
                    <input
                      id="otp-1"
                      type="text"
                      maxLength={1}
                      value={otp[1]}
                      onChange={(e) => handleOtpChange(1, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(1, e)}
                      className={`w-[2.875rem] h-[3.875rem] text-center text-lg font-semibold border-l ${otpError ? 'border-red-500  text-red-500' : 'border-[#EEEEEE]'} focus:outline-none`}
                    />
                  </div>
                  <GoDash className={`w-3.5 my-auto ${otpError ? 'text-red-500' : ''}`}/>
                  <div className={`rounded-[0.625rem] border ${otpError ? 'border-red-500 bg-[#FEE2E2]' : 'border-[#EEEEEE]'}`}>
                    <input
                      id="otp-2"
                      type="text"
                      maxLength={1}
                      value={otp[2]}
                      onChange={(e) => handleOtpChange(2, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(2, e)}
                      className={`w-[2.875rem] h-[3.875rem] text-center text-lg font-semibold focus:outline-none ${otpError ? 'text-red-500' : ''}`}
                    />
                    <input
                      id="otp-3"
                      type="text"
                      maxLength={1}
                      value={otp[3]}
                      onChange={(e) => handleOtpChange(3, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(3, e)}
                      className={`w-[2.875rem] h-[3.875rem] text-center text-lg font-semibold border-l ${otpError ? 'border-red-500 text-red-500' : 'border-[#EEEEEE]'} focus:outline-none`}
                    />
                  </div>
                </div>

                {/* Verifying Status */}
                {(isVerifying || isVerifyingApi) ? (
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Loader />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-base font-medium font-satoshi text-[#6B7280] mb-1">Haven't Received it yet?</p>
                    <button
                      onClick={handleResendOTP}
                      disabled={isSendingOtp}
                      className={`text-base font-medium font-satoshi underline ${isSendingOtp ? 'text-gray-400 cursor-not-allowed' : 'text-brand'}`}
                    >
                      {isSendingOtp ? 'Resending...' : 'Resend'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Profile Completion Step with Formik */}
                <Formik
                  initialValues={profileInitialValues}
                  validationSchema={profileValidationSchema}
                  onSubmit={handleProfileSubmit}
                  validateOnBlur
                  validateOnChange
                >
                  {({ touched, errors, isSubmitting, handleChange, handleBlur, values }) => (
                    <Form className="space-y-4">
                      {/* Mobile Number (Read-only) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-[1.125rem]">
                        <div>
                          <label className="block font-satoshi text-base font-medium mb-3">
                            Mobile No.
                          </label>
                          <div className="flex border border-[#EEEEEE] rounded-[0.625rem] ">
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
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block font-satoshi mb-3 text-base font-medium ">
                          Email Address
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                          <Field
                            type="email"
                            name="email"
                            placeholder="Enter your Email Address"
                            className="w-full pl-12 pr-4 py-4 border border-[#EEEEEE] rounded-[0.625rem] focus:outline-none focus:border-brand"
                          />
                        </div>
                        <ErrorMessage name="email">
                          {msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}
                        </ErrorMessage>
                      </div>

                      {/* Save Button */}
                      <button
                        type="submit"
                        className="w-full text-white text-lg font-satoshi font-bold py-5 bg-brand rounded-xl mt-3.5"
                        disabled={isRegistering || isSubmitting}
                      >
                        {isRegistering || isSubmitting ? <Loader /> : 'Save'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
