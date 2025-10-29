/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
        success: 'var(--success-500)',
        warning: 'var(--warning-500)',
        error: 'var(--error-500)',
        
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-inverse': 'var(--text-inverse)',
        
        'border-light': 'var(--border-light)',
        'border-medium': 'var(--border-medium)',
        'border-strong': 'var(--border-strong)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: '9999px',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)',
      }
    }
  },
  plugins: [],
}
