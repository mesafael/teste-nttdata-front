import { render,screen } from "@testing-library/react";
import { SideBar } from "./SideBar"
import { BrowserRouter } from "react-router-dom";

describe("SideBar", () => {

    it("should render corectly", () => {
        render(
        <BrowserRouter>
            <SideBar/>
        </BrowserRouter>
        )

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Produtor")).toBeInTheDocument();
    })
})