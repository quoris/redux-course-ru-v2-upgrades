export const getCurrentYear = () => new Date().getFullYear()

export const getLastYears = number => {
  const currentYear = getCurrentYear()

  return Array.from({ length: number }, (el, i) => currentYear - i) // массив состоящий из number последних лет
}

// export const getCurrentYear = () => 2018

// export const getLastYears = number => {
//   return [2018, 2017, 2016, 2015, 2014]
// }
