export const splitDot = code => {
  const str1 = code.substr(0, 3);
  const str2 = code.substr(3, 7);
  return `${str1}.${str2}`;
};

export const limitadorString = (text, count) => {
  return text.slice(0, count) + (text.length > count ? '...' : '');
};

export const isValidEmail = (email = '') => {
  const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.includes('.com') || email.includes('.com.br')) {
    return validateEmailRegex.test(email);
  }

  return false;
};

export const shortName = name => {
  const arrayName = String(name).split(' ');
  if (arrayName.length > 1) {
    return `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
  }
  return arrayName[0];
};

export const currencyFormat = num => {
  return `R$${num
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

export const getNumber = text => {
  return String(text).replace(/[^\d]/g, '');
};
