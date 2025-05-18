'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Consultant data
const teamMember = {
  name: "Keerti Kumar",
  title: "Licensed Immigration Consultant",
  licenseId: "33378",
  licenseExpiry: "October 31, 2024",
  languages: ["English", "Hindi", "Punjabi"],
  specializations: ["Express Entry", "Family Sponsorship", "Study Permits", "Work Permits"],
  bio: "Keerti Kumar is a licensed immigration consultant with extensive experience helping clients navigate the Canadian immigration system. With a background in networking and information technology, Keerti brings a detail-oriented and methodical approach to immigration cases.",
  linkedin: "https://www.linkedin.com/in/keerti-kumar-bbb792181/"
};

// Company information
const companyInfo = {
  name: "THE NINTH HOUSE IMMIGRATION SOLUTIONS INC",
  mission: "To provide expert guidance and support to individuals and families seeking to immigrate to Canada through ethical, transparent, and personalized service.",
  values: [
    {
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethical conduct in all our dealings."
    },
    {
      title: "Excellence",
      description: "We strive for excellence in all aspects of our service, ensuring thorough and accurate guidance."
    },
    {
      title: "Client-Centered",
      description: "We put our clients' needs and goals at the center of everything we do."
    },
    {
      title: "Knowledge",
      description: "We maintain up-to-date knowledge of immigration laws and regulations to provide the best advice."
    }
  ],
  address: "9-6400 Millcreek Drive, Mississauga, ON L5N 2X3",
  phone: "+1 (437) 989-2100",
  email: "info@skyviewimmigration.com"
};

export default function AboutUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageError, setImageError] = useState(false);
  
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
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-16 shadow-[0_10px_50px_-12px_rgba(79,70,229,0.25)]">
        {/* Background with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-900"
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: 1,
            background: [
              "linear-gradient(to bottom right, rgb(30, 64, 175), rgb(67, 56, 202), rgb(109, 40, 217))",
              "linear-gradient(to bottom right, rgb(37, 99, 235), rgb(79, 70, 229), rgb(126, 34, 206))",
              "linear-gradient(to bottom right, rgb(30, 64, 175), rgb(67, 56, 202), rgb(109, 40, 217))"
            ]
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            background: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
        
        {/* Maple leaf pattern overlay */}
        <div className="absolute inset-0 bg-[url('/maple-leaf.svg')] bg-repeat opacity-10 mix-blend-overlay"></div>
        
        {/* Canadian flag accent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32 opacity-10 z-0">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-white"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-white"></div>
          <div className="absolute left-1/4 top-0 bottom-0 right-1/4 flex items-center justify-center">
            <svg className="w-10 h-10 md:w-16 md:h-16 text-red-600" viewBox="0 0 512 512" fill="currentColor">
              <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
            </svg>
          </div>
        </div>
        
        {/* Accent shapes */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"
          animate={{
            opacity: [0.2, 0.25, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"
          animate={{
            opacity: [0.2, 0.15, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating maple leaf icon */}
        <motion.div
          className="absolute w-12 h-12 text-blue-100 opacity-30 top-1/4 right-1/3"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute w-8 h-8 text-blue-100 opacity-20 bottom-1/3 left-1/4"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/>
          </svg>
        </motion.div>
        
        <div className="relative z-10 px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Logo with animation */}
              <motion.div 
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm p-6 rounded-full shadow-2xl relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"></div>
                <div className="relative z-10">
                  <Image 
                    src="/ninth-house-logo.png"
                    alt="THE NINTH HOUSE IMMIGRATION SOLUTIONS INC"
                    width={200}
                    height={200}
                    className="h-auto"
                  />
                </div>
              </motion.div>
              
              {/* Content with animation */}
              <motion.div
                className="text-center md:text-left text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">The Ninth House</span>
                </h1>
                <p className="text-2xl md:text-3xl font-medium text-indigo-200 mt-2 mb-4">
                  IMMIGRATION SOLUTIONS INC
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 md:mx-0 mx-auto mb-6"></div>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed">
                  Helping individuals and families realize their Canadian dreams with expertise, integrity, and personalized guidance every step of the way.
                </p>
                
                {/* Call to action buttons */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-800 hover:bg-blue-50 font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Us
                  </a>
                  <a 
                    href="#team" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent text-white border border-white hover:bg-white/10 font-medium transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Meet Our Team
                  </a>
                </div>
                
                {/* RCIC badge */}
                <motion.div 
                  className="mt-8 bg-indigo-900/30 backdrop-blur-sm p-3 rounded-lg inline-block md:ml-0 mx-auto shadow-lg border border-indigo-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Image 
                    src="/images/RCIC-IRB_EN_HORZ_CLR_POS.png"
                    alt="Regulated Canadian Immigration Consultant"
                    width={180}
                    height={60}
                    className="h-auto"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-white dark:text-gray-900 -mb-1">
            <path fill="currentColor" fillOpacity="1" d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Our Mission */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {companyInfo.mission}
          </p>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Values</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyInfo.values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{value.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Our Team */}
      <section className="mb-16" id="team">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Meet Our Team</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 mx-auto">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                ) : (
                  <Image 
                    src="https://media.licdn.com/dms/image/v2/C5603AQG3vnegBXx00Q/profile-displayphoto-shrink_200_200/0/1577523934582?e=1753315200&v=beta&t=boNopbSh3vlNBVMTyWgvUuKVytPRXdrRAQbuBbg1hc0"
                    alt={teamMember.name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    onError={() => setImageError(true)}
                    unoptimized={true}
                  />
                )}
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{teamMember.name}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">{teamMember.title}</p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{teamMember.bio}</p>
              
              <div className="mb-4">
                <h4 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-medium mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {teamMember.specializations.map((specialization, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {teamMember.languages.map((language, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a 
                  href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=33378&b9100e1006f6=2#b9100e1006f6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify License
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Us */}
      <section className="mb-12" id="contact">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Have questions about our services or your immigration options? We&apos;re here to help. Reach out to us today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Get In Touch</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Address</h4>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone</h4>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</h4>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Office Hours</h4>
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md mb-4"
                >
                  <p>Thank you for your message! We&apos;ll get back to you as soon as possible.</p>
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
      </section>
      
      {/* Why Choose Us */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
              <svg className="h-7 w-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Licensed Professional</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We are licensed by the College of Immigration and Citizenship Consultants and follow strict professional guidelines.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
              <svg className="h-7 w-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Personalized Approach</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We create customized immigration strategies based on your unique situation and goals.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
              <svg className="h-7 w-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Transparent Process</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We keep you informed at every step and provide clear explanations of the immigration process.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
} 