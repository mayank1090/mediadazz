"use client";

import { LuUser } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { countryDialCodes } from '../data/countryDialCodes';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as Yup from 'yup';
import { usePlanCampaignMutation } from '@/store/campaignApi';
import { toast } from 'react-toastify';
import Loader from './Loader';

export default function Planyourcampaign() {
  const router = useRouter();
  const [planCampaign, { isLoading: isApiLoading }] = usePlanCampaignMutation();
  function getNumberLengthForDialCode(dialCode: string) {
  const found = countryDialCodes.find(c => c.dial_code === dialCode);
  return found ? { min: found.minLength, max: found.maxLength } : { min: 7, max: 15 };
}
  // State for showing/hiding the calendar
  const [showCalendar, setShowCalendar] = useState(false);
  // State for country code and phone number
  const [countryCode, setCountryCode] = useState(countryDialCodes[0].dial_code);
   const { min: phoneMin, max: phoneMax } = getNumberLengthForDialCode(countryCode);
  const [phoneNumber, setPhoneNumber] = useState('');

  const initialValues = {
    countrycode: '+971',
    mobile: '',
    fullname: '',
    companyname: '',
    email: '',
    campaign_title: '',
    campaign_objective: '',
    target_audience: '',
    campaign_start_duration: '',
    campaign_end_duration: '',
    campaign_media_type: '',
    preferred_locations: '',
    estimated_budget: '',
    special_requirements: '',
    agree: false,
  };

  const validationSchema = Yup.object().shape({
    countrycode: Yup.string().required(),
    mobile: Yup.string().matches(/^\d{7,15}$/, 'Enter a valid mobile number').required('Mobile is required'),
    fullname: Yup.string().required('Full name is required'),
    companyname: Yup.string().required('Company name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    campaign_title: Yup.string().required('Campaign title is required'),
    campaign_objective: Yup.string().required('Campaign objective is required'),
    target_audience: Yup.string().required('Target audience is required'),
    campaign_start_duration: Yup.string().required('Start date is required'),
    campaign_end_duration: Yup.string().required('End date is required'),
    campaign_media_type: Yup.string().required('Media type is required'),
    preferred_locations: Yup.string().required('Preferred locations are required'),
    estimated_budget: Yup.string().required('Estimated budget is required'),
    special_requirements: Yup.string(),
    agree: Yup.boolean().oneOf([true], 'You must agree to be contacted'),
  });

  return (
    <>
      <div className="py-[3.375rem] px-6 lg:p-24  xl:p-[7.75rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const fd = new FormData();
              fd.append('countrycode', values.countrycode);
              fd.append('mobile', values.mobile);
              fd.append('fullname', values.fullname);
              fd.append('companyname', values.companyname);
              fd.append('email', values.email);
              fd.append('campaign_title', values.campaign_title);
              fd.append('campaign_objective', values.campaign_objective);
              fd.append('target_audience', values.target_audience);
              fd.append('campaign_start_duration', values.campaign_start_duration);
              fd.append('campaign_end_duration', values.campaign_end_duration);
              fd.append('campaign_media_type', values.campaign_media_type);
              fd.append('preferred_locations', values.preferred_locations);
              fd.append('estimated_budget', values.estimated_budget);
              fd.append('special_requirements', values.special_requirements || '');

              const res = await planCampaign(fd).unwrap() as { status?: boolean; msg?: string };
              if (res?.status === true) {
                toast.success(res.msg || 'Campaign submitted successfully');
                resetForm();
              } else {
                toast.error(res?.msg || 'Failed to submit campaign');
              }
            } catch (err: unknown) {
              console.error('planCampaign error', err);
              const errorMessage = (err as { data?: { msg?: string } })?.data?.msg || 'Network error while submitting campaign';
              toast.error(errorMessage);
            } finally {
              setSubmitting(false);
            }
          }}
        >
            {({ values, errors, touched, isValid, isSubmitting: formSubmitting }) => (
            <Form>
        <div className="flex flex-col gap-3.5 text-center md:items-center ">
          <h3 className="font-satoshi font-bold text-xs md:text-sm text-brand">
            Campaign form
          </h3>
          <h2 className="font-satoshi font-bold text-4xl lg:text-4xl xl:text-5xl ">
            Plan your Campaign
          </h2>
          <p className="font-satoshi lg:text-lg md:text-base  font-medium text-xs text-[#6B7280] md:mt-2.5 ">
            Use the MediaDazz campaign brief form to get offers from multiple{" "}
            <span className="font-bold text-black">
              billboard companies, digital OOH providers, TV ad networks, radio
              stations, print publishers, influencer marketing agencies, and
              many more.
            </span>{" "}
            Submit your requirements in the form and get a proposal tailored to
            your{" "}
            <span className="font-bold text-black">
              budget, target audience, and campaign goals.
            </span>
          </p>
        </div>
              <div className="w-full max-w-4xl mx-auto mt-10 lg:mt-16 space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
            <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Mobile No.
                </label>
                <Field name="mobile">
                  {({ form }: { form: { setFieldValue: (field: string, value: string) => void } }) => (
                    <div className="flex border border-[#EEEEEE] rounded-[0.625rem]">
                      <select
                        value={countryCode}
                        onChange={e => {
                          setCountryCode(e.target.value);
                          form.setFieldValue('countrycode', e.target.value);
                        }}
                        className="flex-1 px-3 pr-0 md:pr-[1.125rem] md:px-[1.125rem] mr-[1.125rem] py-4 max-w-[25%] text-base md:text-lg focus:outline-none "
                      >
                        {countryDialCodes.map((c) => (
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
                        onChange={e => {
                          let digits = e.target.value.replace(/\D/g, '');
                          if (digits.length > phoneMax) digits = digits.slice(0, phoneMax);
                          setPhoneNumber(digits);
                          form.setFieldValue('mobile', digits);
                        }}
                        className="flex-2 px-[1.125rem] py-4 border-l border-[#EEEEEE]  focus:outline-none "
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="mobile">
                  {msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Full Name
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <LuUser className="h-6 w-6 mr-2" />
                  <Field
                    name="fullname"
                    type="text"
                    placeholder="Enter full name"
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="fullname">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Company Name
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <HiMiniUserGroup className="h-6 w-6 mr-2" />
                  <Field
                    name="companyname"
                    type="text"
                    placeholder="Enter Company name"
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="companyname">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Email Address
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <HiOutlineMail className="h-6 w-6 mr-2" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="email">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
            </div>
          </div>

          {/* Campaign Overview */}

          <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
            <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">
              Campaign Overview
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Campaign Title
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field
                    name="campaign_title"
                    type="text"
                    placeholder="e.g., “New Product Launch in Dubai, Q4 2025”"
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="campaign_title">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Campaign Objective
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field as="select" name="campaign_objective" className="w-full  placeholder-[#6B7280] outline-none font-satoshi">
                    <option value="">Select your Objective</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Product Launch">Product Launch</option>
                  </Field>
                </div>
                <ErrorMessage name="campaign_objective">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-medium font-satoshi mb-3">
                  Target Audience
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field
                    name="target_audience"
                    type="text"
                    placeholder="Demographics, customer segments, or industries you want to reach"
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="target_audience">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
            </div>
          </div>

          {/* Media Preferences 1 */}
          <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
            <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">
              Media Preferences
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Campaign Duration
                </label>
                <div className="flex flex-col px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field name="campaign_start_duration">
                    {({ field, form }: { field: { value: string }; form: { values: { campaign_end_duration?: string }; setFieldValue: (field: string, value: string) => void } }) => {
                      // Helper to format date as YYYY-MM-DD in local time
                      function formatLocalDate(date: Date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                      }
                      const startDate = field.value ? new Date(field.value) : null;
                      const endDate = form.values.campaign_end_duration ? new Date(form.values.campaign_end_duration) : null;
                      return (
                        <div className="relative">
                          <button
                            type="button"
                            className="w-full text-left placeholder-[#6B7280] outline-none font-satoshi bg-transparent border-none p-0 pr-10"
                            onClick={() => setShowCalendar(!showCalendar)}
                          >
                            {startDate && endDate
                              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                              : 'Select date range'}
                          </button>
                          <span className="absolute right-2 top-3 -translate-y-1/2 pointer-events-none text-gray-400">
                            <LuCalendar className="w-6 h-6" />
                          </span>
                          {showCalendar && (
                            <div className="z-50 mt-2">
                              <DateRange
                                ranges={[{
                                  startDate: startDate || new Date(),
                                  endDate: endDate || new Date(),
                                  key: 'selection',
                                }]}
                                onChange={(rangesByKey: RangeKeyDict) => {
                                  const selection = rangesByKey.selection;
                                  if (selection) {
                                    if (selection.startDate) {
                                      form.setFieldValue('campaign_start_duration', formatLocalDate(selection.startDate));
                                    }
                                    if (selection.endDate) {
                                      form.setFieldValue('campaign_end_duration', formatLocalDate(selection.endDate));
                                    }
                                  }
                                }}
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={true}
                              />
                              <button
                                type="button"
                                className="mt-2 px-4 py-2 bg-brand text-white rounded"
                                onClick={() => setShowCalendar(false)}
                              >
                                Done
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage name="campaign_start_duration">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
                  <ErrorMessage name="campaign_end_duration">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
                </div>
              </div>
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Preferred Media Types
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field as="select" name="campaign_media_type" className="w-full  placeholder-[#6B7280] outline-none font-satoshi">
                    <option value="">Select Media Types</option>
                    <option value="OOH">OOH</option>
                    <option value="TV">TV</option>
                    <option value="Radio">Radio</option>
                    <option value="Influencer">Influencer</option>
                  </Field>
                </div>
                <ErrorMessage name="campaign_media_type">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-medium font-satoshi mb-3">
                  Preferred Locations
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field
                    name="preferred_locations"
                    type="text"
                    placeholder="Cities, regions, or specific areas like Sheikh Zayed Road, Dubai Marina, Riyadh Corniche, etc."
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="preferred_locations">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
            </div>
          </div>

          {/* Media Preferences 2 */}
          <div className="bg-white rounded-[0.625rem] overflow-hidden border border-[#EEEEEE]">
            <h4 className="font-satoshi font-bold text-lg lg:text-xl text-black py-3.5 px-6 bg-[#FAFAFA]">
              Media Preferences
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 md:gap-5">
              <div>
                <label className="block text-base font-medium font-satoshi mb-3">
                  Estimated Budget Range
                </label>
                  <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field as="select" name="estimated_budget" className="w-full  placeholder-[#6B7280] outline-none font-satoshi">
                    <option value="">Select Budget Range</option>
                    <option value="<5k">Less than 5k</option>
                    <option value="5k-20k">5k - 20k</option>
                    <option value=">20k">Above 20k</option>
                  </Field>
                </div>
                <ErrorMessage name="estimated_budget">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-medium font-satoshi mb-3">
                  Special Requirements
                </label>
                <div className="flex items-center px-4 py-4 rounded-lg border border-[#EEEEEE]">
                  <Field
                    name="special_requirements"
                    type="text"
                    placeholder="Creative formats, event tie-ins, sponsorships, language preferences, etc."
                    className="w-full  placeholder-[#6B7280] outline-none font-satoshi"
                  />
                </div>
                <ErrorMessage name="special_requirements">{msg => <div className="text-red-500 text-xs mt-1 font-medium">{msg}</div>}</ErrorMessage>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <label className="flex items-center">
              <Field type="checkbox" name="agree" id="agree" className="w-5 h-5 accent-brand" />
              <span className="ml-4 text-base md:text-lg font-medium lg:text-xl font-satoshi">I agree to be contacted by MediaDazz for the purpose of receiving proposals for my campaign.</span>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isValid || !values.agree || formSubmitting || isApiLoading}
              className={`px-8 mx-auto w-full sm:w-fit py-5 mt-14 font-satoshi rounded-lg text-lg md:text-[1.375rem] font-bold text-white transition-all duration-300 ease-in-out transform ${(!isValid || !values.agree || formSubmitting || isApiLoading) ? 'bg-brand/60 cursor-not-allowed' : 'bg-brand hover:md:bg-gradient-to-r hover:md:from-orange-600 hover:md:to-orange-700 hover:md:shadow-lg hover:md:shadow-orange-500/25 hover:md:scale-[1.02]'}`}
            >
              {(formSubmitting || isApiLoading) ? <Loader /> : 'Submit My Campaign Brief'}
            </button>
          </div>
        </div>
              </Form>
            )}
        </Formik>
      </div>
    </>
  );
}
