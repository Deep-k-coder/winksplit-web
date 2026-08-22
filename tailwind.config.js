/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wink: {
          ivory: {
            DEFAULT: '#FDFBF7',
            50: '#FFFFFF',
            100: '#FAF7F2',
            200: '#F4ECE1',
            300: '#EAE0D0',
            400: '#DECDB8',
          },
          kraft: {
            DEFAULT: '#C29B6C',
            light: '#E2CEB5',
            medium: '#B88B58',
            dark: '#8C6239',
            deep: '#54381C',
            gold: '#D4AF37',
          },
          green: {
            DEFAULT: '#133D2D',
            deep: '#0A241A',
            dark: '#0E2E22',
            emerald: '#1A533E',
            light: '#286E53',
            accent: '#388E6C',
            mint: '#E0F0E8',
            subtle: '#ECF6F1',
          },
          sand: {
            DEFAULT: '#E8DEC8',
            light: '#F5EFE4',
            dark: '#C8BAA0',
          },
          charcoal: {
            DEFAULT: '#1E2320',
            light: '#424844',
            muted: '#68706A',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'paper-sm': '0 2px 6px rgba(10, 36, 26, 0.04), 0 1px 3px rgba(140, 98, 57, 0.05)',
        'paper-md': '0 8px 20px rgba(10, 36, 26, 0.06), 0 2px 8px rgba(140, 98, 57, 0.07)',
        'paper-lg': '0 16px 36px rgba(10, 36, 26, 0.08), 0 4px 14px rgba(140, 98, 57, 0.08)',
        'paper-xl': '0 28px 56px -12px rgba(10, 36, 26, 0.12), 0 8px 28px rgba(140, 98, 57, 0.10)',
        'luxury-glow': '0 0 30px rgba(26, 83, 62, 0.25), 0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'kraft-gradient': 'linear-gradient(135deg, #E2CEB5 0%, #C29B6C 50%, #8C6239 100%)',
        'forest-gradient': 'linear-gradient(135deg, #133D2D 0%, #0A241A 100%)',
        'luxury-emerald': 'linear-gradient(135deg, #1A533E 0%, #0E2E22 50%, #0A241A 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #B88B58 0%, #D4AF37 50%, #B88B58 100%)',
      }
    },
  },
  plugins: [],
}
