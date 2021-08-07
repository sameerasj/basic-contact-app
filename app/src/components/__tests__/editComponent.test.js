import { shallow, mount } from "enzyme";
import * as sinon from "sinon";
import EditComponent from "../EditComponent";

const name = "Test User";
const email = "testuser@mail.com";
const id = "abcde2da-a783-4d37-86c5-e619b3503d61";

const submitHandlerMock = jest.fn();
const updateHandlerMock = jest.fn();

const props = {
  location: {
    state: {
      contact: {
        name,
        email,
        id,
      },
    },
  },
  onsubmit: submitHandlerMock,
  updateContactHandler: updateHandlerMock,
  history: [],
};

it("should render editComponent page", () => {
  const wrapper = shallow(<EditComponent {...props} />);
  expect(wrapper.find("h2").text()).toEqual("Add Contact");
  expect(wrapper.find("input").length).toEqual(2);
  expect(wrapper.find("button").text()).toEqual("Update ");
});

it("should be able to set text fields", () => {
  props.onchange = sinon.mock();
  const wrapper = shallow(<EditComponent {...props} />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "name", value: "will smith" } });
  expect(wrapper.find('input[name="name"]').props().value).toEqual(
    "will smith"
  );

  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "willsmith@mail.com" },
    });
  expect(wrapper.find('input[name="email"]').props().value).toEqual(
    "willsmith@mail.com"
  );
});

it("should be triger alert when submitted empty", () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const wrapper = shallow(<EditComponent {...props} />);

  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "name", value: "" } });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "" },
    });

  jest.spyOn(wrapper.instance(), "update");
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(window.alert).toBeCalledWith("ALl the fields are mandatory!");
});

it("should be able to submit with correct values", () => {
  jest.spyOn(props, "updateContactHandler").mockImplementation(() => {});
  const wrapper = shallow(<EditComponent {...props} />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "name", value: "Updated User" } });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "updateduser@mail.com" },
    });

  jest.spyOn(wrapper.instance(), "update");
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(props.updateContactHandler).toBeCalledWith({"id": "abcde2da-a783-4d37-86c5-e619b3503d61", "email": "updateduser@mail.com", "name": "Updated User"});
});
