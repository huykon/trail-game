import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

const scenes = [
    {
        id: 0,
        background_url: "mountain0.jpg",
        hitzones: [{ x: "21%", y: "50%", goto: 1 }],
    },
    {
        id: 1,
        background_url: "mountain1.jpg",
        hitzones: [
            { x: "25%", y: "50%", goto: 2 },
            { x: "60%", y: "81%", goto: 0 },
        ],
    },
];

test("renders learn react link", () => {
    render(<App />);
    /* const linkElement = screen.getByText(/Current scene can not loaded/i);
    expect(linkElement).toBeInTheDocument(); */
    // expect
});
