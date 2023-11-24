import { render, screen } from "@testing-library/react"
import ErrorMessage from "./"

describe("An error message is rendered and also contains the input.", function () {
	test("that error message is rendered", () => {
		const inputProp = "xxxxxx"

		render(<ErrorMessage input={inputProp} />)
		const errorMessage = screen.queryByTestId("error-message")

		expect(errorMessage).toBeInTheDocument()
	})

	test("that input is in the text of the error message", () => {
		const inputProp = "zzzzzz"

		render(<ErrorMessage input={inputProp} />)
		const errorMessage = screen.queryByTestId("error-message")

		expect(errorMessage).toHaveTextContent(inputProp)
	})
})