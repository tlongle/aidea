<<<<<<< HEAD
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: '#0E1C36', // Set the background color for the input toolbar
  },
  messageText: {
    color: '#ffffff', // Set the text color for the chat messages
  },
  messageContainer: {
    // Set the background color for the chat message container
    // You can further customize the padding, border radius, etc. as per your requirements
    backgroundColor: '#AFCBFF',
    borderRadius: 10,
    padding: 10,
  },
  bubbleText: {
    color: 'white', // Set the text color to white
  },
});

const renderInputToolbar = props => {
  return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
};

const renderMessageText = props => {
  return (
    <MessageText
      {...props}
      textStyle={styles.messageText}
    />
  );
};

const renderMessage = props => {
  return (
    <Message
      {...props}
      containerStyle={styles.messageContainer}
    />
  );
};

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#0E1C36', // Modify the background color for user's messages
        },
        left: {
          backgroundColor: '#0E1C36', // Modify the background color for bot's messages
        },
      }}
      textStyle={{
        right: {
          color: '#ffffff', // Modify the text color for user's messages
        },
        left: {
          color: '#ffffff', // Modify the text color for bot's messages
        },
      }}
    />
  );
};


export default styles;
=======
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputToolbar: {
    backgroundColor: '#0E1C36', // Set the background color for the input toolbar
  },
  messageText: {
    color: '#ffffff', // Set the text color for the chat messages
  },
  messageContainer: {
    // Set the background color for the chat message container
    // You can further customize the padding, border radius, etc. as per your requirements
    backgroundColor: '#AFCBFF',
    borderRadius: 10,
    padding: 10,
  },
  bubbleText: {
    color: 'white', // Set the text color to white
  },
});

export default styles;
>>>>>>> db45e07f9a9a06d5e4a102c1ee400020117f212f
