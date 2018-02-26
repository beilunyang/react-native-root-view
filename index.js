import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  DeviceEventEmitter,
} from 'react-native';

if (AppRegistry.setWrapperComponentProvider) {
  AppRegistry.setWrapperComponentProvider(() => {
    return class extends Component {
      static displayName = 'RootViewWrapper';

      components = [];

      componentDidMount() {
        DeviceEventEmitter.addListener('setComponent', (component, callback) => {
          this.components.push(component);
          this.forceUpdate(callback);
        });
        DeviceEventEmitter.addListener('removeComponent', (id = null, callback) => {
          if (typeof id === 'number') {
            this.components.splice(this.components[id], 1);
          } else {
            this.components = [];
          }
          this.forceUpdate(callback);
        });
      }

      render() {
        const components = this.components.map((component, idx) => (
          <component key={idx} />
        ));
        return (
          <View style={{ flex: 1 }}>
            {this.props.children}
            {components}
          </View>
        );
      }
    };
  });
} else {
  AppRegistry.registerComponent = () => {

  };
}

export default {
  id: -1,

  set(component, callback) {
    DeviceEventEmitter.emit('setComponent', {
      id: ++this.id,
      component,
    }, callback);
    return id;
  },

  remove(id, callback) {
    DeviceEventEmitter.emit('removeComponent', id, callback);
  },
};

