export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry) => {
    const platform = entry.platforms.find((platf) => platf.platformCode === "android")
    if (!platform) return str + "No Android platform in this entry"

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry`

    return str + `<string name="${platform.key}">${translation.translation}</string>\n`
  }, "<resources>")

  return outputString + "</resources>"
}
