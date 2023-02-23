/**
 *
 * @param origin `2022:09:22 15:11:41`
 * @returns `20220922-151141`
 */
export const dateTextForFileName = (origin: string): string => {
  return origin.replaceAll(' ', '-').replaceAll(':', '')
}

/**
 *
 * @param origin `2022-10-28T20:47:41`
 * @returns `20221028-204741`
 */
export const dateCreatedTextForFileName = (origin: string): string => {
  return origin.replaceAll('T', '-').replaceAll('-', '').replaceAll(':', '')
}
