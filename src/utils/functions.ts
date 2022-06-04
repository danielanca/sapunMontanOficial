export const getCookie = (name: string) => {
  var parts;
  const value = `; ${document.cookie}`;
  parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  else return "Nothing";
};
