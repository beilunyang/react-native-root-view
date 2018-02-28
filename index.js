import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  DeviceEventEmitter,
} from 'react-native';

if (AppRegistry.setWrapperComponentProvider) {
  AppRegistry.setWrapperComponentProvider(() => {
    return class RootViewWrapper extends Component {
      components = [];

      componentDidMount() {
        DeviceEventEmitter.addListener('setComponent', (component, callback) => {
          this.components.push(component);
          this.forceUpdate(callback);
        });
        DeviceEventEmitter.addListener('removeComponent', (id = null, callback) => {
          if (typeof id === 'number') {
            this.components[id] = undefined;
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
  const originRegister = AppRegistry.registerComponent;
  AppRegistry.registerComponent = (appKey, componentProvider, section) => {
    const reactElement = componentProvider();
    const newComponetProvider = () => {
      return class RootViewWrapper extends Component {
              components = [];

              componentDidMount() {
                DeviceEventEmitter.addListener('setComponent', (component, callback) => {
                  this.components.push(component);
                  this.forceUpdate(callback);
                });
                DeviceEventEmitter.addListener('removeComponent', (id = null, callback) => {
                  if (typeof id === 'number') {
                    this.components[id] = undefined;
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
                    {reactElement}
                    {components}
                  </View>
                );
              }
            };
    }

    return originRegister(appKey, newComponetProvider, section);
  };
}

let id = -1;

export default {
  set(component, callback) {
    DeviceEventEmitter.emit('setComponent', {
      id: ++id,
      component,
    }, callback);
    return id;
  },

  remove(id, callback) {
    DeviceEventEmitter.emit('removeComponent', id, callback);
  },
};

