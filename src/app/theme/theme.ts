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
    '--primary-link': '#000000',
    '--link': 'blue',
    '--card-border': '#f3f3f3',
    '--footer-text': '#010101',
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
    '--primary-link': '#ffffff',
    '--link': '#f47b20',
    '--card-border': '#8c8c8c',
    '--footer-text': '#f3f3f3',
  },
};
