import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { logoutUser } from '../../actions';
import { Header } from '../header';
import { Card, CardSection } from '../../lib';
import { colors } from '../../config';

const { width } = Dimensions.get('window');

class Settings extends Component {
  state = {
    switchValue: false,
  };

  render() {
    return (
      <View>
        <Header title='Settings' />
        <Card>
          <CardSection>
            <Text style={styles.cardHeaderStyle}>
              Notification Settings
            </Text>
          </CardSection>
          <CardSection>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.settingTitleStyle}>
                  Chat Notification
                </Text>
                <Text style={styles.settingInfoStyle}>
                  Receive notfications for incoming chat messages
                </Text>
              </View>
              <Switch />
            </View>
            <View style={{ paddingLeft: 15 }}>
              <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
            </View>
          </CardSection>
          <CardSection>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.settingTitleStyle}>
                  Class Notification
                </Text>
                <Text style={styles.settingInfoStyle}>
                  Receive notfications for upcoming classes
                </Text>
              </View>
              <Switch />
            </View>
            <View style={{ paddingLeft: 50 }}>
              <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
            </View>
          </CardSection>
        </Card>
        <View style={{ height: 20 }} />
        <Card>
          <CardSection>
            <Text style={styles.cardHeaderStyle}>
              Support
            </Text>
          </CardSection>
          <CardSection>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.settingTitleStyle}>
                    Contact Us
                  </Text>
                  <Text style={styles.settingInfoStyle}>
                    learnwithanchor@gmail.com
                  </Text>
                </View>
                <Icon style={{ padding: 15 }} name='arrow-top-right' size={24} />
              </View>
              <View style={{ paddingLeft: 15 }}>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.settingTitleStyle}>
                    Help
                  </Text>
                  <Text style={styles.settingInfoStyle}>
                    Need any help? We got your back
                  </Text>
                </View>
                <Icon style={{ padding: 15 }} name='headset' size={24} />
              </View>
              <View style={{ paddingLeft: 15 }}>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </TouchableOpacity>
          </CardSection>
        </Card>
        <View style={{ height: 20 }} />
        <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.props.logoutUser.bind(this)}>
          <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.logoutButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.logoutTextStyle}>
              Logout
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  logoutTextStyle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'avenir_heavy',
    paddingBottom: 5,
  },
  logoutButtonStyle: {
    width: 0.96 * width,
    height: 55,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderStyle: {
    padding: 15,
    fontFamily: 'avenir_heavy',
    fontSize: 17,
    color: 'black',
  },
  settingTitleStyle: {
    color: 'black',
    padding: 15,
    paddingBottom: 5,
    fontFamily: 'avenir_medium',
    fontSize: 14,
  },
  settingInfoStyle: {
    paddingTop: 0,
    padding: 15,
    fontSize: 12,
  },
};

export default connect(null, { logoutUser })(Settings);
