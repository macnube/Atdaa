import { Client } from 'bugsnag-react-native'
const client = new Client('91b33e87b842149c352d08456c6f6821')
export default client


// To produce necessary bundle
// react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle
/*
curl https://upload.bugsnag.com/ \
  -F apiKey=91b33e87b842149c352d08456c6f6821 \
  -F appVersion=1.0 \
  -F minifiedUrl="main.jsbundle" \
  -F sourceMap=@./main.jsbundle.map \
  -F minifiedFile=@./ios/main.jsbundle \
  -F overwrite=true
  */