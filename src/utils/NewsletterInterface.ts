export interface NewsProps {
  firstName: string;
  lastName: string;
  email: string;
}
export interface responseProps {
  subscribeToNewsletter: "SUBSCRIBED" | "INITSTATE" | "ERROR";
}

export interface EventInsert {
  [key: string]: string;
}
