type ToggleAttributeProps = (
  attribute: string,
  value: string,
  tag?: string,
  remove?: boolean
) => void

export const toggleDocumentAttribute: ToggleAttributeProps = (
  attribute,
  value,
  tag = 'html'
): void => {
  if (document.body) {
    const element = document.getElementsByTagName(tag.toString())[0]
    element.setAttribute(attribute, value)
  }
}
