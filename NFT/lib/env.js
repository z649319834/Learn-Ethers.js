export function env(key) {
  const value = process.env[key]
  if (value === undefined) {
    throw `${key} is undefined`
  }
  return value
}
