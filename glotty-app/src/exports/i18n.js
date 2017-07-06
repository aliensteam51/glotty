export default(entries, localeCode) => {
  const outputString = entries.reduce((str, entry) => {
    let platform = entry.platforms.find((platf) => platf.platformCode === "i18n")
    if (!platform) platform = entry.platforms.find((platf) => platf.platformCode === "default") //find default platform if ios wasn't found
    if (!platform) return str + `No i18n platform in this entry\n`

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry\n`

    const lastEntry =  entries[entries.length-1] !== entry ? `,\n` : `\n`

    return str + `    {\n        "id": "${platform.key}",\n        "translation": "${translation.translation}"\n    }${lastEntry}`

  }, "[\n")

  return outputString + "]"
}
