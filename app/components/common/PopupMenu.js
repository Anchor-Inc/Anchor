import React, { Component, PropTypes } from 'react';
import { UIManager, findNodeHandle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

 class PopupMenu extends Component {
   static propTypes = {
     // array of strings, will be list items of Menu
     actions: PropTypes.arrayOf(PropTypes.string).isRequired,
     onPress: PropTypes.func.isRequired,
   }

    state = {
      icon: null,
    }

    onError = () => {
     this.props.showErrorMessage('Enter error message here'); // TODO: implement error message in PopupMenu
   }

   onPress = () => {
     if (this.state.icon) {
       UIManager.showPopupMenu(
         findNodeHandle(this.state.icon),
         this.props.actions,
         this.onError,
         this.props.onPress,
       );
     }
   }

   onRef = (icon) => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  }

   render() {
     return (
       <TouchableOpacity onPress={this.onPress}>
         <Icon
           name='more-vert'
           size={24}
           color={this.props.color}
           ref={this.onRef}
         />
       </TouchableOpacity>
     );
   }
 }

 export { PopupMenu };
