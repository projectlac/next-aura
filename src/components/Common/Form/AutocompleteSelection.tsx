import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface CharacterProps {
  data: any;
  formik: any;
  name: string;
  handleSelected: (data: string[]) => void;
  defaultValue: string[];
  title: string;
}
export default function AutocompleteSelection({
  data,
  formik,
  name,
  defaultValue,
  title,
  handleSelected
}: CharacterProps) {
  const theme = useTheme();
  const [names, setNames] = React.useState(data);
  const [personName, setPersonName] = React.useState<string[]>([]);
  React.useEffect(() => {
    setNames(data);
  }, [data]);
  React.useEffect(() => {
    if (defaultValue.length > 0) setPersonName(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    handleSelected(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl
        fullWidth
        sx={{
          '& label': {
            fontFamily: 'Montserrat',
            fontWeight: 'bold'
          },
          '& input': {
            fontFamily: 'Montserrat'
          }
        }}
      >
        <InputLabel
          sx={{ color: `${Boolean(formik.errors[name]) ? '#d32f2f' : ''}` }}
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          name="character"
          value={personName}
          fullWidth
          onChange={handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          input={<OutlinedInput id="select-multiple-chip" label={title} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ fontFamily: 'Montserrat' }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              value={name.desc}
              style={getStyles(name.desc, personName, theme)}
              sx={{
                fontFamily: 'Montserrat'
              }}
            >
              {name.desc}
            </MenuItem>
          ))}
        </Select>
        {Boolean(formik.errors[name]) && (
          <FormHelperText sx={{ color: '#d32f2f' }}>
            {formik.touched[name] && (formik.errors[name] as string)}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
