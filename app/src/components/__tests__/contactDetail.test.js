import { shallow } from "enzyme";
import { Link, BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ContactDetail from "../ContactDetail";

const name = "Test User";
const email = "testuser@mail.com";

const props = {
  location: {
    state: {
      contact: {
        name,
        email,
      }
    },
  },
};

it("should render ContactDetail", () => {
  const wrapper = shallow(<ContactDetail {...props}/>);
  expect(wrapper.find("img").props().src).toEqual("user.jpg");
  expect(wrapper.find(".header").text()).toEqual(name);
  expect(wrapper.find(".description").text()).toEqual(email);
});

it("should have Back button link", () => {
  const wrapper = shallow(<ContactDetail {...props}/>);
  const link = wrapper.find(Link);
  expect(link.props().to).toEqual("/");
  expect(link.children(0).text()).toEqual("Back to Contact List");
});

// Snapshot test
it("should match contactdetail snapshot", () => {
  const snap = renderer.create(
  <BrowserRouter>
  <ContactDetail {...props}/>
  </BrowserRouter>).toJSON();
  expect(snap).toMatchSnapshot();
})


