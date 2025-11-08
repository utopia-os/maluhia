import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import DialogSection from './components/DialogSection'
import MapSection from './components/MapSection'
import CountdownSection from './components/CountdownSection'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 via-cyan-300 to-blue-900">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="story">
        <StorySection />
      </div>
      <div id="dialog">
        <DialogSection />
      </div>
      <div id="map">
        <MapSection />
      </div>
      <div id="crowdfunding">
        <CountdownSection />
      </div>
    </div>
  )
}

export default App
