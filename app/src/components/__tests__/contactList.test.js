import { shallow, mount } from "enzyme";
import * as sinon from "sinon";
import ContactList from "../ContactList";

const props = {
    contacts: [
      {
        id: "b60fb2da-a783-4d37-86c5-e619b3503d61",
        name: "Akshaya Gupta",
        email: "GUPTA.AKKI23@GMAIL.COM"
      },
      {
        id: "88cb5e5b-9d59-4871-b5ea-f6fdfa8c3725",
        name: "sss",
        email: "GUPTA.AKKI23@GMAIL.COM"
      },
      {
        id: "d535a4e8-bd0d-47eb-a3b6-606608980c16",
        name: "sss",
        email: "GUPTA.AKKI23@GMAIL.COM"
      }
    ]
  }

it("should render ContactList page", () => {
  const wrapper = shallow(<ContactList {...props}/>);
  expect(wrapper.find("h2").text()).toContain("Contact List");
  expect(wrapper.find("input").props().placeholder).toEqual("Search Contacts");
  expect(wrapper.find("button").text()).toEqual(" Add Contact");
});
