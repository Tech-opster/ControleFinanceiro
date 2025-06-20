import { useState } from "react";
import { IonInput } from "@ionic/react";

interface Props {
  value: string;
  onIonInput: (value: string) => void;
}

const EmailValidation: React.FC<Props> = ({ value, onIonInput }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    onIonInput(value);
  };

  const markTouched = () => {
    setIsTouched(true);

    if (value === "") {
      setIsValid(undefined);
      return;
    }

    setIsValid(validateEmail(value) !== null);
  };

  return (
    <IonInput
      className={`${isValid === false && "ion-invalid"} ${
        isTouched && "ion-touched"
      }`} // ${isValid && "ion-valid has-focus"} Para deixar com visual válido
      label="Email"
      labelPlacement="floating"
      type="email"
      value={value}
      errorText="Insira um email válido"
      onIonInput={(e) => {
        validate(e);
        setIsValid(undefined);
      }}
      onIonBlur={() => markTouched()}
      onIonFocus={() => setIsTouched(false)}
    ></IonInput>
  );
};
export default EmailValidation;
