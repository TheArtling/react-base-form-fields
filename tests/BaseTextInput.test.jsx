import React from "react";
import { BaseTextInput } from "../src/BaseTextInput";
import { shallow } from 'enzyme';


describe('BaseTextInput.componentWillReceiveProps', () => {
  it('Should update state when valueInitial prop changes', () => {
    const component = shallow(
      <BaseTextInput name="bla" type="text" valueInitial="bla" />
    );
    component.setProps({valueInitial: "new"})
    expect(component.prop('value')).toBe("new")
  })
})


describe('BaseTextInput.getValue', () => {
  const comp = new BaseTextInput({})
  it('Should return just the value if the type is `text`', () => {
    const result = comp.getValue("text", "bla")
    expect(result).toBe("bla")
  })

  it('Should return `null` if type is `number` and value is `""`', () => {
    const result = comp.getValue("number", "")
    expect(result).toBe(null)
  })
})


describe('BaseTextInput.getDisplayValue', () => {
  const comp = new BaseTextInput({})
  it('Should return `""` if value is null or undefined', () => {
    let result = comp.getDisplayValue(null)
    expect(result).toBe("")
    result = comp.getDisplayValue(undefined)
    expect(result).toBe("")
  })
})


describe('BaseTextInput.handleChange', () => {
  it('Should update state user input changes', () => {
    const component = shallow(
      <BaseTextInput name="bla" type="text" valueInitial="bla" />
    );
    component.find('input').simulate('change', {target: {value: 'new'}})
    expect(component.prop('value')).toBe("new")
  })
})
