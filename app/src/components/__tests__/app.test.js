import { shallow } from "enzyme";
import App from "../App";
import Header from "../Header";

it("should render App page and header", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Header).length).toEqual(1);
});
