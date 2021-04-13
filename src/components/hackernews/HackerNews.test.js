import { render, screen } from '@testing-library/react';
import { shallow } from "enzyme";
import HackerNews from './HackerNews';

it('renders Hacker news header', () => {
    render(<HackerNews />);
    const linkElement = screen.getByText(/Hacker News/i);
    expect(linkElement).toBeInTheDocument();
});

beforeAll(() => {
    // global.fetch = jest.fn();
    window.fetch = jest.fn(); //if running browser environment
});

let wrapper;
beforeEach(() => {
    wrapper = shallow(<HackerNews />, { disableLifecycleMethods: true });
});
afterEach(() => {
    wrapper.unmount();
});

it("must render a loading span before api call success", () => {
    
    expect(wrapper.find("section.cards").exists()).toBeTruthy();
    expect(wrapper.debug()).toMatchSnapshot();
    const spyDidMount = jest.spyOn(HackerNews.prototype, "componentDidMount");

    fetch.mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve({
                    "id": 26781052,
                    "title": "How People Get Rich Now"
                });
            }
        });
    });
    const didMount = wrapper.instance().componentDidMount();
    // expecting componentDidMount have been called
    expect(spyDidMount).toHaveBeenCalled();
    
    didMount.then(() => {
        // updating the wrapper
        wrapper.update();
        expect(wrapper.find("div.card-content").text()).toContain("How People Get Rich Now");
        spyDidMount.mockRestore();
        fetch.mockClear();
        done();
    });
});