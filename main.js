
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

// Intersection Observer for fade-in animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '1px 1px -50px 0px',
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.animation = 'slideInUp 0.6s ease-out'
			entry.target.style.opacity = '1'
		}
	})
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
	el.style.opacity = '0'
	observer.observe(el)
})

// Matrix-like terminal effect (simplified)
function createMatrixEffect() {
	const chars = '0123456789abcdef'
	const terminalElements = document.querySelectorAll('.terminal-text')

	terminalElements.forEach(terminal => {
		const originalText = terminal.textContent
		let scrambled = false

		terminal.addEventListener('mouseenter', () => {
			if (!scrambled) {
				scrambled = true
				let iteration = 0
				const interval = setInterval(() => {
					terminal.textContent = originalText
						.split('')
						.map((char, index) => {
							if (index < iteration) {
								return originalText[index]
							}
							return chars[Math.floor(Math.random() * chars.length)]
						})
						.join('')

					if (iteration >= originalText.length) {
						clearInterval(interval)
						terminal.textContent = originalText
						setTimeout(() => {
							scrambled = false
						}, 1000)
					}

					iteration += 1
				}, 50)
			}
		})
	})
}

// Trigger matrix effect on hover instead of page load
window.addEventListener('load', () => {
	createMatrixEffect()
})

// Active navigation highlighting
window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('section')
	const navLinks = document.querySelectorAll('.nav-links a')

	let current = ''
	sections.forEach(section => {
		const sectionTop = section.offsetTop
		const sectionHeight = section.clientHeight
		if (pageYOffset >= sectionTop - 200) {
			current = section.getAttribute('id')
		}
	})

	navLinks.forEach(link => {
		link.classList.remove('active')
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active')
		}
	})
})
