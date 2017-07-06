import header from './header'

export default(entries, localeCode) => {
  const outputString = entries.reduce((str, entry, index) => {
    let platform = entry.platforms.find((platf) => platf.platformCode === "android")
    if (!platform) platform = entry.platforms.find((platf) => platf.platformCode === "default") //find default platform if android wasn't found
    if (!platform) return str + `No Android or default platforms were found in this entry\n`

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry\n` //a case like this hould not exist but still

    let group = ''
    if (entries.length > index+1 && (entries[index+1].group !== entry.group)) group = `<!--${entries[index+1].group}-->\n\n` //checking if next entry doesnt have the same group

    return str + `<string name="${platform.key}">${translation.translation}</string>\n` + group
  }, `<!--${header}--><resources>\n<!--${entries[0].group}-->`)

  return outputString + "</resources>"
}
