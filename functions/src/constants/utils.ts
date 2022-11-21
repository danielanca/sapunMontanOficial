export const getTimestamp = () => {
  let now = new Date();
  return `${now.getDay()}/${now.getMonth()}/${now.getFullYear()}  ${now.getHours()}:${now.getMinutes()} `;
};
export const generateInvoiceID = () => {
  return Math.ceil(Math.random() * 15044332);
};
