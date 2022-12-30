import { useState, useEffect, useCallback } from 'react';

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true);
  }, []);

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  // Used to disable submit button if there's an error in state
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateState = useCallback(() => {
    return Object.keys(validationSchema).find(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error
      return (isInputFieldRequired && !stateValue) || stateError;
    });
    
  }, [state, validationSchema]);


  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    event => {
      processChanges(event.target.name, event.target.value);
    },
    [validationSchema]
  );

  const processChanges = function(fieldName, fieldValue) {
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
      schemaField.validator !== null &&
      typeof schemaField.validator === 'object'
    ) {
      if (value && !schemaField.validator.regEx.test(value)) {
        error = schemaField.validator.error;
      }
    }

    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();
      // Make sure that validateState returns false
      // Before calling the submit callback function
      const errorField = validateState();
      if (!errorField) {
        callback(state);
      } else{
        setState(prevState => ({
          ...prevState,
          [errorField]: { value:'', error: validationSchema[errorField].requiredErrorMessage },
        }));
      }
    },
    [state]
  );

  return { state, disable, handleOnChange, handleOnSubmit, processChanges };
}

export default useForm;