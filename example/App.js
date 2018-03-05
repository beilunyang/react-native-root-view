import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import rootView from 'react-native-root-view';

export default class App extends React.Component {
  num = 0;

  ids = [];

  set = () => {
    const id = rootView.set(<Text>{`View-${this.num}`}</Text>);
    this.ids.push(id);
    this.num++;
  }

  remove = () => {
    if (this.num > 0) {
      rootView.remove(this.ids.pop());
      this.num--;
    }
  }

  removeAll = () => {
    rootView.remove();
    this.num = 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.set} title="创建" />
        <Button onPress={this.remove} title="销毁" />
        <Button onPress={this.removeAll} title="全部销毁" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
