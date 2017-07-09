export default(entries, localeCode) => {
  const outputString = entries.reduce((str, entry) => {
    const defaultPlatform = entry.platforms.find((platf) => platf.platformCode === "default")

    let platform = entry.platforms.find((platf) => platf.platformCode === "i18n")
    if (!platform) platform = defaultPlatform //find default platform if ios wasn't found
    if (!platform) return str + `No i18n platform in this entry\n`

    let translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (translation.translation === '') translation = defaultPlatform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry\n`

    if (platform.keyId === '') platform = defaultPlatform

    const lastEntry =  entries[entries.length-1] !== entry ? `,\n` : `\n`

    return str + `\t{\n\t\t"id": "${platform.keyId}",\n\t\t"translation": "${translation.translation}"\n\t}${lastEntry}`
  }, "[\n")

  return outputString + "]"
}
