import React from 'react';
import {View} from 'react-native';

const iconHomeFilled = require('../assets/icons/home-filled-48.svg') as string;
const iconHomeOutlined =
  require('../assets/icons/home-outlined-48.svg') as string;
const iconSettingsFilled =
  require('../assets/icons/settings-filled-48.svg') as string;
const iconSettingsOutlined =
  require('../assets/icons/settings-outlined-48.svg') as string;
const iconScanFilled = require('../assets/icons/scan-filled-48.svg') as string;
const iconScanOutlined =
  require('../assets/icons/scan-outlined-48.svg') as string;

interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}

const NavigationIcon = ({route, isFocused}: NavigationIconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocues: boolean) => {
    switch (route) {
      case 'home':
        return isFocues ? iconHomeFilled : iconHomeOutlined;
      case 'settings':
        return isFocues ? iconSettingsFilled : iconSettingsOutlined;
      case 'scan':
        return isFocues ? iconScanFilled : iconScanOutlined;
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default NavigationIcon;
