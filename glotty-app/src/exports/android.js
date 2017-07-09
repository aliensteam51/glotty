import header from './header'

export default(entries, localeCode) => {
  const outputString = entries.reduce((str, entry, index) => {
    const defaultPlatform = entry.platforms.find((platf) => platf.platformCode === "default")

    let platform = entry.platforms.find((platf) => platf.platformCode === "android")
    if (!platform) platform = defaultPlatform                                          //find default platform if android wasn't found
    if (!platform) return str + `No Android or default platforms were found in this entry\n`

    let translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (translation.translation === '') translation = defaultPlatform.translations.find((tran) => tran.localeCode === localeCode) //find default platforms translation if androids translation wasn't found
    if (!translation) return str + `No ${localeCode} translation in this entry\n`            //a case like this hould not exist but still

    let group = ''
    if (entries.length > index+1 && (entries[index+1].group !== entry.group)) group = `<!--${entries[index+1].group}-->\n\n` //checking if next entry doesnt have the same group
    if (platform.keyId === '') platform = defaultPlatform // checking if keyId is empty than gets the keyId of default platform

    return str + `\t<string name="${platform.keyId}">${translation.translation}</string>\n` + group
  }, `<!--${header}-->\n<resources>\n\t<!--${entries[0].group}-->\n`)

  return outputString + "</resources>"
}
