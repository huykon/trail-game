import React, { useState } from "react";
import ScenesData from "./assets/scenes.json";
import "./App.css";

function App() {
    const scenesArray = (ScenesData && ScenesData.scenes) || [];
    const [currentScene, setCurrentScene] = useState(
        scenesArray && scenesArray.length ? scenesArray[0] : null
    );
    const [imageLoaded, setImageLoaded] = useState(false);

    const onChangeScene = (sceneId: Number) => {
        if (scenesArray.find((scene) => scene && scene.id === sceneId)) {
            const foundScene =
                scenesArray.find((scene) => scene && scene.id === sceneId) ||
                null;

            setImageLoaded(false);
            setCurrentScene(foundScene);
        }
    };

    const onScrollImage = (direction: String) => {
        const scrollSection = document.getElementById("scroll-section");
        if (scrollSection) {
            if (direction === "right") {
                scrollSection.scrollLeft += 100;
            } else {
                scrollSection.scrollLeft -= 100;
            }
        }
    };

    const renderJs = () => {
        const slider = document.querySelector(".scroll-section") as HTMLElement;
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        if (slider) {
            slider.addEventListener("mousedown", (event) => {
                const e = event as MouseEvent;
                isDown = true;
                slider.classList.add("active");
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener("mouseleave", () => {
                isDown = false;
                slider.classList.remove("active");
            });
            slider.addEventListener("mouseup", () => {
                isDown = false;
                slider.classList.remove("active");
            });
            slider.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = x - startX;
                slider.scrollLeft = scrollLeft - walk;
            });
        }
    };

    return (
        <div className="App" data-testid="app">
            {currentScene ? (
                <div className="scene-area" data-testid="scene-area">
                    {currentScene.background_url ? (
                        <div
                            className="scroll-section"
                            id="scroll-section"
                            data-testid="scroll-section"
                        >
                            <div className="container-image">
                                <img
                                    src={
                                        require(`./assets/images/${currentScene.background_url}`)
                                            .default
                                    }
                                    alt="Current picture"
                                    onLoad={() => setImageLoaded(true)}
                                />
                                {imageLoaded &&
                                currentScene.hitzones &&
                                currentScene.hitzones.length
                                    ? currentScene.hitzones.map(
                                          (hitZone, idx) => (
                                              <button
                                                  key={idx}
                                                  style={{
                                                      left: hitZone.x,
                                                      top: hitZone.y,
                                                  }}
                                                  onClick={() =>
                                                      onChangeScene(
                                                          hitZone.goto
                                                      )
                                                  }
                                                  data-testid="btn-change-scene"
                                              >
                                                  ↑
                                              </button>
                                          )
                                      )
                                    : null}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {imageLoaded && (
                        <div data-testid="nav-scroll">
                            <button
                                className="nav-control nav-left"
                                onClick={() => onScrollImage("left")}
                            >
                                ∆
                            </button>
                            <button
                                className="nav-control nav-right"
                                onClick={() => onScrollImage("right")}
                            >
                                ∆
                            </button>
                        </div>
                    )}
                    {renderJs()}
                </div>
            ) : (
                <div className="text-center" data-testid="render-empty">
                    Current scene can not loaded
                </div>
            )}
        </div>
    );
}

export default App;
