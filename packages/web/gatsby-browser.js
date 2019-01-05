import WebFontLoader from "webfontloader";

export const onInitialClientRender = (a, options) => {
  WebFontLoader.load({
    custom: {
      families: ["Swiss721"],
      urls: ["/static/webfonts/Swiss721-licensed-to-Dominic-Fallows_unhinted.css"]
    }
  })
}