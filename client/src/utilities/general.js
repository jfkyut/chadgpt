export const useGeneralUtilities = () => {

  const copyTextToClipboard = (text) => window.navigator.clipboard.writeText(text);

  //

  return { copyTextToClipboard }
}