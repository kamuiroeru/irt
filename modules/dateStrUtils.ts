/**
 *
 * @param origin `2022:09:22 15:11:41`
 * @returns `20220922-151141`
 */
export const dateTextForFileName = (origin: string): string => {
  return origin.replaceAll(' ', '-').replaceAll(':', '')
}
