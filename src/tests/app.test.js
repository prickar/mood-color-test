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
		const addColorComponent = screen.getByTestId("add-color-component")
		expect(addColorComponent).toBeInTheDocument()
	})

	test("renders Footer component", () => {
		render(<App />)
		const footerComponent = screen.getByTestId("footer-component")
		expect(footerComponent).toBeInTheDocument()
	})
})

describe("Submitting a correct hexcode adds that color to the color array and renders that color.", () => {
	const onColorArrayChangeMock = jest.fn()

	test("invalid submitted hexcode does not add a color to the color array", () => {
		render(<App onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const invalidHexColor = "xxxxxx"

		fireEvent.change(inputField, { target: { value: invalidHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const array = screen.queryAllByTestId("color-item")
		expect(array).toHaveLength(Color.length)
	})

	test("valid submitted hexcode adds a color to the color array", () => {
		render(<App onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const array = screen.queryAllByTestId("color-item")
		expect(array).toHaveLength(Color.length + 1)
	})

	test("valid submitted hexcode adds that color to the color array as 'My Color 1' and renders that color", () => {
		render(<App onColorArrayChange={onColorArrayChangeMock} />)
		const inputField = screen.getByTestId("color-input")
		const validHexColor = "1a2b3c"

		fireEvent.change(inputField, { target: { value: validHexColor } })
		fireEvent.submit(screen.getByTestId("add-color-component"))

		const colorBox = screen.getByTestId(`color-box-My Color 1`)
		const colorId = screen.getByText("My Color 1")

		expect(colorId).toBeInTheDocument()
		expect(colorBox).toHaveStyle({ backgroundColor: `#${validHexColor}` })
	})
})