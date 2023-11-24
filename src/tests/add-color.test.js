import { render, screen, fireEvent } from "@testing-library/react"
import AddColor from "./"

describe("A button and an input field are rendered.", function () {
	test("button is rendered", () => {
		render(<AddColor />)
		const button = screen.getByRole("button")

		expect(button).toBeInTheDocument()
	})

	test("input field is rendered", () => {
		render(<AddColor />)
		const inputField = screen.getByTestId("color-input")

		expect(inputField).toBeInTheDocument()
	})
})

describe("Incorrect hexcodes renders an error message containing the input.", function () {
	const onColorArrayChangeMock = jest.fn()

	test("valid submitted hexcode does not render an error message", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(onColorArrayChangeMock).toHaveBeenCalledTimes(1)
		expect(message).not.toBeInTheDocument()
	})

	test("submitted hexcode of wrong length does not update the array and shows the error message", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const tooShortHexColor = "123"

		fireEvent.change(inputField, { target: { value: tooShortHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(onColorArrayChangeMock).toHaveBeenCalledTimes(0)
		expect(message).toBeInTheDocument()
	})

	test("invalid submitted hexcode does not update the array and shows the error message", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const invalidHexColor = "xxxxxx"

		fireEvent.change(inputField, { target: { value: invalidHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(onColorArrayChangeMock).toHaveBeenCalledTimes(0)
		expect(message).toBeInTheDocument()
	})
})

describe("Not valid input renders an error message element with the input", function () {
	const onColorArrayChangeMock = jest.fn()

	test("valid submitted hexcode does not show the error message", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(message).not.toBeInTheDocument()
	})

	test("invalid submitted hexcode renders an error message", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const invalidHexColor = "zzzzzz"

		fireEvent.change(inputField, { target: { value: invalidHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(message).toBeInTheDocument()
	})

	test("that error message text contains the input", () => {
		render(<AddColor onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const invalidHexColor = "yyyyyy"

		fireEvent.change(inputField, { target: { value: invalidHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const message = screen.queryByTestId("error-message")
		expect(message).toHaveTextContent(invalidHexColor)
	})
})