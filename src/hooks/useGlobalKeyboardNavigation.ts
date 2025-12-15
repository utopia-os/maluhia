import { useEffect } from 'react'

interface NavigationCallbacks {
  story?: {
    currentSlide: number
    totalSlides: number
    goToSlide: (index: number) => void
    goToPrevious: () => void
    goToNext: () => void
  }
  dialog?: {
    currentStep: number
    totalSteps: number
    goToPrevious: () => void
    goToNext: () => void
    goToStep: (index: number) => void
  }
}

// Global state to track last visited positions
let lastStorySlide = 0

export function useGlobalKeyboardNavigation(callbacks: NavigationCallbacks) {
  useEffect(() => {
    // Update global state when callbacks change
    if (callbacks.story) {
      lastStorySlide = callbacks.story.currentSlide
    }
  }, [callbacks])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // For join section (dialog), allow left/right navigation even in textarea
      // But block up/down to allow normal textarea navigation
      const isInTextarea = e.target instanceof HTMLTextAreaElement
      const isInInput = e.target instanceof HTMLInputElement

      // Determine which section is currently in view first
      const sections = ['home', 'story', 'join', 'map', 'crowdfunding']
      let activeSection = 'home'
      let maxVisibility = 0

      sections.forEach(id => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const visibility = visibleHeight / viewportHeight

        if (visibility > maxVisibility) {
          maxVisibility = visibility
          activeSection = id
        }
      })

      // Block all keys in input fields
      if (isInInput) {
        return
      }

      // In textarea: allow left/right in join section, block everything else
      if (isInTextarea) {
        if (activeSection !== 'join') {
          return
        }
        // In join section textarea: only allow left/right, block up/down
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          return
        }
      }

      // Only proceed if a section is significantly visible
      if (maxVisibility < 0.5) return

      const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }

      const scrollToSlide = (slideIndex: number) => {
        const slideElement = document.getElementById(`slide${slideIndex + 1}`)
        if (slideElement) {
          slideElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
      }

      const goToStoryWithSlide = (slideIndex: number) => {
        scrollToSection('story')
        setTimeout(() => {
          if (callbacks.story) {
            scrollToSlide(slideIndex)
            callbacks.story.goToSlide(slideIndex)
          }
        }, 100)
      }

      const goToDialogWithStep = (stepIndex: number) => {
        scrollToSection('join')
        setTimeout(() => {
          if (callbacks.dialog && callbacks.dialog.goToStep) {
            callbacks.dialog.goToStep(stepIndex)
          }
        }, 100)
      }

      // Handle navigation based on active section and key
      switch (activeSection) {
        case 'home':
          if (e.key === 'ArrowRight') {
            // Linear navigation: go to first story slide
            e.preventDefault()
            goToStoryWithSlide(0)
          } else if (e.key === 'ArrowDown') {
            // Section jump: go to story at last visited slide
            e.preventDefault()
            goToStoryWithSlide(lastStorySlide)
          }
          break

        case 'story': {
          if (!callbacks.story) break
          const { goToPrevious, goToNext } = callbacks.story

          if (e.key === 'ArrowLeft') {
            // Linear navigation backwards
            e.preventDefault()
            // goToPrevious handles fullscreen exit when on first slide
            goToPrevious()
          } else if (e.key === 'ArrowRight') {
            // Linear navigation forwards
            e.preventDefault()
            // goToNext handles fullscreen exit when on last slide
            goToNext()
          } else if (e.key === 'ArrowUp') {
            // Section jump up
            e.preventDefault()
            if (document.fullscreenElement) {
              document.exitFullscreen()
            }
            scrollToSection('home')
          } else if (e.key === 'ArrowDown') {
            // Section jump down to last visited dialog step
            e.preventDefault()
            if (document.fullscreenElement) {
              document.exitFullscreen()
            }
            scrollToSection('join')
          }
          break
        }

        case 'join': {
          if (!callbacks.dialog) break
          const { currentStep, totalSteps, goToPrevious: dialogPrev, goToNext: dialogNext } = callbacks.dialog

          if (e.key === 'ArrowLeft') {
            // Linear navigation backwards
            e.preventDefault()
            if (currentStep === 0) {
              // Go to last slide of story
              goToStoryWithSlide(callbacks.story?.totalSlides ? callbacks.story.totalSlides - 1 : 0)
            } else {
              dialogPrev()
            }
          } else if (e.key === 'ArrowRight') {
            // Linear navigation forwards
            e.preventDefault()
            if (currentStep === totalSteps - 1) {
              scrollToSection('map')
            } else {
              dialogNext()
            }
          } else if (e.key === 'ArrowUp') {
            // Section jump up to last visited story slide
            e.preventDefault()
            goToStoryWithSlide(lastStorySlide)
          } else if (e.key === 'ArrowDown') {
            // Section jump down
            e.preventDefault()
            scrollToSection('map')
          }
          break
        }

        case 'map':
          if (e.key === 'ArrowLeft') {
            // Linear navigation backwards
            e.preventDefault()
            // Go to last dialog step
            goToDialogWithStep(callbacks.dialog?.totalSteps ? callbacks.dialog.totalSteps - 1 : 0)
          } else if (e.key === 'ArrowUp') {
            // Section jump up to last visited dialog step
            e.preventDefault()
            scrollToSection('join')
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            scrollToSection('crowdfunding')
          }
          break

        case 'crowdfunding':
          // Last section - only allow going back, not forward
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            scrollToSection('map')
          }
          // ArrowRight and ArrowDown do nothing (end of the journey)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callbacks])
}
