import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const scenesData = [
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

const initialStates = {
    imageLoaded: false,
    scenes: scenesData[0],
};

test("renders app", () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId("app")).toBeTruthy();
});

test("renders empty", () => {
    const { queryByTestId } = render(<App />);

    if (!initialStates.scenes) {
        expect(queryByTestId("render-empty")).toBeTruthy();
    }
});

test("renders scene area", () => {
    const { queryByTestId } = render(<App />);

    if (initialStates.scenes) {
        expect(queryByTestId("scene-area")).toBeInTheDocument();
    }
});

test("renders image scene", () => {
    const { queryByTestId } = render(<App />);

    if (initialStates.scenes.background_url) {
        expect(queryByTestId("scroll-section")).toBeTruthy();
    }
});

test("renders buttons change scene", () => {
    const { queryByTestId } = render(<App />);

    if (
        initialStates.scenes.background_url &&
        initialStates.imageLoaded &&
        initialStates.scenes.hitzones
    ) {
        expect(queryByTestId("btn-change-scene")).toBeTruthy();
    }
});

test("calls onClick change scene when clicked", () => {
    const handleClick = jest.fn();
    render(<App />);
    if (
        initialStates.scenes.background_url &&
        initialStates.imageLoaded &&
        initialStates.scenes.hitzones
    ) {
        fireEvent.click(screen.getByText(/↑/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    }
});

test("renders nav scroll", () => {
    const { queryByTestId } = render(<App />);

    if (initialStates.imageLoaded) {
        expect(queryByTestId("nav-scroll")).toBeTruthy();
    }
});

test("calls onClick scroll image view when clicked", () => {
    const handleClick = jest.fn();
    render(<App />);
    if (initialStates.imageLoaded) {
        fireEvent.click(screen.getByText(/∆/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    }
});
