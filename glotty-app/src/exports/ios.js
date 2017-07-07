import header from './header'

export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry, index) => {
    const defaultPlatform = entry.platforms.find((platf) => platf.platformCode === "default")

    let platform = entry.platforms.find((platf) => platf.platformCode === "ios")
    if (!platform) platform = defaultPlatform                                                //find default platform if ios wasn't found
    if (!platform) return str + `No ios platform in this entry\n`

    let translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (translation.translation === '') translation = defaultPlatform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry\n`

    let group = ''
    if (entries.length > index+1 && (entries[index+1].group !== entry.group)) group = `/*${entries[index+1].group}*/\n\n` //checking if next entry doesnt have the same group
    if (platform.keyId === '') platform = defaultPlatform
    
    return str + `"${platform.keyId}" = "${translation.translation}";\n` + group
  }, `/*${header}*/\n\n/*${entries[0].group}*/\n\n`)

  return outputString
}
