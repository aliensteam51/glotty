export default(entries, localeCode) => {
  debugger
  const outputString = entries.reduce((str, entry) => {
    let platform = entry.platforms.find((platf) => platf.platformCode === "android")
    if (!platform) platform = entry.platforms.find((platf) => platf.platformCode === "default") //find default platform if android wasn't found
    if (!platform) return str + `No Android or default platforms were found in this entry\n`

    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)
    if (!translation) return str + `No ${localeCode} translation in this entry\n` //a case like this hould not exist but still

    return str + `<string name="${platform.key}">${translation.translation}</string>\n`
  }, "<resources>")

  return outputString + "</resources>"
}
