export interface ReviewsInterface {
  reviewActual: string;
  date: string;
  name: string;
  starsNumber: string;
  email: string;
  reviewProductID: string;
}
export interface ReviewsProps {
  productIdentification: string;
  productData?: ReviewsInterface;
}
