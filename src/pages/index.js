import React, { useEffect } from 'react'
import Layout from '../layout'

import '../css/home.css'


export default function Index() {

  useEffect(() => {
   const width =  window.innerWidth || document.body.clientWidth;
    var Particle = function (parent) {
      this.canvas = parent.canvas;
      this.ctx = parent.ctx;

      this.x = this.canvas.width / 2 + Math.random() * this.canvas.width / 2;
      this.y = Math.random() * this.canvas.height / 2;
      this.velocity = {
        x: (Math.random() - 0.5),
        y: (Math.random() - 0.5)
      };
    };
    Particle.prototype.update = function () {

      // Change dir if outside map
      if (this.x > this.canvas.width + 20 || this.x < (this.canvas.width / 2 - 20)) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y > this.canvas.height / 2 + 20 || this.y < -20) {
        this.velocity.y = -this.velocity.y;
      }

      // Update position
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    };
    Particle.prototype.draw = function () {

      // Draw particle
      this.ctx.beginPath();
      this.ctx.fillStyle = '#666'
      this.ctx.globalAlpha = 0.7;
      this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
      this.ctx.fill();
    };

    // Create ParticleNetwork class
    var ParticleNetwork = function (canvas) {

      this.canvasDiv = canvas;
      this.canvasDiv.size = {
        'width': this.canvasDiv.offsetWidth,
        'height': this.canvasDiv.offsetHeight
      };

      // Set options
      this.options = {
        density: 15000
      };

      this.init();
    };
    ParticleNetwork.prototype.init = function () {
      // Create background div
      this.bgDiv = document.createElement('div');
      this.canvasDiv.appendChild(this.bgDiv);
      this.setStyles(this.bgDiv, {
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'bottom': 0,
        'right': 0,
        'z-index': 1
      });


      // Create canvas & context
      this.canvas = document.createElement('canvas');
      this.canvasDiv.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.canvasDiv.size.width;
      this.canvas.height = this.canvasDiv.size.height;
      this.setStyles(this.canvasDiv, { 'position': 'fixed' });
      this.setStyles(this.canvas, {
        'z-index': '20',
        'position': 'relative'
      });

      // Add resize listener to canvas
      window.addEventListener('resize', function () {

        // Check if div has changed size
        if (this.canvasDiv.offsetWidth === this.canvasDiv.size.width && this.canvasDiv.offsetHeight === this.canvasDiv.size.height) {
          return false;
        }

        // Scale canvas
        this.canvas.width = this.canvasDiv.size.width = this.canvasDiv.offsetWidth;
        this.canvas.height = this.canvasDiv.size.height = this.canvasDiv.offsetHeight;

        // Set timeout to wait until end of resize event
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(function () {

          // Reset particles
          this.particles = [];
          for (var i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
            this.particles.push(new Particle(this));
          }
          this.particles.push(this.mouseParticle);

          // Update canvas
          requestAnimationFrame(this.update.bind(this));

        }.bind(this), 500);

      }.bind(this));

      // Initialise particles
      this.particles = [];
      for (var i = 0; i < this.canvas.width * this.canvas.height / this.options.density; i++) {
        this.particles.push(new Particle(this));
      }

      // Add mouse particle if interactive
      this.mouseParticle = new Particle(this);
      this.mouseParticle.velocity = {
        x: 0,
        y: 0
      };
      this.particles.push(this.mouseParticle);

      // Mouse event listeners
      document.addEventListener('mousemove', function (e) {
        this.mouseParticle.x = e.clientX - this.canvas.offsetLeft;
        this.mouseParticle.y = e.clientY - this.canvas.offsetTop;
      }.bind(this));

      document.addEventListener('mouseup', function (e) {
        this.mouseParticle.velocity = {
          x: (Math.random() - 0.5) * this.options.velocity,
          y: (Math.random() - 0.5) * this.options.velocity
        };
        this.mouseParticle = new Particle(this);
        this.mouseParticle.velocity = {
          x: 0,
          y: 0
        };
        this.particles.push(this.mouseParticle);
      }.bind(this));
    
      // Update canvas
      requestAnimationFrame(this.update.bind(this));
    }
    ParticleNetwork.prototype.update = function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1;

      // Draw particles
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        this.particles[i].draw();

        // Draw connections
        for (var j = this.particles.length - 1; j > i; j--) {
          var distance = Math.sqrt(
            Math.pow(this.particles[i].x - this.particles[j].x, 2)
            + Math.pow(this.particles[i].y - this.particles[j].y, 2)
          );
          if (distance > 160 || distance < 30) {
            continue;
          }

          this.ctx.beginPath();
          this.ctx.strokeStyle = '#666';
          this.ctx.globalAlpha = (160 - distance) / 500;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }

      if (this.options.velocity !== 0) {
        requestAnimationFrame(this.update.bind(this));
      }
    };
    // Helper method to set multiple styles
    ParticleNetwork.prototype.setStyles = function (div, styles) {
      for (var property in styles) {
        div.style[property] = styles[property];
      }
    }
    if(width > 900){
      var canvasDiv = document.getElementById('particle-canvas');
      new ParticleNetwork(canvasDiv);
    }

  });

  return (
    <Layout>
      <div className="home">
        <div></div>
        <div className="header">
          <p class="glitch" data-text="Expertise that Converts">Expertise that Converts</p>
          <h1 >Design from Good to Great</h1>
        </div>
      </div>
    </Layout>
  )
}
