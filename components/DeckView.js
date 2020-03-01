import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Deck from './Deck'
import SubmitButton from './SubmitButton'
import ActionButton from './ActionButton'
import { gray, textGray, purple, white, red } from '../utils/colors'
import { connect } from 'react-redux'
import { removeDeck } from '../actions/index'
import { removeDeckAS } from '../utils/api'
import { NavigationActions } from 'react-navigation'

export class DeckView extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
    deck: PropTypes.object
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = id => {
    const { removeDeck, navigation } = this.props;

    removeDeck(id);
    removeDeckAS(id);

    navigation.goBack(null);
  };
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <SubmitButton
            btnStyle={{ backgroundColor: white, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() =>
              this.props.navigation.navigate('AddCard', { title: deck.title })
            }
          >
            Add Card
          </SubmitButton>
          <SubmitButton
            btnStyle={{ backgroundColor: purple, borderColor: white }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate('QuizList', { title: deck.title })
            }
          >
            Start Quiz
          </SubmitButton>
        </View>
        <SubmitButton
          btnStyle={{ backgroundColor: red, borderColor: white }}
          txtStyle={{ color: white }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </SubmitButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { removeDeck }
)(DeckView);