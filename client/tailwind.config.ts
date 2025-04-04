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
  },
  plugins: [],
} satisfies Config
