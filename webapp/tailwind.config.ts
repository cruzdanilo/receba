import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  plugins: [typography, daisyui],
  content: ['**/*.tsx'],
} satisfies Config;
