import React from 'react';
import like_shape from "../assets/images/like_shape.svg";
import { Button, Heading, ScaleFade, Text } from '@chakra-ui/react';
import salic_bg from '../assets/images/salic-brand-shape_1.svg';

const SuccessFeedback = () => {
  const salicGateUrld = import.meta.env.VITE_PORTAL_GATE_URL;

  return (
    <div className='min-h-[100vh] flex justify-center items-center' style={{ backgroundImage: `url(${salic_bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: 'cover' }}>
      <ScaleFade in={true} transition={{ enter: { duration: 0.7 } }}>
        <div className='max-w-4xl mx-auto p-2 flex flex-col items-center'>
          <img src={like_shape} className='relative w-32 mx-auto mb-2' alt='' />
          
          <Heading as='h1' size='xl' className='text-cu_green text-center mb-1'>
            Thank you for your feedback!
          </Heading>
          <Text fontSize='xl' className='text-cu_green text-center'>
            Your feedback has been submitted successfully, we will consider it to improve our services, and we hope to see you again soon.
          </Text>
          {/* <Button
            className='mt-8 inline-flex' 
            colorScheme='whiteAlpha' 
            // close the window
            onClick={window.close}
          >
              Done
            </Button> */}
          <Button 
            as='a'
            href={salicGateUrld}
            target='_blank'
            className='mt-8' colorScheme="brandSuccess" variant="outline"
            leftIcon={<span className="material-symbols-outlined text-xl">arrow_outward</span>}>
            SALIC Gate
          </Button>
        </div>
      </ScaleFade>
    </div>
  )
}

export default SuccessFeedback