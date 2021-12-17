export const validName = (value) => (value.length <= 30 || value.length > 0);
export const validPrice = (value) => (!/^[0-9]{0,5}$/.test(value));
export const validUrl = (value) => (/^[\w\.\:\/\=\?]*$/.test(value) || value.length <= 30);
export const validLeft = (value) => (/^[0-9]*$/.test(value) || value.length <= 4);