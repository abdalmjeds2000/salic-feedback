import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TakingFeedback from './pages/TakingFeedback';
// import SuccessFeedback from './pages/SuccessFeedback';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function App() {

  const chakratheme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          borderRadius: '0.5rem',
        },
      }
    },
    colors: {
      brandDarkBlue: {
        100: "#CCD8EA",
        200: "#9BB2D4",
        300: "#6B8FBC",
        400: "#3C6DA3",
        500: "#0E4D89", // main
        600: "#0A3D7A",
        700: "#072F6A",
        800: "#05225A",
        900: "#031749",
      },
      brandLightBlue: {
        100: "#D3E7FA",
        200: "#A9D1F3",
        300: "#80BDEB",
        400: "#59ABE1",
        500: "#349AD5", // main
        600: "#2B80BD",
        700: "#2367A4",
        800: "#1B508A",
        900: "#143B70",
      },
      brandSuccess: {
        100: "#B2D3C2",
        200: "#90BEA8",
        300: "#6DA98F",
        400: "#4B9378",
        500: "#2A7C61", // main
        600: "#1F684F",
        700: "#15523D",
        800: "#0D3A2B",
        900: "#062118",
      },
      brandWarning: {
        100: "#FFD4A6",
        200: "#FFC77C",
        300: "#FFBE53",
        400: "#FFB929",
        500: "#FFB600", // main
        600: "#CF9700",
        700: "#9E7600",
        800: "#6E5300",
        900: "#3D2F00",
      },
    },
  })

  return (
    <ChakraProvider theme={chakratheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/take-feedback' exact element={<TakingFeedback />} />
          {/* <Route path='/success-take-feedback' exact element={<SuccessFeedback />} /> */}
          {/* <Route path='/' exact element={<TakingFeedback />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
