// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import { utils } from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import SimplexNoise from "simplex-noise";
import hsl from "hsl-to-hex";
import debounce from "debounce";

const OrbComponent = () => {
  // Suppress console messages
  utils.skipHello();
  PIXI.settings.DEBUG = false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const random = (min, max) => Math.random() * (max - min) + min;
    const map = (n, start1, end1, start2, end2) =>
      ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;

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
          this.lightness
        );
        this.complimentaryColor2 = hsl(
          this.complimentaryHue2,
          this.saturation,
          this.lightness
        );

        // Store color choices
        this.colorChoices = [
          this.baseColor,
          this.complimentaryColor1,
          this.complimentaryColor2,
        ];
      }

      randomColor() {
        return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
          "#",
          "0x"
        );
      }

      setCSSProperties() {
        document.documentElement.style.setProperty("--hue", this.hue);
        document.documentElement.style.setProperty(
          "--hue-complimentary1",
          this.complimentaryHue1
        );
        document.documentElement.style.setProperty(
          "--hue-complimentary2",
          this.complimentaryHue2
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
          this.bounds.y.max / 2
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
      }
    }

    const canvas = document.querySelector(".orb-canvas");
    const isMobile = window.innerWidth < 768;
    const resolution = isMobile ? 1 : window.devicePixelRatio;

    // Create PixiJS application with adaptive resolution
    const app = new PIXI.Application({
      view: canvas,
      resizeTo: window, // Automatically resize to fit the window
      backgroundAlpha: 0.0,
      height: 1600, // Fixed canvas height
      resolution,
    });

    // Create and apply the KawaseBlurFilter with tuned parameters
    const blurAmount = isMobile ? 15 : 25;
    const blurQuality = isMobile ? 4 : 8;
    const blurFilter = new KawaseBlurFilter(blurAmount, blurQuality, true);
    app.stage.filters = [blurFilter];

    // Create color palette
    const colorPalette = new ColorPalette();

    // Create orbs with fewer instances on mobile
    const orbCount = isMobile ? 5 : 10;
    const orbs = [];

    for (let i = 0; i < orbCount; i++) {
      const orb = new Orb(colorPalette.randomColor());
      // Adjust animation speed on mobile
      orb.inc = isMobile ? 0.0015 : 0.002;
      app.stage.addChild(orb.graphics);
      orbs.push(orb);
    }

    // Handle window resize with a single event listener
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    window.addEventListener(
      "resize",
      debounce(() => {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        // Only trigger update if dimensions change significantly (change threshold: 50px)
        if (
          Math.abs(currentWidth - lastWidth) > 50 ||
          Math.abs(currentHeight - lastHeight) > 50
        ) {
          lastWidth = currentWidth;
          lastHeight = currentHeight;
          app.renderer.resize(currentWidth, 1000);
          for (const orb of orbs) {
            orb.bounds = orb.setBounds();
          }
        }
      }, 250)
    );

    // Animation loop
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      app.ticker.add(() => {
        for (const orb of orbs) {
          orb.update();
          orb.render();
        }
      });
    } else {
      for (const orb of orbs) {
        orb.update();
        orb.render();
      }
    }
  }, []);

  return (
    <div
      className="absolute top-0 min-h-[calc(100vh)] w-full overflow-x-hidden lg:blur-3xl"
      data-aos="fade-in"
    >
      <canvas className="orb-canvas" />
    </div>
  );
};

export default OrbComponent;
