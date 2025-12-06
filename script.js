document.addEventListener("DOMContentLoaded", () => {
  // Create shooting stars
  createShootingStars()

  // Create additional stars dynamically
  createStars()

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Add mobile menu styles dynamically
      if (!document.getElementById("mobile-menu-styles")) {
        const style = document.createElement("style")
        style.id = "mobile-menu-styles"
        style.textContent = `
                    .nav-links.active {
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: rgba(10, 10, 26, 0.95);
                        backdrop-filter: blur(10px);
                        padding: 1rem;
                        z-index: 1000;
                        border-bottom: 1px solid var(--border-color);
                    }
                    
                    .nav-links.active li {
                        margin: 1rem 0;
                    }
                `
        document.head.appendChild(style)
      }
    })
  }

  // Function to create shooting stars
  function createShootingStars() {
    const shootingStarsContainer = document.querySelector(".shooting-stars")

    if (!shootingStarsContainer) {
      console.error("Shooting stars container not found")
      return
    }

    // Create 20 shooting stars initially
    for (let i = 0; i < 20; i++) {
      createShootingStar(shootingStarsContainer)
    }

    // Create a new shooting star every 5 seconds
    setInterval(() => {
      createShootingStar(shootingStarsContainer)
    }, 5000)
  }

  function createShootingStar(container) {
    const shootingStar = document.createElement("div")
    shootingStar.className = "shooting-star"

    // Position in the upper right quadrant with more variation
    const startX = Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.3 // 30% to 100% of width
    const startY = Math.random() * (window.innerHeight * 0.3) // 0% to 30% of height

    // Random size (length of the shooting star)
    const size = Math.random() * 180 + 80 // 80px to 260px

    // Slightly varied base angle (125-145 degrees)
    // Adjusted to match the new orientation (head leading, tail trailing)
    const baseAngle = 135 + (Math.random() * 20 - 10)

    // Random animation duration (2-4 seconds)
    const duration = Math.random() * 2 + 2

    // Random delay
    const delay = Math.random() * 15

    // Set styles
    shootingStar.style.width = `${size}px`
    shootingStar.style.left = `${startX}px`
    shootingStar.style.top = `${startY}px`
    shootingStar.style.transform = `rotate(${baseAngle}deg)`
    shootingStar.style.animationDelay = `${delay}s`
    shootingStar.style.animationDuration = `${duration}s`

    // Random thickness (1-3px)
    const thickness = Math.random() * 2 + 1
    shootingStar.style.height = `${thickness}px`

    // Add to container
    container.appendChild(shootingStar)

    // Remove after animation completes
    setTimeout(
      () => {
        if (shootingStar.parentNode === container) {
          container.removeChild(shootingStar)
        }
      },
      (delay + duration) * 1000,
    )
  }

  // Function to create additional stars
  function createStars() {
    // Create additional twinkling stars
    const starsContainer = document.querySelector(".stars-container")

    if (!starsContainer) {
      console.error("Stars container not found")
      return
    }

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div")
      star.className = "twinkling-star"

      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Random size
      const size = Math.random() * 3 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random animation duration and delay
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 5
      star.style.animationDuration = `${duration}s`
      star.style.animationDelay = `${delay}s`

      starsContainer.appendChild(star)
    }

    // Add CSS for twinkling stars
    if (!document.getElementById("twinkling-stars-style")) {
      const style = document.createElement("style")
      style.id = "twinkling-stars-style"
      style.textContent = `
                .twinkling-star {
                    position: absolute;
                    background-color: white;
                    border-radius: 50%;
                    animation: twinkle infinite alternate ease-in-out;
                }
                
                @keyframes twinkle {
                    0% {
                        opacity: 0.2;
                        box-shadow: 0 0 0 white;
                    }
                    100% {
                        opacity: 1;
                        box-shadow: 0 0 10px white;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Animated counter for stats
  const stats = document.querySelectorAll(".stat-number")

  function animateCounter(el) {
    const target = Number.parseInt(el.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        el.textContent = target
        clearInterval(timer)
      } else {
        el.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Intersection Observer for stats
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statElements = entry.target.querySelectorAll(".stat-number")
          statElements.forEach((stat) => {
            animateCounter(stat)
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }

  // Technology tabs
  const tabButtons = document.querySelectorAll(".tab-button")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and content
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // Show corresponding content
      const tabId = this.getAttribute("data-tab")
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Animation on scroll
  const animatedElements = document.querySelectorAll("[data-aos]")

  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
          animateOnScroll.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  // Add animation classes and observe elements
  animatedElements.forEach((element) => {
    const delay = element.getAttribute("data-aos-delay") || 0

    // Add CSS for animations
    if (!document.getElementById("aos-styles")) {
      const style = document.createElement("style")
      style.id = "aos-styles"
      style.textContent = `
                [data-aos] {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                
                [data-aos].aos-animate {
                    opacity: 1;
                    transform: translateY(0);
                }
            `
      document.head.appendChild(style)
    }

    // Set delay
    element.style.transitionDelay = `${delay}ms`

    // Observe element
    animateOnScroll.observe(element)
  })

  // Form validation and animation
  const form = document.getElementById("mission-form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let valid = true
      const inputs = form.querySelectorAll("input, select, textarea")

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false
          input.parentElement.classList.add("error")
        } else {
          input.parentElement.classList.remove("error")
        }
      })

      if (valid) {
        // Show success message
        const formContainer = form.parentElement
        formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for your interest in our lunar mission. We'll be in touch soon.</p>
                    </div>
                `

        // Add success message styles
        if (!document.getElementById("success-styles")) {
          const style = document.createElement("style")
          style.id = "success-styles"
          style.textContent = `
                        .success-message {
                            text-align: center;
                            padding: 3rem 2rem;
                        }
                        
                        .success-message i {
                            font-size: 4rem;
                            color: var(--accent-color);
                            margin-bottom: 1.5rem;
                        }
                        
                        .success-message h3 {
                            margin-bottom: 1rem;
                        }
                    `
          document.head.appendChild(style)
        }
      }
    })

    // Add error styles
    if (!document.getElementById("error-styles")) {
      const style = document.createElement("style")
      style.id = "error-styles"
      style.textContent = `
                .form-group.error .line {
                    background: #ff3860;
                }
                
                .form-group.error label {
                    color: #ff3860;
                }
            `
      document.head.appendChild(style)
    }
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero")
  const rocket = document.querySelector(".rocket")

  if (heroSection && rocket) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < heroSection.offsetHeight) {
        const translateY = scrollPosition * 0.2
        rocket.style.transform = `translate(-50%, -50%) translateY(-${translateY}px)`
      }
    })
  }

  // Interactive timeline
  const timelineItems = document.querySelectorAll(".timeline-item")

  timelineItems.forEach((item) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(item)
  })

  // Add timeline animation styles
  if (!document.getElementById("timeline-styles")) {
    const style = document.createElement("style")
    style.id = "timeline-styles"
    style.textContent = `
            .timeline-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .timeline-item.active {
                opacity: 1;
                transform: translateY(0);
            }
        `
    document.head.appendChild(style)
  }

  // Particle effect for tech circles
  function createParticles() {
    const techCircles = document.querySelectorAll(".tech-circle")

    techCircles.forEach((circle) => {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Random position within the circle
        const angle = Math.random() * 2 * Math.PI
        const radius = Math.random() * 30
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        // Set particle styles
        particle.style.left = `calc(50% + ${x}px)`
        particle.style.top = `calc(50% + ${y}px)`

        // Random size
        const size = Math.random() * 4 + 2
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random animation duration
        const duration = Math.random() * 3 + 2
        particle.style.animation = `float ${duration}s infinite alternate`

        circle.appendChild(particle)
      }
    })

    // Add particle styles
    if (!document.getElementById("particle-styles")) {
      const style = document.createElement("style")
      style.id = "particle-styles"
      style.textContent = `
                .particle {
                    position: absolute;
                    background: var(--accent-color);
                    border-radius: 50%;
                    opacity: 0.6;
                    box-shadow: 0 0 10px var(--accent-glow);
                }
                
                @keyframes float {
                    0% {
                        transform: translate(0, 0);
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(10px, -10px);
                        opacity: 0.8;
                    }
                }
            `
      document.head.appendChild(style)
    }
  }

  createParticles()
})
