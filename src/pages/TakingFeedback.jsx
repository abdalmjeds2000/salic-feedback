import React from 'react';
import { Link as ChakraLink, Button, Heading, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, Collapse, Kbd, Tag, Tooltip, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo/Salic_bilingual_centered_logo.svg';
import salic_bg from '../assets/images/salic-brand-shape_1.svg';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { HappyFace, NeutralFace, SadFace, SmilingFace } from "../utils/faces-icons";
import SuccessFeedback from './SuccessFeedback';
import axios from 'axios';
import { apiUrl } from '../main';

const customStyles = {
  itemShapes: [SadFace, NeutralFace, SmilingFace, HappyFace],
  activeFillColor: ['#D33535', '#F7B801', '#339BD6', '#2A7C62'],
  inactiveFillColor: '#a8a8a8',
};


const TakingFeedback = ({ _KEY, onSubmit, RequestType, RequestId }) => {
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const CUSTOM_GROUP_LABEL_ID = 'group_label';
  const CUSTOM_ITEM_LABELS = ['Bad', 'Average', 'Good', 'Excellent'];
  const CUSTOM_ITEM_LABELS_IDS = ['label_1', 'label_2', 'label_3', 'label_4'];
  
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const payload = { key: _KEY, value: rating, comments: feedback?.trim() };
      const response = await axios.post(`${apiUrl}/feedback/send`, payload);
      if(onSubmit) onSubmit(response);
      setRating(0);
      setFeedback('');
      toast({
        title: "Your feedback has been submitted successfully.",
        status: "success",
        duration: 4000,
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.response?.data?.ExceptionMessage || "Something went wrong.",
        status: "error",
        duration: 4000,
        position: 'top-left',
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className='h-screen w-screen' style={{ backgroundImage: `url(${salic_bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: 'cover' }}>
      <div className='relative px-4 md:px-12 py-8 text-center flex flex-col items-center max-w-4xl h-full style-scroll overflow-auto mx-auto bg-white'>
        <div className='mb-10'>
          <Link to='/'>
            <img src={logo} className='max-w-[300px] mb-8 mx-auto' alt='' />
          </Link>
          <Heading as='h1' size='xl' className='text-dark_blue mb-2'>
            How was your experience?
          </Heading>
          <Text fontSize='xl' className='text-dark_blue'>
            Please help us create a great experience for you by taking just one minute to share your honest feedback on your experience.
          </Text>
        </div>

        <div className='border rounded-lg w-full mb-10'>
          <TableContainer className='!overflow-hidden'>
            <Table>
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th>Request</Th>
                  <Th isNumeric>Link</Th>
                </Tr>
              </Thead>
              <Tbody >
                <Tr>
                  <Td className='!border-none'>
                    <Tooltip label={`${RequestType}: #${RequestId}`} placement="top" hasArrow>
                      <Kbd>{RequestType}#{RequestId}</Kbd>
                    </Tooltip>
                  </Td>
                  <Td className='!border-none'>
                    <p className='whitespace-break-spaces'>
                      {/* <Kbd className='mb-1 inline-block'>#INC-0010</Kbd> <br /> */}
                      There was a potential cyber threat on SALIC systems through Nournet.
                    </p>
                  </Td>
                  <Td isNumeric className='!border-none'>
                    <ChakraLink href='https://google.com' isExternal className='!text-sky_blue'>
                      View
                    </ChakraLink>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <div className='mb-10 max-w-lg mx-auto'>
          <Rating
            value={rating}
            onChange={setRating}
            visibleLabelId={CUSTOM_GROUP_LABEL_ID}
            visibleItemLabelIds={CUSTOM_ITEM_LABELS_IDS}
            items={4}
            itemStyles={customStyles}
            highlightOnlySelected
            spaceBetween="medium"
            transition="zoom"
            className='rating-component'
            isDisabled={isLoading}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', justifyItems: 'center' }}>
            {CUSTOM_ITEM_LABELS.map((label, index) => (
              <span
                key={label}
                id={CUSTOM_ITEM_LABELS_IDS[index]}
                style={{ opacity: index + 1 === rating ? 1 : 0.35, padding: '0 5%' }}
                className='text-xs md:text-base lg:text-lg'
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Text as="label" htmlFor='feedback' className='mb-2 inline-block'>
            <span className={`text-cu_danger ${rating>2 ? "hidden" : ""}`}>*</span> What you like us to improve?
          </Text>
          <Textarea
            id='feedback'
            colorScheme='brandDarkBlue'
            className='text-center'
            rows={4} cols={40}
            placeholder='Write your feedback here...'
            value={feedback}
            size={{ base: 'sm', lg: 'md' }}
            disabled={isLoading}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className='mt-10'>
          {/* <Collapse in={rating > 3 || feedback.trim().length > 0} animateOpacity> */}
            <Button 
              colorScheme='brandDarkBlue' className="px-16 py-6" size='lg' 
              isLoading={isLoading}
              isDisabled={(rating < 3 && feedback.trim().length === 0) || rating===0}
              onClick={handleSubmit}>
              SUBMIT
            </Button>
          {/* </Collapse> */}
        </div>
      </div>
    </div>
  )
}


const Index = ({ _KEY }) => {
  const [stat, setStat] = React.useState({ data: {}, isLoading: true, isSubmitted: false, isError: false });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/feedback/get?key=${_KEY}`);
      const newStat = {
        data: response.data?.Data,
        isLoading: false,
        isSubmitted: response.data?.Data?.Rate !== null,
        isError: false,
      };
      setStat(newStat);
    } catch (error) {
      setStat(prev => ({ ...prev, isLoading: false, isError: true }));
    }
  };
  const handleAfterSubmit = () => {
    setStat(prev => ({ ...prev, isSubmitted: true }));
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (stat.isError) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='100vh'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Something went wrong
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Please check the URL and try again.
        </AlertDescription>
      </Alert>
    )
  }
  if (stat.isLoading) {
    return <>Loading...</>
  }
  if (stat.isSubmitted) {
    return <SuccessFeedback />
  } 

  return (
    <TakingFeedback 
      _KEY={_KEY}
      RequestType={stat.data?.RequestType}
      RequestId={stat.data?.ReferenceNumber}
      onSubmit={handleAfterSubmit} 
    />
  )
}

const Main = () => {
  const [state, setState] = React.useState({ loading: true, hasKey: false, key: '' });
  React.useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('key');
    if (key) {
      setState(prev => ({ ...prev, hasKey: true, key, loading: false }));
    }
    setState(prev => ({ ...prev, loading: false }));
  }, []);


  if (state.loading) {
    return <>Loading...</>
  }
  if (!state.hasKey) {
    return (
      <Alert
        status='warning'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='100vh'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Invalid URL
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Please check the URL and try again.
        </AlertDescription>
      </Alert>
    )
  }
  return (
    <Index _KEY={state.key} />
  )
}



export default Main