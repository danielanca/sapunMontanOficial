export const getCookie = (name: string) => {
  let parts;
  let value = `; ${document.cookie}`;
  parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  else return null;
};

export const setCookie = (cname: string, cvalue: string) => {
  document.cookie = cname + "=" + cvalue + ";path=/";
};
export const setCookieWithPeriod = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
