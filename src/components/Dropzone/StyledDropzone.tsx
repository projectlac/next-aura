import { Box, Typography } from '@mui/material';
import Dropzone from 'react-dropzone';

export default function Basic(props) {
  const { handleFile } = props;
  return (
    <section className="container">
      <Dropzone
        maxSize={5242880}
        onDrop={(filesToUpload) => handleFile(filesToUpload)}
      >
        {({ getRootProps, getInputProps }) => (
          <>
            <Box
              {...getRootProps()}
              sx={{
                height: '150px',
                border: '2px dashed #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px'
              }}
            >
              <input {...getInputProps()} />
              <Typography
                sx={{
                  fontSize: '17px',
                  fontStyle: 'italic'
                }}
              >
                Drag 'n' drop some files here, or click to select files
              </Typography>
            </Box>
          </>
        )}
      </Dropzone>
    </section>
  );
}
