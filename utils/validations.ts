export const emailValidate = (email: string) => {
  return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const emptyValidate = <T>(fields: Record<string, string>) => {
  const fieldsEmptyState = Object.fromEntries(Object.entries(fields).map(([ key, value ]) => [ key, !value ]))
  const hasEmptyFields = Object.values(fieldsEmptyState).some(value => value)
  return {
    hasEmptyFields,
    fieldsEmptyState: fieldsEmptyState as T
  }
}

export const isEquals = (...items: (string | boolean | number)[]) => {
  return [ ...new Set(items) ].length === 1
}
