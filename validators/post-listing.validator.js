export const MIN_TITLE_LENGTH = 5;
export const MAX_TITLE_LENGTH = 100;
export const VAL_TITLE_PATTERN = /^[a-zA-Z0-9 ]+$/;

export const MIN_LOCAT_LENGTH = 5;
export const MAX_LOCAT_LENGTH = 400;
export const VAL_LOCAT_PATTERN = /./u;

export const MIN_DURATION = 1;
export const MAX_DURATION = 8;

export const MIN_IMG_SIZE = 1024 * 10; // 10KB
export const MAX_IMG_SIZE = 1024 * 400; // 400KB
export const VAL_IMG_PATTERN = /^(data:image\/)[^\s]+$/;

export const VAL_TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const MIN_DESC_LENGTH = 10;
export const MAX_DESC_LENGTH = 2000;

export function validateTitle(title) {
  if (!title) {
    return { valid: false, msg: "Title cannot be empty!" };
  }

  if (title.trim().length !== title.length) {
    return { valid: false, msg: "Title cannot start or end with spaces!" };
  }

  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    return {
      valid: false,
      msg: `Title must be between ${MIN_TITLE_LENGTH} && ${MAX_TITLE_LENGTH} characters in length!`,
    };
  }

  if (!VAL_TITLE_PATTERN.test(title)) {
    return { valid: false, msg: `Title must not contain symbols!` };
  }

  return { valid: true };
}

export function validateLocation(location, latitude, longitude) {
  // Validate location string
  if (!location) {
    return { valid: false, msg: "Location cannot be empty!" };
  }

  if (location.trim().length !== location.length) {
    return { valid: false, msg: "Location cannot start or end with spaces!" };
  }

  if (
    location.length < MIN_LOCAT_LENGTH ||
    location.length > MAX_LOCAT_LENGTH
  ) {
    return {
      valid: false,
      msg:
        `Location length must be between ${MIN_LOCAT_LENGTH} and ${MAX_LOCAT_LENGTH} characters ` +
        `in length!`,
    };
  }

  if (!VAL_LOCAT_PATTERN.test(location)) {
    return { valid: false, msg: "Location contains invalid symbols!" };
  }

  // Validate longitude and latitude
  if (longitude === undefined || latitude === undefined) {
    return { valid: false, msg: "Longitude and latitude have not been set!" };
  }

  return { valid: true };
}

export function validateDate(date) {
  if (!date) {
    return { valid: false, msg: "Date cannot be empty!" };
  }

  if (new Date(date) === "Invalid Date") {
    return { valid: false, msg: "Date is in invalid format!" };
  }

  return { valid: true };
}

export function validateTime(time) {
  if (!time) {
    return { valid: false, msg: "Time cannot be empty!" };
  }

  // if (!VAL_TIME_PATTERN.test(time)) {
  //   return { valid: false, msg: "Time is in the wrong format!" };
  // }

  return { valid: true };
}

export function validateDuration(duration) {
  if (!duration) {
    return { valid: false, msg: "Duration cannot be empty!" };
  }

  if (duration < MIN_DURATION || duration > MAX_DURATION) {
    return {
      valid: false,
      msg: `Duration must be between ${MIN_DURATION} and ${MAX_DURATION}!`,
    };
  }

  return { valid: true };
}

export function validateDescription(description) {
  if (!description) {
    return { valid: false, msg: "Description cannot be empty!" };
  }

  if (description.trim().length !== description.length) {
    return {
      valid: false,
      msg: "Description cannot start or end with spaces!",
    };
  }

  if (
    description.length < MIN_DESC_LENGTH ||
    description.length > MAX_DESC_LENGTH
  ) {
    return {
      valid: false,
      msg:
        `Description must be between ${MIN_DESC_LENGTH} and ${MAX_DESC_LENGTH} characters ` +
        `in length!`,
    };
  }

  return { valid: true };
}

export function validateImage(imageStr) {
  if (!imageStr) {
    return { valid: false, msg: "Image cannot be empty!" };
  }

  if (imageStr.length < MIN_IMG_SIZE) {
    return { valid: false, msg: "Image is too small!" };
  }

  if (imageStr.length > MAX_IMG_SIZE) {
    return { valid: false, msg: "Image is too large!" };
  }

  if (!VAL_IMG_PATTERN.test(imageStr)) {
    return { valid: false, msg: "Image is not in the correct format!" };
  }

  return { valid: true };
}
