import { render, screen, fireEvent } from "@testing-library/react"
import App from "./App"
import { Color } from "./constants"

describe("Renders all components, Header, ListItems, AddColor and Footer.", function () {
	test("renders Header component", () => {
		render(<App />)
		const headerComponent = screen.getByTestId("header-component")
		expect(headerComponent).toBeInTheDocument()
	})

	test("renders ListItems component", () => {
		render(<App />)
		const listItemsComponent = screen.getByTestId("color-container")
		expect(listItemsComponent).toBeInTheDocument()
	})

	test("renders AddColor component", () => {
		render(<App />)
		const addColorComponent = screen.getByRole("form")
		expect(addColorComponent).toBeInTheDocument()
	})

	test("renders Footer component", () => {
		render(<App />)
		const footerComponent = screen.getByTestId("footer-component")
		expect(footerComponent).toBeInTheDocument()
	})
})

describe("Submitting a correct hexcode adds that color to the color array and renders that color, invalid hexcode shows error message.", () => {
	// const onColorArrayChangeMock = jest.fn()

	test("invalid submitted hexcode does not add a color to the color array and shows error message", () => {
		render(<App />)
		const inputField = screen.getByRole("textbox")
		const invalidHexColor = "xxxxxx"

		fireEvent.change(inputField, { target: { value: invalidHexColor } })
		fireEvent.submit(screen.getByRole("form"))

		const array = screen.queryAllByTestId("color-item")
		expect(array).toHaveLength(Color.length)

		const errorMessage = screen.queryByTestId("error-message")
		expect(errorMessage).toBeInTheDocument()
	})

	test("valid submitted hexcode adds a color to the color array and does not show error message", () => {
		render(<App />)
		const inputField = screen.getByRole("textbox")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByRole("form"))

		const array = screen.queryAllByTestId("color-item")
		expect(array).toHaveLength(Color.length + 1)

		const errorMessage = screen.queryByTestId("error-message")
		expect(errorMessage).not.toBeInTheDocument()
	})

	test("valid submitted hexcode adds that color to the color array as 'My Color 1' and renders that color", () => {
		render(<App />)
		const inputField = screen.getByRole("textbox")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByRole("form"))

		const colorBox = screen.getByTestId("color-box-My Color 1")
		const colorId = screen.getByText("My Color 1")

		expect(colorId).toBeInTheDocument()
		expect(colorBox).toHaveStyle(`background-color: #${validHexColor}`)
	})
})