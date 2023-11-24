import { render, screen } from "@testing-library/react"
import ListItems from "."
import { Color } from "../../constants"

describe("ListItems component is rendered and maps out an array.", () => {
	test("renders color container element", () => {
		render(<ListItems />)
		const colorContainer = screen.getByTestId("color-container")

		expect(colorContainer).toBeInTheDocument()
	})

	test("maps out an array when one is provided", () => {
		render(<ListItems colorArray={Color} />)

		const colorItems = screen.getAllByTestId("color-item")
		expect(colorItems.length).toBe(5)
	})

	test("renders all colors from the provided array", () => {
		render(<ListItems colorArray={Color} />)

		Color.forEach((colorObj) => {
			const colorBox = screen.getByTestId(`color-box-${colorObj.id}`)
			expect(colorBox).toBeInTheDocument()
		})
	})

	test("renders the correct number of colors from the array", () => {
		render(<ListItems colorArray={Color} />)
		const colorItems = screen.getAllByTestId("color-item")
		expect(colorItems).toHaveLength(Color.length)
	})
})