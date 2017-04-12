import { Client } from 'bugsnag-react-native'
import Config from 'react-native-config'
const client = new Client(Config.BUGSNAG_CLIENT)
export default client


// To produce necessary bundle
// react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle --sourcemap-output ./sourcemap.js.map
// react-native bundle --platform ios --entry-file index.ios.js --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios --sourcemap-output ./sourcemap.js
/*
curl https://upload.bugsnag.com/ \
  -F apiKey=91b33e87b842149c352d08456c6f6821 \
  -F appVersion=1.0 \
  -F minifiedUrl="main.jsbundle" \
  -F sourceMap=@./sourcemap.js.map \
  -F minifiedFile=@./ios/main.jsbundle \
  -F overwrite=true
  */