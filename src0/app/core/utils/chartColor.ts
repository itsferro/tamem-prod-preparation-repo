export function getCssVariableValue(variable: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    variable
  )
  return value && value.length > 0 ? value.trim() : value
}
