import { useState, useEffect, useCallback } from 'react';

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setDisable(true);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  const validateState = useCallback(() => {
    return Object.keys(validationSchema).find(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isInputFieldRequired && !stateValue) || stateError;
    });
  }, [state, validationSchema]);

  const handleOnChange = useCallback(
    event => {
      processChanges(event.target.name, event.target.value);
    },
    [validationSchema]
  );

  const processChanges = function (fieldName, fieldValue) {
    setIsDirty(true);
    const name = fieldName;
    const value = fieldValue;
    let error = '';
    const schemaField = validationSchema[name];

    if (schemaField.required) {
      if (!value) {
        if (schemaField.requiredErrorMessage) {
          error = schemaField.requiredErrorMessage;
        } else {
          error = 'Заполните это поле.';
        }
      }
    }

    if (
      schemaField.validators
      &&
      value
    ) {
      schemaField.validators.every(validator => {
        if (!validator.validate(value)) {
          error = validator.error;
          return false;
        }
        return true;
      });
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();
      const errorField = validateState();
      if (!errorField) {
        callback(state);
      } else {
        setState(prevState => ({
          ...prevState,
          [errorField]: { value: '', error: validationSchema[errorField].requiredErrorMessage },
        }));
      }
    },
    [state]
  );
  return { state, disable, handleOnChange, handleOnSubmit, processChanges };
}

export default useForm;