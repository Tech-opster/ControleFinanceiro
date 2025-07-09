import { useState } from "react";
import { IonInput } from "@ionic/react";
import {displayNameRegex} from "../../utils/displayNameRegex"

interface Props {
  value: string;
  onIonInput: (value: string) => void;
}

const DisplayNameValidation: React.FC<Props> = ({ value, onIonInput }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateName = (name: string) => {
      return name.trim().match(displayNameRegex);
  };

  const validate = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const onlyLetters = value.replace(/[^A-Za-zÀ-ÿ\s-]/g, "");

    onIonInput(onlyLetters);
  };

  const markTouched = () => {
    setIsTouched(true);

    if (value === "") {
      setIsValid(undefined);
      return;
    }

    setIsValid(validateName(value) !== null);
  };

  return (
    <IonInput
      className={`${isValid === false && "ion-invalid"} ${
        isTouched && "ion-touched"
      }`} // ${isValid && "ion-valid has-focus"} Para deixar com visual válido
      label="Nome"
      labelPlacement="floating"
      type="text"
      value={value}
      errorText="O nome deve conter pelo menos 3 caracteres."
      onIonInput={(e) => {
        validate(e);
        setIsValid(undefined);
      }}
      onIonBlur={() => markTouched()}
      onIonFocus={() => setIsTouched(false)}
    ></IonInput>
  );
};
export default DisplayNameValidation;
