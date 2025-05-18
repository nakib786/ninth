'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Mock consultant data from CICC register
const consultantData = {
  name: "Jane Smith",
  licenseId: "R123456",
  status: "Active",
  licenseExpiry: "December 31, 2026",
  languages: ["English", "French", "Spanish"],
  specializations: ["Express Entry", "Family Sponsorship", "Provincial Nominee Programs"],
  education: [
    "Immigration Consultant Diploma, XYZ College, 2018",
    "Bachelor of Laws, University of Toronto, 2015"
  ],
  address: "123 Immigration Street, Toronto, ON M5V 2H1",
  phone: "+1 (416) 555-1234",
  email: "jane.smith@immigration-consultant.ca"
};

export default function ConsultantProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 dark:bg-indigo-800 py-6 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{consultantData.name}</h1>
          <p className="text-indigo-100 mt-2">Licensed Immigration Consultant</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">License Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">License ID</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{consultantData.licenseId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {consultantData.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">License Expiry</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{consultantData.licenseExpiry}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Specializations</h2>
                <div className="flex flex-wrap gap-2">
                  {consultantData.specializations.map((specialization, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {consultantData.languages.map((language, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Education & Credentials</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {consultantData.education.map((education, index) => (
                    <li key={index}>{education}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Address:</span><br />
                    {consultantData.address}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span><br />
                    {consultantData.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span><br />
                    {consultantData.email}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Me</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md mb-4"
                  >
                    <p>Thank you for your message! I&apos;ll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 