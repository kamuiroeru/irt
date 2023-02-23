import ExifReader from "exifreader";
import { dateTextForFileName, dateCreatedTextForFileName } from './dateStrUtils'

export const getCreatedDateTimeFromExif = (exif: ArrayBuffer): string => {
  const tags = ExifReader.load(exif);
  const dateTimeOriginal = tags.DateTimeOriginal?.description;
  const dateCreated = tags.DateCreated?.description;

  if (dateTimeOriginal !== undefined) {
    return dateTextForFileName(dateTimeOriginal)
  } else if (dateCreated !== undefined) {
    return dateCreatedTextForFileName(dateCreated)
  } else {
    return ''
  }
}
