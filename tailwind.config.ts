import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'knewave': ['Knewave', 'cursive'],
        'sour-gummy': ['Sour Gummy', 'cursive']
      }
    }
  }
}
