import secureLocalStorage from 'react-secure-storage'

export const getAccessToken = () => {
  return secureLocalStorage.getItem('accessToken')
}

export const hasAccessForComment = (commentAuthor, postAuthor, user) => {
  const admin = parseInt(process.env.REACT_APP_ADMIN)

  // Author of the comment is admin and admin is not logged  in then anyone can not delete it or
  // Author of the comment,Manager of post author and admin any of three is not logged In then comment can't be deleted and edited
  if ((commentAuthor.roleId === admin && user.roleId !== admin) || (user.id !== postAuthor.id && user.id !== commentAuthor.id && user.roleId !== admin && user.id !== postAuthor.managerId)) {
    return false
  }

  return true
}

export const hasAccessForPost = (post, postAuthor, user) => {
  const admin = parseInt(process.env.REACT_APP_ADMIN)

  // Author of the post is admin and admin is not logged  in then anyone can not delete it or
  // Author of the post,Manager of author and admin any of three is not logged In then post can't be deleted and edited
  if ((postAuthor.roleId === admin && user.roleId !== admin) || (post.authorId !== user.id && postAuthor.managerId !== user.id && user.roleId !== admin)) {
    return false
  }
  return true
}

export const addSignupRules = (ValidatorForm, Data) => {
  ValidatorForm.addValidationRule('passwordStrength', (value) => {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(value) || value?.length === 0
  })
  ValidatorForm.addValidationRule('passwordMatch', (value) => {
    const password = Data.password
    return password === value || value?.length === 0
  })
  ValidatorForm.addValidationRule('nameFormat', (value) => {
    return value?.length >= 3 || value?.length === 0
  })
}

export const addPostRules = (ValidatorForm, Data) => {
  ValidatorForm.addValidationRule('titleFormat', (value) => {
    return (value?.length >= 3 && value?.length <= 20) || value?.length === 0
  })
  ValidatorForm.addValidationRule('descFormat', (value) => {
    return value?.length >= 10 || value?.length === 0
  })
}

export const addCommentRules = (ValidatorForm, Data) => {
  ValidatorForm.addValidationRule('commentFormat', (value) => {
    return value?.length >= 2 || value?.length === 0
  })
}
