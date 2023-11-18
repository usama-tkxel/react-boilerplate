import {
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { BsFillImageFill } from 'react-icons/bs';

const UploadImage = forwardRef(
  (
    {
      id,
      label = '',
      className = '',
      error = null,
      name = '',
      onChange,
      accept,
      acceptString,
      text,
      isRequired = false,
      multiple = false,
      setValue,
      url = '',
      fileName,
      ...rest
    },
    ref
  ) => {
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(fileName);
    const [isDragging, setIsDragging] = useState(false);

    const handleSpanClick = () => {
      fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
      const file = event.target.files[0] || null;
      if (file) {
        setSelectedFileName(file.name);
        !onChange && setValue(name, file);
        // Call the onChange callback if provided
        onChange && onChange(file);
      }
    };

    const handleDragEnter = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        setSelectedFileName(file.name);
        !onChange && setValue(name, file);
        // Call the onChange callback if provided
        onChange && onChange(file);
      }
    };

    // Expose the file input ref using useImperativeHandle
    useImperativeHandle(ref, () => ({
      focus: () => {
        fileInputRef.current.focus();
      },
      // Add any other methods or properties you need to expose
    }));

    useEffect(() => {
      setSelectedFileName(fileName)
    }, [fileName])

    return (
      <div
        className="col-span-full"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <HStack spacing={1}>
          <FormLabel mr={0} htmlFor={id}>
            {label}
          </FormLabel>
          {isRequired && (
            <Text role="presentation" color={'red'}>
              *
            </Text>
          )}
        </HStack>
        <div
          className={`mt-2 flex justify-center rounded-lg border ${
            isDragging
              ? 'border-indigo-600'
              : 'border-dashed border-gray-900/25'
          } px-6 py-10`}
        >
          <div className="text-center">
            {url ? (
              <Image
                src={url}
                className={`mx-auto h-12 w-12 text-gray-300 ${
                  isDragging ? 'text-indigo-600' : ''
                }`}
              />
            ) : (
              <BsFillImageFill
                className={`mx-auto h-12 w-12 text-gray-300 ${
                  isDragging ? 'text-indigo-600' : ''
                }`}
                aria-hidden="true"
              />
            )}
            <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
              <span
                className={`relative cursor-pointer rounded-md bg-white font-semibold ${
                  isDragging ? 'text-indigo-600' : 'text-indigo-600'
                } focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}
                onClick={handleSpanClick}
              >
                {isDragging ? `Drop ${text}` : `Upload ${text}`}
                {!url && selectedFileName && <p>{selectedFileName}</p>}
              </span>
              {/* input is hiiden due to UI */}
              <Input
                style={{ display: 'none' }}
                id={id}
                type="file"
                className={`sr-only ${className}`}
                accept={accept}
                onChange={handleFileInputChange}
                multiple={multiple}
                ref={(e) => {
                  fileInputRef.current = e;
                  // Register the input with React Hook Forms ref
                  //   control.register(e, { name });
                }}
                {...rest}
              />
            </div>
            <p className="">or drag & drop</p>
          </div>
        </div>
        <p className="text-xs leading-5 text-gray-600">
          Accepted file formats: [{acceptString}]
        </p>

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </div>
    );
  }
);

export default UploadImage;
