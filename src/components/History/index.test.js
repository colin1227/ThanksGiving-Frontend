import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { History } from './index';
import App from '../../App'
import { MemoryRouter, Route, browserHistory } from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()})

describe('History',()=>{
    it("should define salaray",()=>{
        const wrapper = shallow(
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Route path="/" render={() => <App/>} />
          </MemoryRouter>
        );
    })
})