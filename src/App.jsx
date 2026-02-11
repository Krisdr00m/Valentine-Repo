import { useState, useCallback } from 'react'
import './App.css'
import HorizontalIntro from './components/HorizontalIntro'
import HeroSection from './components/HeroSection'
import LoveStorySection from './components/LoveStorySection'
import ParallaxQuote from './components/ParallaxQuote'
import PhotoSlideshow from './components/PhotoSlideshow'
import ReasonsSection from './components/ReasonsSection'
import PoemsSection from './components/PoemsSection'
import WishLanterns from './components/WishLanterns'
import LetterSection from './components/LetterSection'
import Footer from './components/Footer'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  return (
    <>
      {showIntro && <HorizontalIntro onComplete={handleIntroComplete} />}
      <main className={`main-content ${showIntro ? 'hidden' : 'visible'}`}>
        <HeroSection />
        <ParallaxQuote
          quote="In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          author="Maya Angelou"
        />
        <LoveStorySection />
        <ParallaxQuote
          quote="I have found the one whom my soul loves."
          author="Song of Solomon 3:4"
        />
        <PhotoSlideshow />
        <ReasonsSection />
        <PoemsSection />
        <WishLanterns />
        <LetterSection />
        <Footer />
      </main>
    </>
  )
}

export default App
