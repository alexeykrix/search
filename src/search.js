import { GAPIKEY, GID } from './constants'

export const getResults = async (text, params) => {
  let filters = ''

  if (params) {
    const { exactTerms, excludeTerms, fileType } = params

    if (exactTerms) filters += '&exactTerms=' + exactTerms
    if (excludeTerms) filters += '&excludeTerms=' + excludeTerms
    if (fileType) filters += '&fileType==' + fileType
  }
  
  const query = `https://customsearch.googleapis.com/customsearch/v1?q=${ text }&key=${ GAPIKEY }&cx=${ GID }${ filters }`

  return new Promise((resolve, reject) => {
    fetch(query).then(r => r.json())
    .then(r => resolve(r))
    .catch(e => reject(e)) 
  })
}