type Langs = "ru-RU" | "en-US";

export const getBrowserLanguage = (): Langs => {
  const lang = localStorage.getItem("LANGUAGE");

  if (lang) {
    return lang as Langs;
  } else if (navigator.language !== "ru-RU" && navigator.language !== "en-US") {
    return "en-US";
  } else {
    return navigator.language as Langs;
  }
};
