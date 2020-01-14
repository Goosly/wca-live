import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { toInt } from '../../../../logic/utils';

const numberToInput = number => {
  if (number === 0) return '';
  if (number === -1) return 'DNF';
  if (number === -2) return 'DNS';
  return number.toString();
};

const validateFmResult = number => {
  if (number > 80) return -1;
  return number;
};

const FmField = ({ initialValue, onValue, ...props }) => {
  const [prevInitialValue, setPrevInitialValue] = useState(null);
  const [value, setValue] = useState(initialValue);

  /* Sync local value when initial value changes. See AttemptField for detailed description. */
  if (prevInitialValue !== initialValue) {
    setValue(initialValue);
    setPrevInitialValue(initialValue);
  }

  return (
    <TextField
      {...props}
      fullWidth
      variant="outlined"
      value={numberToInput(value)}
      spellCheck={false}
      onKeyPress={event => {
        if (['d', 'D', '*'].includes(event.key)) {
          setValue(-1);
          event.preventDefault();
        } else if (['s', 'S', '*'].includes(event.key)) {
          setValue(-2);
          event.preventDefault();
        }
      }}
      onChange={event => {
        const newValue = toInt(event.target.value.replace(/\D/g, '')) || 0;
        setValue(newValue);
      }}
      onBlur={() => {
        onValue(validateFmResult(value));
        /* Once we emit the change, reflect the initial state. */
        setValue(initialValue);
      }}
    />
  );
};

export default FmField;
