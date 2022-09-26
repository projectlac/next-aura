import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IAutocomplete {
  data: any;
  name: string;
  title: string;
  formik: any;
  handleSelected: (data: string[]) => void;
  defaultValue: any;
  id: string;
}
interface IData {
  desc: string;
  slug: string;
}
function AutoCompleteHarder({
  data,
  title,
  name,
  handleSelected,
  formik,
  defaultValue,
  id
}: IAutocomplete) {
  const [inputValueHero, setInputValueHero] = useState<IData[]>([]);

  useEffect(() => {
    setInputValueHero(defaultValue);
  }, [data, defaultValue]);
  return (
    <Autocomplete
      multiple
      id={id}
      value={inputValueHero}
      options={data}
      onChange={(event: any, newValue: any) => {
        console.log(event.type);

        setInputValueHero(newValue);
        let temp = newValue.map((d) => d.desc);
        handleSelected(temp);
      }}
      isOptionEqualToValue={(option, value) => option.desc === value.desc}
      getOptionLabel={(option: IData) => option.desc}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          name={name}
          label={title}
          error={formik.touched[name] && Boolean(formik.errors[name])}
        />
      )}
    />
  );
}

export default AutoCompleteHarder;
