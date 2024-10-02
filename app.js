const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }else{
      entry.target.classList.remove('show');
      entry.target.classList.add('hidden');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(element => {
  observer.observe(element);
});