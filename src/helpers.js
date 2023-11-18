export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_PHONE_REGEX = /^\d{10}$/;

export const IMAGE_FILE_TYPE_PATTERN =
  /[^\s]+(.*?).(jpg|jpeg|png|JPG|JPEG|PNG)$/;

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const MAXIMUM_NAME_CHARACHTERS = 125;

export const UPLOAD_IMAGE_SIZE = 40960;

export function validateEmail(email = '') {
  if (email.trim() === '') {
    return false; // Empty email
  }
  return EMAIL_PATTERN.test(email);
}

export function validateNameStringLength(name = '') {
  if (name.trim() === '') {
    return false; // Empty name
  }

  return name?.length < 125;
}

export function validateImageFileType(fileType = '') {
  if (fileType.trim() === '') {
    return false; // Empty file type
  }
  return IMAGE_FILE_TYPE_PATTERN.test(fileType);
}

export function validatePassword(password = '') {
  if (password.trim() === '') {
    return false; // Empty password
  }
  return PASSWORD_PATTERN.test(password);
}

export function validateFileSize(fileSize = 0) {
  const fileInMB = Math.round(fileSize / 1024);
  if (fileInMB > UPLOAD_IMAGE_SIZE) {
    return false;
  }
  return true;
}

export const convertFileToURL = (file) => {
  return file?.size ? URL.createObjectURL(file) : file;
};
