import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow, mount } from 'enzyme';
import PhotoCamera from '../App';

// Ignore React Web errors when using React Native
// but still show relevant errors
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser)|is using incorrect casing|Received `true` for a non-boolean attribute `enabled`/;
const realConsoleError = console.error; // eslint-disable-line
// eslint-disable-next-line
console.error = message => {
  if (message.match(suppressedErrors)) {
    return;
  }
  realConsoleError(message);
};

describe('PhotoCamera Tests', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<PhotoCamera />);
    expect(wrapper).toMatchSnapshot();
  });
  test('initial state should be back camera', () => {
    const wrapper = shallow(<PhotoCamera />);
    expect(wrapper.state().type).toBe('back');
  });
  test('should flip the camera from back to front', () => {
    const wrapper = shallow(<PhotoCamera />);
    expect(wrapper.state().type).toBe('back');
    wrapper.find(TouchableOpacity).first().props().onPress();
    expect(wrapper.state().type).toBe('front');
  });

  test('should flip the camera from front to back if touch flip button and current state is front', () => {
    const wrapper = shallow(<PhotoCamera />);
    wrapper.setState({
      type: 'front',
    });
    wrapper.update();
    wrapper.find(TouchableOpacity).first().props().onPress();
    expect(wrapper.state().type).toBe('back');
  });

  test.skip('should have a reference to the React Native Camera module', () => {
    const wrapper = mount(<PhotoCamera />);
    expect(wrapper.instance().camera).toBeDefined();
  });

  test.skip('test onPress functionality', async () => {
    const onTakePhotoEvent = jest.fn((data) => data);
    const wrapper = mount(<PhotoCamera onTakePhoto={onTakePhotoEvent} />);
    await wrapper.find(TouchableOpacity).at(1).props().onPress();
    expect(onTakePhotoEvent.mock.calls.length).toBe(1);
  });
});
