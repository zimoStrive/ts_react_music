export const formatCount = (count: number) => {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export const getImageSize = (
  imageUrl: string,
  width: number,
  height: number = width
) => {
  return imageUrl + `?param=${width}x${height}`
}
