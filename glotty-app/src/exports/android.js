export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry) => {
    const platform = entry.platforms.find((platf) => platf.platformCode === "android")
    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)

    return str + `<string name="${platform.key}">${translation.translation}</string>\n`
  }, "<resources>")

  return outputString + "</resources>"
}
