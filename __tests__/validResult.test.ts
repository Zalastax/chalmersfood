import { validResult, success, fail } from "../food";

describe("validResult", () => {
  const resultWithError = fail("Test", "Some error");

  const resultWithoutError = success("Test", [
    ["Item 1", "Item 2"],
    ["Item 1", "Item 3"],
  ]);

  const result2WithoutError = success("Test 2", [
    ["Different item 1", "Different item 2"],
    ["Different item 3", "Different item 2"],
  ]);

  const result3WithoutError = success("Test 3", [
    ["Item 1", "Item 2"],
    ["Item 1", "Item 3"],
    ["Item 1", "Item 1"],
  ]);

  const resultWithoutErrorNewerDate = success("Test", [
    ["Item 1", "Item 2"],
    ["Item 1", "Item 3"],
  ]);
  resultWithoutErrorNewerDate.date += 3600 * 1000; // 1 hour in the future

  it("returns new result on old result error", () => {
    expect(validResult(resultWithError, resultWithoutError)).toBe(resultWithoutError);
  });

  it("returns new result on new items", () => {
    expect(validResult(resultWithoutError, result2WithoutError)).toBe(result2WithoutError);
    expect(validResult(resultWithoutError, result3WithoutError)).toBe(result3WithoutError);
  });

  it("returns old result on new result error", () => {
    expect(validResult(resultWithoutError, resultWithError)).toBe(resultWithoutError);
  });

  it("returns old result on new result error", () => {
    expect(validResult(resultWithoutError, resultWithError)).toBe(resultWithoutError);
  });

  it("returns old result on new result with same items", () => {
    expect(validResult(resultWithoutError, resultWithoutErrorNewerDate).date)
      .toBe(resultWithoutError.date);
  });
});
