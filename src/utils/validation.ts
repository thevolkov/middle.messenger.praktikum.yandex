export function validatePatterns (input: HTMLInputElement): boolean {
  const patterns: Record<string, RegExp> = {
    name: /^[A-ZЁА-Я][A-Za-zЁёА-Яа-я-]*$/,
    login: /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/,
    password: /^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/,
    phone: /^\+?[0-9]{10,15}$/,
  }
  const pattern = patterns[input.name]
  if (pattern === undefined) return true

  return pattern.test(input.value)
}

export function checkInput (input: HTMLInputElement): void {
  const parentNode = input.parentNode
  const grandparentNode = parentNode?.parentNode
  const span = grandparentNode?.querySelector('span')
  const isValid = validatePatterns(input)
  if (span === undefined || span === null) return
  if (isValid) {
    span.style.display = 'none'
    console.log(input.name + ' Validation OK')
  } else {
    span.style.display = 'block'
    console.error(input.name + ' Validation ERROR')
  }
}

export function validation (): boolean {
  const fields: Record<string, any> = {}
  const result = true
  const inputs = document.querySelectorAll('input')
  inputs.forEach((input) => {
    checkInput(input)
    fields[input.name] = input.value
  })
  return result
}
