/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      SignIn: {
        screens: {
          SignInScreen: 'SignInScreen',
        },
      },
      Root: {
        screens: {
          Dashboard: {
            screens: {
              DashboardScreen: 'Dashboard',
            },
          },
          Scheduler: {
            screens: {
              SchedulerScreen: 'Scheduler',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
