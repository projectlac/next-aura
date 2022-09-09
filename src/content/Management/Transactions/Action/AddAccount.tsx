import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button } from '@mui/material';
interface IEdit {
  title: string;
}
function AddAccount({ title }: IEdit) {
  const edit = () => {
    console.log('edit');
  };
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
      onSubmit={edit}
    >
      <Box>HUHU</Box>
    </DialogCommon>
  );
}

export default AddAccount;
