// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { utils } from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import SimplexNoise from "simplex-noise";
import hsl from "hsl-to-hex";
import debounce from "debounce";

const OrbComponent = () => {
  const appRef = useRef<PIXI.Application | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Suppress console messages
  utils.skipHello();
  PIXI.settings.DEBUG = false;
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = () => {
      const random = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const map = (n, start1, end1, start2, end2) => {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
      };

      // Create a new simplex noise instance
      const simplex = new SimplexNoise();

      class ColorPalette {
        constructor() {
          this.setColors();
          this.setCSSProperties();
        }

        setColors() {
          // Pick a random hue between 230 and 250
          this.hue = ~~random(230, 250);
          this.complimentaryHue1 = this.hue + 30;
          this.complimentaryHue2 = this.hue + 60;
          // Define saturation and lightness
          this.saturation = 95;
          this.lightness = 70;

          // Define base and complimentary colors
          this.baseColor = hsl(this.hue, this.saturation, this.lightness);
          this.complimentaryColor1 = hsl(
            this.complimentaryHue1,
            this.saturation,
            this.lightness,
          );
          this.complimentaryColor2 = hsl(
            this.complimentaryHue2,
            this.saturation,
            this.lightness,
          );

          // Store color choices
          this.colorChoices = [
            this.baseColor,
            this.complimentaryColor1,
            this.complimentaryColor2,
          ];
        }

        randomColor() {
          return this.colorChoices[
            ~~random(0, this.colorChoices.length)
          ].replace("#", "0x");
        }

        setCSSProperties() {
          document.documentElement.style.setProperty("--hue", this.hue);
          document.documentElement.style.setProperty(
            "--hue-complimentary1",
            this.complimentaryHue1,
          );
          document.documentElement.style.setProperty(
            "--hue-complimentary2",
            this.complimentaryHue2,
          );
        }
      }

      // Orb class
      class Orb {
        constructor(fill = 0x000000) {
          // Set initial properties
          this.bounds = this.setBounds();
          this.x = random(this.bounds.x.min, this.bounds.x.max);
          this.y = random(this.bounds.y.min, this.bounds.y.max);
          this.scale = 1;
          this.fill = fill;
          this.radius = random(window.innerHeight / 6, window.innerHeight / 3);
          this.xOff = random(0, 1000);
          this.yOff = random(0, 1000);
          this.inc = 0.002;

          // Create graphics object and set alpha
          this.graphics = new PIXI.Graphics();
          this.graphics.alpha = 0.825;

          // Draw the orb once
          this.graphics.beginFill(this.fill);
          this.graphics.drawCircle(0, 0, this.radius);
          this.graphics.endFill();
        }

        setBounds() {
          const maxDist =
            window.innerWidth < 1000
              ? window.innerWidth / 3
              : window.innerWidth / 5;
          const originX = window.innerWidth / 1.25;
          const originY =
            window.innerWidth < 1000
              ? 1000 // Use fixed height of 1000px
              : 1000 / 1.375; // Adjust accordingly

          return {
            x: {
              min: originX - maxDist,
              max: originX + maxDist,
            },
            y: {
              min: originY - maxDist,
              max: originY + maxDist,
            },
          };
        }

        update() {
          // Generate simplex noise values
          const xNoise = simplex.noise2D(this.xOff, this.xOff);
          const yNoise = simplex.noise2D(this.yOff, this.yOff);
          const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

          // Map noise values to coordinates
          this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
          // Adjust y mapping as per CodePen visual differences
          this.y = map(
            yNoise + 0.6,
            -1,
            1,
            this.bounds.y.min,
            this.bounds.y.max / 2,
          );
          this.scale = map(scaleNoise, -1, 1, 0.5, 1);

          // Increment noise offsets
          this.xOff += this.inc;
          this.yOff += this.inc;
        }

        render() {
          // Update position and scale
          this.graphics.x = this.x;
          this.graphics.y = this.y;
          this.graphics.scale.set(this.scale);
          // No need to clear and redraw the circle
        }
      }

      // Create PIXI app
      const app = new PIXI.Application({
        view: document.querySelector(".orb-canvas") as HTMLCanvasElement,
        resizeTo: window,
        backgroundAlpha: 0, // updated from transparent: true
        height: 1600,
      });
      app.stage.filters = [new KawaseBlurFilter(30, 10, true)];
      appRef.current = app;

      // Create color palette and orbs (same as before)
      const colorPalette = new ColorPalette();
      const orbs = [];
      for (let i = 0; i < 10; i++) {
        const orb = new Orb(colorPalette.randomColor());
        app.stage.addChild(orb.graphics);
        orbs.push(orb);
      }

      window.addEventListener(
        "resize",
        debounce(() => {
          app.renderer.resize(window.innerWidth, 1000);
          for (const orb of orbs) {
            orb.bounds = orb.setBounds();
          }
        }, 250),
      );

      // Animation loop function
      const animate = () => {
        for (const orb of orbs) {
          orb.update();
          orb.render();
        }
      };

      // Pause the ticker if the canvas is not visible using IntersectionObserver
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              app.ticker.add(animate);
            } else {
              app.ticker.stop();
            }
          }
        },
        { threshold: 0.1 },
      );
      observerRef.current.observe(app.view);

      // For users with reduced motion preference, just do one render.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animate();
      }
    };

    // Defer heavy work until the browser is idle.
    if ("requestIdleCallback" in window) {
      (
        window as {
          requestIdleCallback: (
            callback: () => void,
            options?: { timeout: number },
          ) => number;
        }
      ).requestIdleCallback(initAnimation);
    } else {
      setTimeout(initAnimation, 200);
    }

    // Cleanup on unmount
    return () => {
      observerRef.current?.disconnect();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="absolute top-0 min-h-[calc(100vh)] w-full overflow-x-hidden"
      data-aos="fade-in"
    >
      <canvas className="orb-canvas" />
    </div>
  );
};

export default OrbComponent;
