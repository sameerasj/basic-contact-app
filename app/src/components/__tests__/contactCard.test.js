import { shallow } from "enzyme";
import { Link, BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ContactCard from "../ContactCard";

const name = "Test User";
const email = "testuser@mail.com";
const id = "abcde2da-a783-4d37-86c5-e619b3503d61";

const deleteHandlerMock = jest.fn();
const props = {
    contact: {
        name,
        email,
        id
      },
      clickHander: deleteHandlerMock
};

it("should render ContactCard", () => {
  const wrapper = shallow(<ContactCard {...props}/>);
  expect(wrapper.find("img").props().src).toEqual("user.png");
  expect(wrapper.find(".header").text()).toEqual(name);
  expect(wrapper.find(".description").text()).toEqual(email);
});

it("should trigger delete", () => {
  const wrapper = shallow(<ContactCard {...props}/>);
  wrapper.find("i").at(0).simulate("click");
  expect(deleteHandlerMock).toBeCalled();
});

// // Snapshot test
// it("should match contactdetail snapshot", () => {
//   const snap = renderer.create(
//   <BrowserRouter>
//   <ContactCard {...props}/>
//   </BrowserRouter>).toJSON();
//   expect(snap).toMatchSnapshot();
// })