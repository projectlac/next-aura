import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import getNameSortAtoB from '@/utility/sortArray';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import { editAccountVip, getAccountBySlug } from 'api/apiAccount/account';
import { getHero, getWeapon } from 'api/apiTag/tagApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Tên tài khoản is required'),
  username: yup.string().required('Thông tin này là bắt buộc'),
  ar: yup.string().required('AR là thuộc tính bắt buộc'),

  hero: yup
    .array()
    .min(1, 'Thông tin này là bắt buộc')
    .nullable()
    .required('Thông tin này là bắt buộc'),

  price: yup.number().required('Thông tin này là bắt buộc')
});

function EditAccout({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const [previewDetail, setPreviewDetail] = useState<string>('');
  const [weapon, setWeapon] = useState([]);
  const [hero, setHero] = useState([]);
  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    username: '',
    password: '',
    server: '',
    detail: 'ASIA',
    price: 0,
    ar: 10,
    weapon: [],
    hero: [],
    avatar: '',
    images: '',
    file: null,
    fileDetail: null
  });

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
    formik.handleChange({ target: { name: 'hero', value: data } });
  };
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );

    setPreview(objectUrl);
    formik.handleChange({
      target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
    });
  };
  const handleFileDetail = (e: React.FormEvent<HTMLInputElement>) => {
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );
    setPreviewDetail(objectUrl);
    formik.handleChange({
      target: {
        name: 'fileDetail',
        value: (e.target as HTMLInputElement).files[0]
      }
    });
  };

  useEffect(() => {
    const callApi = async () => {
      getWeapon(999).then((res) => {
        let temp = res.data.data.map((d) => ({ slug: d.slug, desc: d.desc }));
        setWeapon(temp);
      });
      getHero(999).then((res) => {
        let temp = res.data.data.map((d) => ({ slug: d.slug, desc: d.desc }));
        setHero(temp);
      });
      await getAccountBySlug(slug).then((res) => {
        const data = res.data;

        let temp = {
          name: data.name,
          username: data.username,
          password: '',
          server: data.server.desc,
          detail: data.description,
          price: data.price,
          ar: data.ar_level,
          weapon: data.weapons,
          hero: data.heroes,
          avatar: data.avatar,
          images: data.images,
          file: null,
          fileDetail: null
        };

        setDefaultData(temp);
      });
    };
    if (openDialog) {
      callApi();
    }
  }, [openDialog]);
  const onSubmit = async (values, { resetForm }) => {
    const {
      name,
      username,
      server,
      password,
      detail,
      price,
      ar,
      weapon,
      file,
      fileDetail,
      hero
    } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    password && formData.append('password', password);
    formData.append('server', server);
    formData.append('description', detail);
    formData.append('price', price);
    formData.append('ar_level', ar);
    formData.append('weapon', weapon.toString());
    formData.append('hero', hero.toString());

    file && formData.append('avatar', file);
    fileDetail && formData.append('images', fileDetail);

    try {
      await editAccountVip(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa tài khoản thành công'
        });
        handleCloseDialog();
        resetForm();
        setPreviewDetail('');
        setPreview('');
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };

  const initForm = defaultData;

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon />}
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
                label="Tiêu đề"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>
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
                <AutoCompleteHarder
                  title="Danh sách vũ khí"
                  name="weapon"
                  id={`edit-weapon-${slug}`}
                  formik={formik}
                  handleSelected={handleSelectedWeapon}
                  defaultValue={defaultData.weapon}
                  data={getNameSortAtoB(weapon)}
                />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutoCompleteHarder
                  title="Danh sách nhân vật"
                  name="hero"
                  id={`edit-hero-${slug}`}
                  formik={formik}
                  handleSelected={handleSelectedCharacter}
                  defaultValue={defaultData.hero}
                  data={getNameSortAtoB(hero)}
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
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Ar"
                variant="outlined"
                fullWidth
                name="ar"
                type="number"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Selection
                formik={formik}
                label="Server"
                variant="outlined"
                fullWidth
                name="server"
                options={[
                  { value: 'ASIA', title: 'Asia' },
                  { value: 'AMERICA', title: 'America' },
                  { value: 'EUROPE', title: 'Europe' },
                  { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                ]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Giá"
                variant="outlined"
                fullWidth
                name="price"
                type="number"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id={`change-avatar-edit-account-vip${slug}`}
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor={`change-avatar-edit-account-vip${slug}`}>
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
                    Upload avatar
                  </Button>
                </label>
              </Box>

              {preview ? (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {defaultData.avatar && (
                    <Box width={200} height={150}>
                      <Image
                        src={defaultData.avatar}
                        layout="responsive"
                        width={200}
                        height={150}
                      ></Image>
                    </Box>
                  )}
                </Box>
              )}
            </Grid>

            <Grid item md={6} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id={`change-detail-edit-account-vip${slug}`}
                  type="file"
                  name="fileDetail"
                  onChange={handleFileDetail}
                />
                <label htmlFor={`change-detail-edit-account-vip${slug}`}>
                  <Button
                    startIcon={<UploadTwoToneIcon />}
                    variant="contained"
                    component="span"
                    sx={{
                      background: Boolean(formik.errors.fileDetail)
                        ? theme.colors.error.main
                        : theme.colors.primary.main
                    }}
                  >
                    Upload ảnh chi tiết
                  </Button>
                </label>
              </Box>
              {previewDetail !== '' ? (
                <Box width={200} height={150}>
                  <Image
                    src={previewDetail}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {defaultData.images &&
                    defaultData.images.map((d, i) => (
                      <Box width={200} height={150} key={i}>
                        <Image
                          src={d}
                          layout="responsive"
                          width={200}
                          height={150}
                        ></Image>
                      </Box>
                    ))}
                </Box>
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? 'Loading...' : 'Sửa '}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccout;
