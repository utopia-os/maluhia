import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import DialogSection from './components/DialogSection'
import MapSection from './components/MapSection'
import CountdownSection from './components/CountdownSection'

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-300 via-cyan-300 to-blue-900">
      <Navbar />
      <div id="home" className='py-8'>
        <HeroSection />
      </div>
      <div id="story" className='py-8 px-10 '>
        <StorySection />
      </div>
      <div id="join" className='py-8'>
        <DialogSection />
      </div>
      <div id="map" className='py-8 px-0 sm:px-24'>
        <MapSection />
      </div>
      <div id="crowdfunding" className='py-8 px-24 sm:px-8'>
        <CountdownSection />
      </div>
    </div>
  )
}

export default App
