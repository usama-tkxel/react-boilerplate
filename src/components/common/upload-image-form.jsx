import { FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import UploadImage from 'src/components/common/upload-image';
import { acceptedImageFormatsHtml, acceptedImageFormatsString } from 'src/constants/app-defaults';

const UploadImageValidation = ({
  control,
  name,
  label,
  error,
  isRequired,
  url,
  acceptFileFormat = acceptedImageFormatsHtml,
  acceptFileFormatString = acceptedImageFormatsString,
  text = 'image',
  fileName = ''
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <UploadImage
            label={label}
            id={name}
            name={name}
            onChange={(e) => onChange(e)}
            isRequired={isRequired}
            url={url}
            error={error}
            accept={acceptFileFormat}
            acceptString={acceptFileFormatString}
            text={text}
            fileName={fileName}
          />
        )}
      />
    </>
  );
};

export default UploadImageValidation;
