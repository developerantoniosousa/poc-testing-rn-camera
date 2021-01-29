import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import PhotoCamera from '../App';

describe('PhotoCamera Tests', () => {
  test('renders correctly', () => {
    const { toJSON } = render(<PhotoCamera />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('initial state should be back camera', () => {
    const wrapper = renderer.create(<PhotoCamera />);
    expect(wrapper.getInstance().state.type).toBe(RNCamera.Constants.Type.back);
  });

  test('should flip the camera from back to front', () => {
    const wrapper = renderer.create(<PhotoCamera />);
    const intance = wrapper.getInstance();
    expect(intance.state.type).toBe(RNCamera.Constants.Type.back);
    wrapper.root.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(intance.state.type).toBe(RNCamera.Constants.Type.front);
  });

  test('should flip the camera from front to back if touch flip button and curren state is ', () => {
    const wrapper = renderer.create(
      <PhotoCamera type={RNCamera.Constants.Type.front} />,
    );
    wrapper.root.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(wrapper.getInstance().state.type).toBe(RNCamera.Constants.Type.back);
  });

  test('should have a reference to the React Native Camera module', () => {
    const wrapper = renderer.create(<PhotoCamera />);
    expect(wrapper.root.instance.camera).toBeDefined();
    expect(wrapper.root.instance.camera).not.toBeNull();
  });

  test('test onPress functionality', async () => {
    const onTakePhotoEvent = jest.fn((data) => data);
    const wrapper = render(<PhotoCamera onTakePhoto={onTakePhotoEvent} />);
    fireEvent.press(wrapper.getByTestId('take-photo-button'));
    await waitFor(() => expect(onTakePhotoEvent.mock.calls.length).toBe(1));
  });
});
