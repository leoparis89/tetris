import React from 'react';
import {shallow, configure} from 'enzyme';
import Screen from './Screen';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

test('Screen should display the right amount of blocks', () => {
  const wrapper = shallow(<Screen />);

  const board = [
    [1,0,1,0],
    [1,0,0,1],
    [1,0,2,1]
  ];

  wrapper.setProps({board});
  expect(wrapper.find('span.block').length).toEqual(12);
  expect(wrapper.find('span.block.block__color--1').length).toEqual(6);
  expect(wrapper.find('span.block.block__color--2').length).toEqual(1);
});

test('Screen should add delete class to the blocks in deletion', () => {
  const wrapper = shallow(<Screen />);

  const board = [
    [1,0,1,0],
    [1,0,0,1],
    [1,1,2,1]
  ];

  wrapper.setProps({board});
  expect(wrapper.find('.block--delete').length).toEqual(4);
});

