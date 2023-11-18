/* IMAGE UPLOAD DEFAULTS */

export const MAXIMUM_IMAGE_SIZE_MB = 5;
export const MAXIMUM_IMAGE_SIZE = MAXIMUM_IMAGE_SIZE_MB * 1024 * 1024;
export const acceptedImageFormats = ['svg', 'jpeg', 'jpg', 'png'];
export const acceptedImageFormatsString = acceptedImageFormats
  .map((imgFormat) => `.${imgFormat}`)
  .join(', ');
export const acceptedImageFormatsHtml = acceptedImageFormats
  .map((imgFormat) => `image/${imgFormat}`)
  .join(', ');
export const acceptedImageFormatsRegex = new RegExp(
  acceptedImageFormats.join('|'),
  'gi',
);

export const acceptedexcelFormats = ['csv', 'xlsx'];
export const acceptedExcelFormatsString = acceptedexcelFormats
  .map((xlsFormat) => `.${xlsFormat}`)
  .join(', ');

/* Admin Constants DEFAULTS */

export const { superAdmin, mgCustomerService, smManager, smSalesRep } = {
  superAdmin: {
    id: 1,
    value: 1,
    title: 'MG Super Admin',
  },
};

export const DEFAULT_SUPER_ADMIN_SELECT_OPTIONS = [superAdmin];

export const MESSAGE_SOMETHING_WENT_WRONG = 'Something went wrong';
