import { render, screen } from "@testing-library/react"
import Header from "./"

describe("Renders title and sub title on the header component.", () => {
	test("renders page title", () => {
		render(<Header title="Mood Color" />)
		const pageTitle = screen.getByRole("heading", { level: 1 })
		expect(pageTitle).toBeInTheDocument()
	})

	test("renders sub-title", () => {
		render(<Header title="Mood Color" />)
		const subTitle = screen.getByRole("heading", { level: 2 })
		expect(subTitle).toBeInTheDocument()
	})
})