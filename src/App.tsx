import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
// import DialogSection from './components/DialogSection'
// import MapSection from './components/MapSection'
import CountdownSection from './components/CountdownSection'

function App() {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-dvh">
      <div className="min-h-dvh">
        <Navbar />
        <div id="home" className='snap-start'>
          <HeroSection />
        </div>
        <div id="story" className='snap-start'>
          <StorySection />
        </div>
        {/* <div id="join" className='snap-start'>
          <DialogSection />
        </div>
        <div className="map">
        <div id="map" className='snap-start'>
          <MapSection />
        </div> */}
        <div id="crowdfunding" className='snap-start'>
          <CountdownSection />
        </div>
      </div>
    </div>
  )
}

export default App
