export function DateTransform(time: Date) {
  const year = time.getFullYear()
  const month = time.getMonth() < 10 ? '0'+time.getMonth() : time.getMonth()
  const day = time.getDate() < 10 ? '0'+time.getDate() : time.getDate()
  const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours()
  const min = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes()

  return year+'/'+month+'/'+day+' '+hour+':'+min
}