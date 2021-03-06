import React, { Component } from 'react';
import {
  Dimensions, Image, ScrollView, TouchableOpacity,
  Text, View, StatusBar, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config';
import { ListDetail, TouchableDebounce, Spinner } from '../../lib';

const { width, height } = Dimensions.get('window');

class TeacherProfile extends Component {
  state = {
    uid: this.props.navigation.state.params.uid,
    teacher: null,
  };

  componentWillMount() {
    this.getTeacher();
  }

  getTeacher() {
    if (!this.state.teacher) {
      return firebase.firestore().collection('teachers').doc(this.state.uid).get()
      .then((teacher) => {
        this.setState({ teacher: teacher.data() });
      });
    } return null;
  }

  completeAction = () => {
    const chat = {
      uid: this.state.uid,
      title: this.state.teacher.displayName,
    };
    this.props.navigation.navigate('Chat', { chat });
  }

  render() {
    if (this.state.teacher) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar />
          <View style={styles.headerContainerStyle}>
            <View style={styles.headerStyle}>
              <TouchableDebounce style={styles.iconStyle} onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-left' size={24} color='white' />
              </TouchableDebounce>
              <Text style={styles.headerTextStyle}>
                {this.state.teacher.displayName}
              </Text>
              <TouchableDebounce style={styles.iconStyle} onPress={() => this.completeAction()}>
                <Icon name="forum" size={24} color='white' />
              </TouchableDebounce>
            </View>
            <View style={styles.profileContainerStyle}>
              <Image source={{ uri: this.state.teacher.photoURL }} style={styles.profileStyle} />
            </View>
          </View>
          <View style={styles.nameContainerStyle}>
            <Text style={styles.nameStyle}>
              {this.state.teacher.subject}
            </Text>
            <StarRating
              disabled
              halftarEnabled
              iconSet='MaterialCommunityIcons'
              emptyStar='star-outline'
              halfStar='star-half'
              fullStarColor='#ffb300'
              emptyStarColor='#ffb300'
              starSize={25}
              rating={this.state.teacher.rating}
            />
          </View>
          <ScrollView>
            <ListDetail
              title="Name"
              value={this.state.teacher.displayName}
            />
            <ListDetail
              title="Subject"
              value={this.state.teacher.subject}
            />
            <ListDetail
              title="Email"
              value={this.state.teacher.email}
            />
            <ListDetail
              title="Phone Number"
              value={`+91 ${this.state.teacher.phone}`}
            />
            <ListDetail
              title="Price"
              value={`\u20b9 ${this.state.teacher.price} Per Class`}
            />
            <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={() => this.props.navigation.navigate('Batches', { teacherName: this.state.teacher.name, teacherUID: this.state.uid })}>
              <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.logoutButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.logoutTextStyle}>
                  See Available Batches
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } return (
      <Spinner title='Loading' />
    );
  }
}
const styles = {
  headerContainerStyle: {
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
  },
  logoutTextStyle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    paddingBottom: 5,
  },
  logoutButtonStyle: {
    width: 0.8 * width,
    height: 50,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: 0.3 * height,
    backgroundColor: colors.primary.normal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    padding: 15,
  },
  headerTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: 'white',
  },
  profileContainerStyle: {
    position: 'absolute',
    top: (height * 0.3) - ((0.27 * width) / 2),
    width: width * 0.26,
    height: width * 0.26,
    backgroundColor: colors.other.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 0.08 * width,
    width: 0.08 * width,
    alignItems: 'center',
  },
  profileStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  nameContainerStyle: {
    paddingTop: 0.12 * width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0.03125 * width,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Medium',
    color: 'black',
    padding: 5,
  },
  classStyle: {
    fontSize: 14,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#909094',
    paddingTop: 8,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(TeacherProfile);
