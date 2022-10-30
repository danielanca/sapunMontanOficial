export interface ErrorProps {
  paymentSelected: boolean;
  termsAccepted: boolean;
  inputCompleted: boolean;
}
export interface OrderProps {
  clearNotification?: React.Dispatch<React.SetStateAction<number>>;
}
export interface ExplicitProdListProps {
  id: string;
  name: string;
  itemNumber: string;
  imageProduct: string;
  price: string;
}

export interface PropertyInput {
  name: string;
  inputListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  labelText: string;
  mandatoryInput: boolean;
  inputOptions?: {
    autoComplete: string;
    list: string;
  };
  otherStructure?: {
    dataList?: {
      name: string;
      list: { [key: number]: string };
    };
  };
}

export interface InputProps {
  [key: string]: PropertyInput;
}
