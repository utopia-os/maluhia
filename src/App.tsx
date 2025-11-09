import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import DialogSection from './components/DialogSection'
import MapSection from './components/MapSection'
import CountdownSection from './components/CountdownSection'

function App() {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-dvh">
      <div className="min-h-dvh bg-linear-to-b from-orange-300 via-cyan-300 to-blue-900">
        <Navbar />
        <div id="home" className='py-8 snap-start'>
          <HeroSection />
        </div>
        <div id="story" className='snap-start'>
          <StorySection />
        </div>
        <div id="join" className='py-8 sm:p-16 snap-start'>
          <DialogSection />
        </div>
        <div id="map" className='sm:px-24 snap-start'>
          <MapSection />
        </div>
        <div id="crowdfunding" className='py-8 px-24 sm:px-8 snap-start'>
          <CountdownSection />
        </div>
      </div>
    </div>
  )
}

export default App
