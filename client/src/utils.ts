export const formDataToObject = (formData: FormData) => {
    const obj = {}
    formData.forEach((value, key) => {
        // @ts-ignore
        obj[key] = value
    })
    return obj
}
