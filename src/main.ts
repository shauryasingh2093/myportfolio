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
