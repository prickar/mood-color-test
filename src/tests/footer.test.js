import { render, screen } from "@testing-library/react"
import Footer from "./"

describe("The footer is rendered and contains a link and the correct email address.", () => {
	test("renders a link element", () => {
		render(<Footer />)
		const link = screen.getByRole("link")
		expect(link).toBeInTheDocument()
	})

	test("renders the correct email address on the footer", () => {
		render(<Footer />)
		const email = screen.getByText(/info@moodcolor.com/i)
		expect(email).toBeInTheDocument()
	})
})