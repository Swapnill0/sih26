/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base tone: cool paper background paired with an ink navy foreground.
        // Kept distinct from the generic "warm cream + terracotta" template look.
        ink: {
          DEFAULT: '#161F2B',
          soft: '#3A4655',
          faint: '#5B6B73',
        },
        paper: {
          DEFAULT: '#F1F3EF',
          raised: '#FFFFFF',
          sunken: '#E7EAE4',
        },
        line: {
          DEFAULT: '#D7DCD4',
          strong: '#B7BEB4',
        },
        // Primary accent — "growth": used for the skill-development / progress language.
        teal: {
          50: '#EAF3F0',
          100: '#CFE3DC',
          300: '#7FAFA0',
          500: '#1B6F63',
          600: '#175D53',
          700: '#124A42',
        },
        // Secondary accent — "opportunity": industry postings, internships, calls to action.
        gold: {
          50: '#FBF3E4',
          100: '#F3DFB2',
          300: '#E6BC6C',
          500: '#D89B3C',
          600: '#B87F2A',
        },
        // Tertiary — alerts, gaps, deadlines.
        rose: {
          50: '#F7E9E7',
          300: '#D79790',
          500: '#B8463D',
          600: '#9B372F',
        },
      },
      fontFamily: {
        // Serif carries academic gravity for display/headline moments.
        display: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        // Sans is the engineered, industry-facing workhorse for UI and data.
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // A deliberate type scale (roughly major-third), not Tailwind's defaults.
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.375rem', { lineHeight: '1.45' }],
        '2xl': ['1.75rem', { lineHeight: '1.3' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '4xl': ['2.9rem', { lineHeight: '1.12' }],
        '5xl': ['3.75rem', { lineHeight: '1.05' }],
      },
      borderRadius: {
        sm: '5px',
        DEFAULT: '9px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        // Used sparingly — most surfaces rely on hairline borders, not shadow.
        raised: '0 1px 2px rgba(22, 31, 43, 0.06), 0 8px 24px -12px rgba(22, 31, 43, 0.18)',
        overlay: '0 12px 40px -8px rgba(22, 31, 43, 0.35)',
      },
      maxWidth: {
        prose: '68ch',
      },
      backgroundImage: {
        'route-dashed': 'repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 12px)',
      },
    },
  },
  plugins: [],
}
