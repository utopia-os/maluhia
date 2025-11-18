import type { DialogStep } from './types'

export const ANIMATION_DURATION = 400
export const INPUT_DELAY = 1500
export const FADE_DURATION = 1000

export const dialogSteps: DialogStep[] = [
  {
    question: "Aloha, Ich bin die Honu. Wie ist dein Name?",
    placeholder: "Dein Name...",
    inputType: 'single'
  },
  {
    question: (userName) => `Lieber ${userName}, Maluhia bedeutet in der hawaiianischen Kultur "Frieden" und "Harmonie". Meine Aufgabe ist es, Maluhia wieder in die Herzen der Menschen zu bringen.`,
    inputType: 'none'
  },
  {
    question: (userName) => `Frieden kommt aus den Herzen der Menschen. Was möchte uns dein Herz mitteilen, lieber ${userName}?`,
    placeholder: "Deine Friedensbotschaft an die Welt ...",
    inputType: 'multi'
  },
  {
    question: (userName) => `Danke, lieber ${userName}! Sag mir wo du gerade bist damit wir dein Licht auf die Karte setzen können.`,
    placeholder: "Deine Stadt, Region oder Adresse",
    inputType: 'single'
  },
  {
    question: () => `Deine Aufgabe ist es nun, die ganze Welt zu erleuchten – also teile die Vision von Maluhia mit deinen Liebsten. 💖`,
    inputType: 'none'
  }
]
