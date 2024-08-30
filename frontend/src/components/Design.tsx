import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const Design = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        // console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // await console.log(container);
    }, []);

    return (
        <div>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4, // Slightly more particles on click
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#e50914", // Deadpool red
                        },
                        links: {
                            color: "#888", // white links
                            distance: 120,
                            enable: true,
                            opacity: 0.6,
                            width: 2,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 2, // Faster movement for a more dynamic effect
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000,
                            },
                            value: 60, // More particles for a richer effect
                        },
                        opacity: {
                            value: 0.6, // More opaque particles
                        },
                        shape: {
                            type: "polygon",
                            options: {
                                sides: { count: 5 }, // Five-sided particles to resemble shuriken stars
                            },
                        },
                        size: {
                            value: { min: 3, max: 6 }, // Larger particle size
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};

export default Design;
