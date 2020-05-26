import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Test from '../Test'
describe('App', () => {

    const wrapper = shallow(<Test />);
    const instance = wrapper.instance();   
     instance.func1()
     it('test',()=>{
        
          expect(instance.func1()).toEqual(54);   
    
    
         })
});