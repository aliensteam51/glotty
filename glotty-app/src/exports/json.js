export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry) => {
    const platform = entry.platforms.find((platf) => platf.platformCode === "json")
    if (!platform) return str + "No json platform in this entry"

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry`

    const lastEntry =  entries[entries.length-1] !== entry ? `,\n` : `\n`

    return str + `\t{\n\t\t"id": "${platform.key}",\n\t\t"translation": "${translation.translation}"\n\t}${lastEntry}`

  }, "[\n")

  return outputString + "]"
}
