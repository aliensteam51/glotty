export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry) => {
    const platform = entry.platforms.find((platf) => platf.platformCode === "ios")
    if (!platform) return str + "No ios platform in this entry"

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry`

    return str + `"${platform.key}" = "${translation.translation}";\n`
  }, "")

  return outputString
}
