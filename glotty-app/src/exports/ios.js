export default(entries, localeCode) => {

  const outputString = entries.reduce((str, entry) => {
    const platform = entry.platforms.find((platf) => platf.platformCode === "ios")
    const translation = platform.translations.find((tran) => tran.localeCode === localeCode)

    return str + `"${platform.key}" = "${translation.translation}";\n`
  }, "")

  return outputString
}
