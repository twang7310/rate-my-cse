import { GetDefaultRoute } from "./utils";

test('GetDefaultRoute always returns default route name', () => {
    const str1 = GetDefaultRoute();

    expect(str1).toEqual("rate-my-cse");
});