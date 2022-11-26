import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, Grid, TextField as TF, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
// import { createAccountNomal } from 'api/apiAccount/account';
import TinyEditor from '@/components/Common/Editor/TinyEditor';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import Basic from '@/components/Dropzone/StyledDropzone';
import { useAuth } from '@/contexts/AuthGuard';
import { getCategory } from 'api/category/categoryApi';
import { addProduct } from 'api/product/productApi';
import { Atribute } from 'model/product';
interface IEdit {
  title: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),
  detail: yup.array().min(1),
  description: yup.string().required('Trường này là thuộc tính bắt buộc'),
  file: yup.mixed().required('File is required'),
  amount: yup.number().required('Trường này là thuộc tính bắt buộc'),
  category: yup.array().min(1)
});
const initForm = {
  name: '',
  detail: [],
  description: '',
  file: null,
  amount: 0,
  category: []
};

function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [category, setCategory] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const [defaultAtribute, setDefaultAtribute] = useState<Atribute[]>([
    { size: '', price: 0 }
  ]);
  const defaultItem: Atribute = { size: '', price: 0 };

  const addItem = () => {
    let temp = [...defaultAtribute, defaultItem];
    setDefaultAtribute(temp);
    formik.handleChange({ target: { name: 'detail', value: temp } });
  };

  const removeItem = (index: number) => {
    let temp = [...defaultAtribute];
    temp.splice(index, 1);
    setDefaultAtribute(temp);
    formik.handleChange({ target: { name: 'detail', value: temp } });
  };
  const handleChangeSize = (
    event: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    let temp = [...defaultAtribute];

    temp[index].size = event.target.value;
    setDefaultAtribute(temp);
    formik.handleChange({ target: { name: 'detail', value: temp } });
  };
  const handleChangePrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    let temp = [...defaultAtribute];
    temp[index].price = +event.target.value;
    setDefaultAtribute(temp);
    formik.handleChange({ target: { name: 'detail', value: temp } });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectedCategory = (data: any) => {
    console.log(data);

    formik.handleChange({ target: { name: 'category', value: data } });
  };

  const handleFile = (file) => {
    let a = file.length > 0 && file.map((d, i) => URL.createObjectURL(d));
    setPreview(a);

    // const objectUrl = URL.createObjectURL(
    //   (e.target as HTMLInputElement).files[0]
    // );
    formik.handleChange({
      target: { name: 'file', value: file }
    });
  };

  useEffect(() => {
    if (openDialog) {
      getCategory().then((res) => {
        let temp = res.data.map((d) => ({ desc: d.name, slug: d.slug }));
        setCategory(temp);
      });

      setTrigger(true);
    }
  }, [openDialog]);

  const onSubmit = async (values, { resetForm }) => {
    const { name, description, amount, file, detail, category } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('amount', amount);
    formData.append(
      'category',
      category.map((d) => d.slug)
    );

    Array.from(file).forEach((file: File) => {
      formData.append('files', file);
    });

    let temp = JSON.stringify(detail).slice(1, -1);

    // Array.from(detail).forEach((d: any) => {
    formData.append(`detail`, temp);
    //   formData.append(`detail[price]`, d && d.price);
    // });
    // file && formData.append('avatar', file);

    try {
      await addProduct(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Tạo sản phẩm thành công`
        });
        handleCloseDialog();
        resetForm();

        setPreview([]);
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };
  const changeContent = (data: string) => {
    formik.handleChange({
      target: { name: 'description', value: data }
    });
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
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Tên sản phảm"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography>Mô tả</Typography>
              <TinyEditor changeBody={changeContent} defaultValue={''} />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutoCompleteHarder
                  trigger={trigger}
                  title="Danh sách danh mục sản phẩm"
                  data={category}
                  id="create-vip-weapon"
                  name="category"
                  formik={formik}
                  defaultValue={[]}
                  handleSelected={handleSelectedCategory}
                />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <Box>
                  Thêm thuộc tính sản phẩm{' '}
                  <Button onClick={addItem}>Thêm</Button>
                </Box>
                <Box>
                  {defaultAtribute.map((d: Atribute, i) => (
                    <Grid container columnSpacing={2} key={i} mt={3}>
                      <Grid item xs={12} md={6}>
                        <TF
                          label="Thuộc tính"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          type="text"
                          value={d.size}
                          onChange={(e: any) => {
                            handleChangeSize(e, i);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <TF
                          label="Giá "
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          name="price"
                          type="number"
                          value={d.price}
                          onChange={(e: any) => {
                            handleChangePrice(e, i);
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={1}
                        alignItems="center"
                        display={'flex'}
                      >
                        {i !== 0 && (
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              removeItem(i);
                            }}
                          >
                            Xóa
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Basic handleFile={handleFile} />
              <Box mt={3} sx={{ display: 'flex', '& div': { marginRight: 1 } }}>
                {preview.length > 0 &&
                  preview.map((d) => (
                    <Box width={200} height={150} key={d}>
                      <Image
                        src={d}
                        layout="responsive"
                        width={200}
                        height={150}
                      ></Image>
                    </Box>
                  ))}
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? 'Loading...' : 'Thêm'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddAccount;
