/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-blue': '#2B3A55',      // 主色调 - 代表深度与智慧
        'earthy-taupe': '#6E6259', // 大地色 - 象征稳定与包容
        'soft-white': '#F8F5F0',   // 柔和白 - 营造纯净与平和
        'jade-green': '#7BAEA5',   // 翡翠绿 - 体现生命力与平衡
        'coral-pink': '#E7A5A0',   // 珊瑚粉 - 传达温暖与关怀
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'noto': ['Noto Sans', 'sans-serif'],
      },
      animation: {
        'lotus-bloom': 'lotus-bloom 2s ease-out forwards',
        'particle-float': 'particle-float 3s ease-in-out infinite',
        'water-ripple': 'water-ripple 1.5s ease-out infinite',
      },
      keyframes: {
        'lotus-bloom': {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scale(1.05) rotate(2deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(20px) translateX(-10px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0' },
        },
        'water-ripple': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
