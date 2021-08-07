import { shallow, mount } from "enzyme";
import * as sinon from "sinon";
import AddContact from "../AddContact";

it("should render AddContact page", () => {
  const wrapper = shallow(<AddContact />);
  expect(wrapper.find("h2").text()).toEqual("Add Contact");
  expect(wrapper.find("input").length).toEqual(2);
  expect(wrapper.find("button").text()).toEqual("Add ");
});

it("should be able to set text fields", () => {
  const props = { onchange: sinon.mock() };
  const wrapper = shallow(<AddContact {...props} />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "name", value: "john doe" } });
  expect(wrapper.find('input[name="name"]').props().value).toEqual("john doe");

  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "johndoe@mail.com" },
    });
  expect(wrapper.find('input[name="email"]').props().value).toEqual(
    "johndoe@mail.com"
  );
});

it("should be triger alert when submitted empty", () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const addContactHandlerMock = jest.fn();
  const props = {
    onsubmit: addContactHandlerMock,
  };
  const wrapper = shallow(<AddContact {...props} />);
  jest.spyOn(wrapper.instance(), "add");
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(window.alert).toBeCalledWith("ALl the fields are mandatory!");
});

it("should be able to submit with correct values", () => {
  const submitHandlerMock = jest.fn();
  const addHandlerMock = jest.fn();
  const props = {
    onsubmit: submitHandlerMock,
    addContactHandler: addHandlerMock,
    history: []
  };
  jest.spyOn(props, "addContactHandler").mockImplementation(() => {});
  const wrapper = shallow(<AddContact {...props} />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "name", value: "john doe" } });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "johndoe@mail.com" },
    });

  jest.spyOn(wrapper.instance(), "add");
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(props.addContactHandler).toBeCalledWith({"email": "johndoe@mail.com", "name": "john doe"});
});
