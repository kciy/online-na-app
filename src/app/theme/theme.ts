export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--background-navbar': '#555555',
    '--background': '#fcfcfc',
    '--background-card': '#ffffff',
    '--background-footer': 'fcfcfc',

    '--primary-text': '#010101',
    '--primary-text-inverted': '#f3f3f3',
    '--primary-link': '#000000',
    '--link': 'blue',
    '--card-border': '#f3f3f3',
    '--footer-text': '#010101',

    '--title-text': '#2e3192',

    '--results-columns': '#add8e6',
    '--results-columns-text': '#010101',

    '--button-background': '#fcfcfc',
    '--button-background-hover': '#555555',
    '--button-border': '#555555',

    '--esn-pink': '#ff4aa9',
  },
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--background-navbar': '#555555',
    '--background': '#3b3b3b',
    '--background-card': '#555555',
    '--background-footer': '#3b3b3b',

    '--primary-text': '#f3f3f3',
    '--primary-text-inverted': '#010101',
    '--primary-link': '#ffffff',
    '--link': '#ff4aa9',
    '--card-border': '#8c8c8c',
    '--footer-text': '#f3f3f3',

    '--title-text': '#f3f3f3',

    '--results-columns': '#98daff',
    '--results-columns-text': '#010101',

    '--button-background': 'none',
    '--button-background-hover': '#eee',
    '--button-border': '#f3f3f3',

    '--esn-pink': '#ec008c',
  },
};
