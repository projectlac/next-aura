import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
interface IFilm {
  title: string;
}
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
function FilterVip() {
  const [currency, setCurrency] = useState('EUR');
  const [sort, setSort] = useState('UP');

  const [server, setServer] = useState('Asia');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeServer = (event) => {
    setServer(event.target.value);
  };
  return (
    <Card
      sx={{
        background: '#fff',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s'
      }}
    >
      <Typography
        textAlign={'center'}
        fontWeight={'bold'}
        fontSize={18}
        textTransform="uppercase"
      >
        Tìm kiếm
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }}></Divider>

      <Grid container columnSpacing={1.3} rowSpacing={2.5}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={top100Films}
            getOptionLabel={(option: IFilm) => option.title}
            defaultValue={[top100Films[13]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Multiple values"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={top100Films}
            getOptionLabel={(option: IFilm) => option.title}
            defaultValue={[top100Films[13]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Multiple values"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="AR"
            type={'number'}
            placeholder="Nhập AR thấp nhất"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            fullWidth
            value={currency}
            onChange={handleChange}
          >
            <MenuItem key="1" value="EUR">
              EUR
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Sắp xếp giá"
            fullWidth
            value={sort}
            onChange={handleChangeSort}
          >
            <MenuItem value="UP">Tăng dần</MenuItem>
            <MenuItem value="Down">Giảm dần</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Server"
            fullWidth
            value={server}
            onChange={handleChangeServer}
          >
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="America">America</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Mã số"
            type={'number'}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, mb: 1 }}></Divider>
      <Box textAlign={'center'}>
        <Button variant="contained">Tìm kiếm</Button>
      </Box>
    </Card>
  );
}

export default FilterVip;
