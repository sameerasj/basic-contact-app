import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Header from "../Header";

it("should render header", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find("h2").text()).toEqual("Contact Manager");
});

it("should center header title", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find({ "data-testid": "menu" }).props().className).toContain(
    " center"
  );
});

// Snapshot test
it("should match header snapshot", () => {
  const snap = renderer.create(<Header />).toJSON();
  expect(snap).toMatchSnapshot();
})
