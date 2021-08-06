import { shallow, mount } from "enzyme";
import * as sinon from "sinon";
import AddContact from "../AddContact";

it("should render AddContact page", () => {
  const wrapper = shallow(<AddContact />);
  expect(wrapper.find("h2").text()).toEqual("Add Contact");
  expect(wrapper.find("input").length).toEqual(2);
  expect(wrapper.find("button").text()).toEqual("Add ");
});

it("should set state on change", () => {
    const props = { onchange: sinon.mock()}
    const wrapper = shallow(<AddContact {...props}/>);
    wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { name: 'name', value: 'john doe' } });
    expect(props.onChange).toHaveBeenCalledWith(1);
});
