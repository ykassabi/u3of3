import React from 'react'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'
import * as Icon from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import AddCard from '../components/AddCard'
import AddDeck from '../components/AddDeck'
import DeckView from '../components/DeckView'
import DeckList from '../components/DeckList'
import Settings from '../components/Settings'
import QuizList from '../components/QuizList'
import { lightPurp, orange, white } from '../utils/colors'

const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={isIOS ? 'ios-browsers' : 'md-albums' }
          size={28}
          color={tintColor}
        />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={isIOS ? 'ios-add' : 'md-add-circle'}
          size={28}
          color={tintColor}
        />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={isIOS ? 'ios-cog' : 'md-cog'}
          size={28}
          color={tintColor}
        />
      )
    }
  }
};

routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.AddDeck.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.Settings.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

const tabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? orange : white,
    inactiveTintColor: Platform.OS === 'ios' ? orange : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : orange,
      shadowColor: 'rgba(0,0,0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    showIcon: true
  }
};

const Tabs = isIOS
  ? createBottomTabNavigator(routeConfigs, tabNavigatorConfig)
  : createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: lightPurp
        },
        title: 'Deck View'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: lightPurp
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Add Card'
      }
    },
    QuizList: {
      screen: QuizList,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: lightPurp
        },
        title: 'QuizList'
      }
    }
  },
  { headerLayoutPreset: 'center' }
);

export default MainNavigator;