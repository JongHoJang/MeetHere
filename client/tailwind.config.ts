import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        //
        'main-d-black': '#333333',
        'main-t-black': '#333333',

        'sub-d-black': '#555555',
        'sub-t-black': '#555555',
      },
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.65rem', // 28px
      '4xl': '2rem', // 32px
    },
    width: {
      'web-main': '1140px', // 웹 메인컨텐츠 영역
    },
    maxWidth: {
      'web-main': '1140px',
    },
  },
  plugins: [],
} satisfies Config
