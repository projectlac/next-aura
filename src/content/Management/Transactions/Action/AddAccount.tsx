import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import AutocompleteSelection from '@/components/Common/Form/AutocompleteSelection';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { styled } from '@mui/styles';
import Image from 'next/image';
interface IEdit {
  title: string;
}
interface IFilm {
  title: string;
}
const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  username: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password là thuộc tính bắt buộc'),
  ar: yup.string().required('AR là thuộc tính bắt buộc'),
  weapon: yup
    .array()
    .min(1, 'Thông tin này là bắt buộc')
    .nullable()
    .required('Thông tin này là bắt buộc'),
  character: yup
    .array()
    .min(1, 'Thông tin này là bắt buộc')
    .nullable()
    .required('Thông tin này là bắt buộc'),
  file: yup.mixed().required('File is required')
});
const initForm = {
  username: '',
  password: '',
  server: 'Asia',
  detail: '',
  ar: 10,
  weapon: []
};
const onSubmit = (values) => {
  console.log(values);

  console.log('submit?');
};
function AddAccount({ title }: IEdit) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');

  const top100Films: IFilm[] = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
    {
      title: 'The Lord of the Rings: The Return of the King'
    },
    { title: 'The Good, the Bad and the Ugly' },
    { title: 'Fight Club' },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring'
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back'
    },
    { title: 'Forrest Gump' },
    { title: 'Inception' },
    {
      title: 'The Lord of the Rings: The Two Towers'
    },
    { title: "One Flew Over the Cuckoo's Nest" },
    { title: 'Goodfellas' },
    { title: 'The Matrix' },
    { title: 'Seven Samurai' },
    {
      title: 'Star Wars: Episode IV - A New Hope'
    },
    { title: 'City of God' },
    { title: 'Se7en' },
    { title: 'The Silence of the Lambs' },
    { title: "It's a Wonderful Life" },
    { title: 'Life Is Beautiful' },
    { title: 'The Usual Suspects' },
    { title: 'Léon: The Professional' },
    { title: 'Spirited Away' },
    { title: 'Saving Private Ryan' },
    { title: 'Once Upon a Time in the West' },
    { title: 'American History X' },
    { title: 'Interstellar' },
    { title: 'Casablanca' },
    { title: 'City Lights' },
    { title: 'Psycho' },
    { title: 'The Green Mile' },
    { title: 'The Intouchables' },
    { title: 'Modern Times' },
    { title: 'Raiders of the Lost Ark' },
    { title: 'Rear Window' },
    { title: 'The Pianist' },
    { title: 'The Departed' },
    { title: 'Terminator 2: Judgment Day' },
    { title: 'Back to the Future' },
    { title: 'Whiplash' },
    { title: 'Gladiator' },
    { title: 'Memento' },
    { title: 'The Prestige' },
    { title: 'The Lion King' },
    { title: 'Apocalypse Now' },
    { title: 'Alien' },
    { title: 'Sunset Boulevard' },
    {
      title:
        'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb'
    },
    { title: 'The Great Dictator' },
    { title: 'Cinema Paradiso' },
    { title: 'The Lives of Others' },
    { title: 'Grave of the Fireflies' },
    { title: 'Paths of Glory' },
    { title: 'Django Unchained' },
    { title: 'The Shining' },
    { title: 'WALL·E' },
    { title: 'American Beauty' },
    { title: 'The Dark Knight Rises' },
    { title: 'Princess Mononoke' },
    { title: 'Aliens' },
    { title: 'Oldboy' },
    { title: 'Once Upon a Time in America' },
    { title: 'Witness for the Prosecution' },
    { title: 'Das Boot' },
    { title: 'Citizen Kane' },
    { title: 'North by Northwest' },
    { title: 'Vertigo' },
    {
      title: 'Star Wars: Episode VI - Return of the Jedi'
    },
    { title: 'Reservoir Dogs' },
    { title: 'Braveheart' },
    { title: 'M' },
    { title: 'Requiem for a Dream' },
    { title: 'Amélie' },
    { title: 'A Clockwork Orange' },
    { title: 'Like Stars on Earth' },
    { title: 'Taxi Driver' },
    { title: 'Lawrence of Arabia' },
    { title: 'Double Indemnity' },
    {
      title: 'Eternal Sunshine of the Spotless Mind'
    },
    { title: 'Amadeus' },
    { title: 'To Kill a Mockingbird' },
    { title: 'Toy Story 3' },
    { title: 'Logan' },
    { title: 'Full Metal Jacket' },
    { title: 'Dangal' },
    { title: 'The Sting' },
    { title: '2001: A Space Odyssey' },
    { title: "Singin' in the Rain" },
    { title: 'Toy Story' },
    { title: 'Bicycle Thieves' },
    { title: 'The Kid' },
    { title: 'Inglourious Basterds' },
    { title: 'Snatch' },
    { title: '3 Idiots' },
    { title: 'Monty Python and the Holy Grail' }
  ];
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectedWeapon = (data: string[]) => {
    formik.handleChange({ target: { name: 'weapon', value: data } });
  };
  const handleSelectedCharacter = (data: string[]) => {
    formik.handleChange({ target: { name: 'character', value: data } });
  };
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    console.log((e.target as HTMLInputElement).files[0]);
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );
    setPreview(objectUrl);
    formik.handleChange({
      target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
    });
  };
  const getNameSortAtoB = () => {
    return (
      [...top100Films]
        // .filter((d) => d.type === type)
        .sort((a, b) => {
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        })
    );
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {title}
        </Button>
      }
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Tài khoản"
                placeholder=""
                variant="outlined"
                fullWidth
                name="username"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Mật khẩu"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutocompleteSelection
                  title="Danh sách vũ khí"
                  data={getNameSortAtoB()}
                  name="weapon"
                  formik={formik}
                  handleSelected={handleSelectedWeapon}
                  defaultValue={[]}
                />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutocompleteSelection
                  title="Danh sách nhân vật"
                  data={getNameSortAtoB()}
                  name="character"
                  formik={formik}
                  handleSelected={handleSelectedCharacter}
                  defaultValue={[]}
                />
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Chi tiết tài khoản"
                variant="outlined"
                fullWidth
                name="detail"
                type="text"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Ar"
                variant="outlined"
                fullWidth
                name="ar"
                type="number"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Selection
                formik={formik}
                label="Server"
                variant="outlined"
                fullWidth
                name="server"
                type="select"
                options={[
                  { value: 'Asia', title: 'Asia' },
                  { value: 'America', title: 'America' },
                  { value: 'Europe', title: 'Europe' },
                  { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                ]}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id="change-cover"
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor="change-cover">
                  <Button
                    startIcon={<UploadTwoToneIcon />}
                    variant="contained"
                    component="span"
                    sx={{
                      background: Boolean(formik.errors.file)
                        ? theme.colors.error.main
                        : theme.colors.primary.main
                    }}
                  >
                    Upload ảnh
                  </Button>
                </label>
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              {preview && (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              )}
            </Grid>
            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Thêm
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddAccount;
