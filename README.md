# react-native-root-view
inject a component to root container component

[![npm](https://img.shields.io/npm/l/express.svg)]()

[![NPM](https://nodei.co/npm/react-native-root-view.png)](https://nodei.co/npm/react-native-root-view/)

## Install
```bash
npm install --save react-native-root-view
// or
yarn add react-native-root-view
```

## Usage
```javascript
import rootView from 'react-native-root-view';

// inject a component
const id = rootView.set(<YOUR_CUSTOM_COMPONENT/>);

// remove the injected component
rootView.remove(id);
```

## Example
```bash
git clone https://github.com/beilunyang/react-native-root-view
cd react-native-root-view/example
npm install
npm install react-native-root-view
npm start
```

## License
MIT


