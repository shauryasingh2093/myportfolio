import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const scrollBall = document.getElementById('scroll-ball');
  const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement;

  if (scrollBall && scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const indicatorHeight = scrollIndicator.offsetHeight;
      const ballHeight = scrollBall.offsetHeight;

      // Calculate the displacement (max travel is indicatorHeight - ballHeight)
      const maxTravel = indicatorHeight - ballHeight - 20; // 20 for top/bottom padding

      // Map scrollY (from 0 to windowHeight) to displacement (from 0 to maxTravel)
      const progress = Math.min(scrollY / (windowHeight / 1.5), 1);
      const translateY = progress * maxTravel;

      scrollBall.style.transform = `translateY(${translateY}px)`;
    });
  }

  // Smooth appearance for sections
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
  });

  // Inject visible styles
  const style = document.createElement('style');
  style.innerHTML = `
    section.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Mobile Menu Logic
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const menuOverlay = document.getElementById('menu-overlay');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = (open: boolean) => {
    if (mobileMenu) {
      if (open) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
      }
    }
  };

  menuToggle?.addEventListener('click', () => toggleMenu(true));
  menuClose?.addEventListener('click', () => toggleMenu(false));
  menuOverlay?.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Navbar Visibility Logic (Home only)
  const navbar = document.querySelector('nav');
  if (navbar) {
    const homeSection = document.getElementById('home');
    window.addEventListener('scroll', () => {
      if (homeSection) {
        const homeRect = homeSection.getBoundingClientRect();
        // Hide navbar if home section is mostly scrolled out or if we've scrolled past it
        // Adding a small buffer for smoother transition
        if (homeRect.bottom <= 100) {
          navbar.style.opacity = '0';
          navbar.style.pointerEvents = 'none';
        } else {
          navbar.style.opacity = '1';
          navbar.style.pointerEvents = 'auto';
        }
      }
    });
  }
});

// Modal Logic for Case Studies
declare global {
  interface Window {
    openModal: (id: string) => void;
    closeModal: () => void;
  }
}

window.openModal = (id: string) => {
  const modal = document.getElementById('case-study-modal');
  const content = document.getElementById(id);
  if (modal && content) {
    modal.classList.remove('hidden');
    content.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = () => {
  const modal = document.getElementById('case-study-modal');
  if (modal) {
    modal.classList.add('hidden');
    // Hide all case study contents inside the modal
    const contents = modal.querySelectorAll('#modal-content > div');
    contents.forEach(c => c.classList.add('hidden'));
    document.body.style.overflow = 'auto';
  }
};
