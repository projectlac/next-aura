import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface IAutocomplete {
  data: any;
  name: string;
  title: string;
  formik: any;
  handleSelected: (data: any) => void;
  defaultValue: any;
  id: string;
  trigger: boolean;
}
interface IData {
  desc: string;
  slug: string;
}
function AutoCompleteHarder({
  data,
  title,
  name,
  trigger,
  handleSelected,
  formik,
  defaultValue,
  id
}: IAutocomplete) {
  const [inputValueHero, setInputValueHero] = useState<IData[]>([]);

  useEffect(() => {
    setInputValueHero(defaultValue);
  }, [data, trigger]);
  return (
    <Autocomplete
      multiple
      id={id}
      value={inputValueHero}
      options={data}
      onChange={(event: any, newValue: any) => {
        console.log(event.type);

        setInputValueHero(newValue);
        // let temp = newValue.map((d) => d.desc);
        handleSelected(newValue);
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
