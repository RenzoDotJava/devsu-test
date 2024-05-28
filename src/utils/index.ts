export const parseDate = (date: string): string => {
  const arr = date.split('-')
  
  return `${arr[2]}/${arr[1]}/${arr[0]}`
}