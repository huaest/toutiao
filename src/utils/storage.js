export const setItem = (k, v) => {
  if (typeof v !== 'string') {
    window.localStorage.setItem(k, JSON.stringify(v))
  } else {
    window.localStorage.setItem(k, v)
  }
}

export const getItem = k => {
  const data = window.localStorage.getItem(k)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

export const removeItem = k => {
  window.localStorage.removeItem(k)
}
