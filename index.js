import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  DeviceEventEmitter,
} from 'react-native';
import StaticContainer from 'react-static-container';

if (AppRegistry.setWrapperComponentProvider) {
  AppRegistry.setWrapperComponentProvider(() => {
    return class RootViewWrapper extends Component {
      elements = [];

      componentDidMount() {
        DeviceEventEmitter.addListener('setElement', (id, element, callback) => {
          this.elements.push({ id, element });
          this.forceUpdate(callback);
        });
        DeviceEventEmitter.addListener('removeElement', (id = null, callback) => {
          if (typeof id === 'number') {
            const elements = this.elements
            for (let i = 0, len = elements.length; i < len; i++) {
              if (elements[i].id === id) {
                elements.splice(i, 1);
                break;
              }
            }
          } else {
            this.elements = [];
          }
          this.forceUpdate(callback);
        });
      }

      render() {
        const elements = this.elements.map(obj => obj.element);
        return (
          <View style={{ flex: 1 }}>
            <StaticContainer>
              {this.props.children}
            </StaticContainer>
            {elements}
          </View>
        );
      }
    };
  });
} else {
  const originRegister = AppRegistry.registerComponent;
  AppRegistry.registerComponent = (appKey, componentProvider, section) => {
    const Comp = componentProvider();
    const newComponetProvider = () => {
      return class RootViewWrapper extends Component {
              elements = [];

              componentDidMount() {
                DeviceEventEmitter.addListener('setElement', (id, element, callback) => {
                  this.elements.push({ id, element });
                  this.forceUpdate(callback);
                });
                DeviceEventEmitter.addListener('removeElement', (id = null, callback) => {
                  if (typeof id === 'number') {
                    const elements = this.elements;
                    for (let i = 0, len = elements.length; i < len; i++) {
                      if (elements[i].id === id) {
                        elements.splice(i, 1);
                        break;
                      }
                    }
                  } else {
                    this.elements = [];
                  }
                  this.forceUpdate(callback);
                })
              }

              render() {
                const elements = this.elements.map(obj => obj.element);
                return (
                  <View style={{ flex: 1 }}>
                    <StaticContainer>
                      <Comp {...this.props} />
                    </StaticContainer>
                    {elements}
                  </View>
                );
              }
            };
    }

    return originRegister(appKey, newComponetProvider, section);
  };
}

export default {
  set(element, callback) {
    const id = Date.now();
    DeviceEventEmitter.emit('setElement', id, element, callback);
    return id;
  },

  remove(id, callback) {
    DeviceEventEmitter.emit('removeElement', id, callback);
  },
};
