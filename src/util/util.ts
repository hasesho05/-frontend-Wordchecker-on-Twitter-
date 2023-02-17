import Resizer from 'react-image-file-resizer'

export const resizeFile = (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1200,
      1200,
      'JPEG',
      50,
      0,
      (uri) => {
        resolve(uri as string)
      },
      'file'
    )
  })
}