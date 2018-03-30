import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { ClassesStack } from '../../navigation/Router';

class Main extends Component {
  componentWillMount() {
    const user = this.props.user;
    if (!this.props.donePref) {
      if (AsyncStorage.getItem('userType') === 'student') {
        this.props.navigation.navigate('ProfileEditing');
      } else {
        this.props.navigation.navigate('TeacherSetup');
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ClassesStack />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  return { donePref };
};

export default connect(mapStateToProps)(Main);
