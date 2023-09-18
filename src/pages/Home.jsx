import React from 'react'
import { Button, Heading, Text } from '@chakra-ui/react';
import salic_bg from "../assets/images/salic-brand-shape_1.svg";

const Home = () => {
  const salicGateUrld = import.meta.env.VITE_PORTAL_GATE_URL;
  return (
    <div className='min-h-[100vh] flex justify-center items-center' style={{ backgroundImage: `url(${salic_bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: 'cover' }}>
      <div className="max-w-5xl sm:mx-auto p-2">
        <img
          src={"/src/assets/logo/Salic_centered_logo.svg"}
          className='w-[150px] mb-12 mx-auto'
          alt=''
        />
        <div className="flex flex-col mb-16 sm:text-center sm:mb-0 items-center">
          <div className="md:mx-auto text-center mb-12">
            <Heading as="h1" size="2xl" className="font-bold text-navy mb-4">
              The SALIC Feedback Site
            </Heading>
            <Text className="text-dark_blue text-2xl">
              This is a feedback site for SALIC, where you can share your feedback on your experience with SALIC.
            </Text>
          </div>

          <div>
            <Button 
              as="a" href={salicGateUrld} target="_blank"
              size={{ base: "sm", md: "lg" }}
              colorScheme="brandDarkBlue" leftIcon={<span className="material-symbols-outlined text-xl">arrow_outward</span>}>
              SALIC Gate
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home