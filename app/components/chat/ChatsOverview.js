import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import firebase from 'react-native-firebase';

import { ChatDetail, NewChatButton } from './';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  state={
    chats: [
      {
        displayName: 'Nick Turner',
        imageURL: 'https://cdn.dribbble.com/users/617797/avatars/normal/8d75f923578725de830d0f7ae41baa7d.jpg?1517246732',
        unread: true,
        lastTimestamp: '8:55 PM',
        lastMessage: "This is the best app that I've ever used in my life",
      }, {
        displayName: 'Daniel Specter',
        imageURL: 'https://cdn.dribbble.com/users/1392339/avatars/normal/895b232d3de6e33a5707c313397ec9ba.jpg?1509705769',
        unread: false,
        lastTimestamp: '7:25 PM',
        lastMessage: 'This app is amazing!!',
      }, {
        displayName: 'Ted Wolfe',
        imageURL: 'https://cdn.dribbble.com/users/108183/avatars/normal/1cdafba45e41c543c19c9f43b86cd2c7.jpg?1501240798',
        unread: false,
        lastTimestamp: '11:55 AM',
        lastMessage: 'Great job on the app! Works very well. Keep it up!!',
      },
    ],
  };

  navigateChatScreen = (chat) => {
    this.props.navigation.navigate('Chat', { chat });
  }

  renderChats = () => {
    return this.state.chats.map((chat) => {
      return <ChatDetail onPress={() => this.navigateChatScreen(chat)} displayName={chat.displayName} unread={chat.unread} imageURL={chat.imageURL} lastTimestamp={chat.lastTimestamp} lastMessage={chat.lastMessage} />;
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', width, height }}>
        <Header title='Chats' />
        <ScrollView>
          {this.renderChats()}
        </ScrollView>
        <NewChatButton icon='plus' />
      </View>
    );
  }

}


const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(ChatsOverview);