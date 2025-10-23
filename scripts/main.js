(function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.site-nav a');

    if (navToggle && navLinks.length) {
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (navToggle.checked) {
                    navToggle.checked = false;
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navToggle.checked) {
                navToggle.checked = false;
            }
        });
    }

    const faqCards = document.querySelectorAll('.faq-card');

    faqCards.forEach((card) => {
        const toggle = card.querySelector('.faq-toggle');
        const answer = card.querySelector('.faq-answer');

        if (!toggle || !answer) {
            return;
        }

        const closeAnswer = () => {
            toggle.setAttribute('aria-expanded', 'false');
            card.classList.remove('is-open');
            answer.hidden = true;
        };

        const openAnswer = () => {
            toggle.setAttribute('aria-expanded', 'true');
            card.classList.add('is-open');
            answer.hidden = false;
        };

        closeAnswer();

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeAnswer();
            } else {
                faqCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        const otherToggle = otherCard.querySelector('.faq-toggle');
                        const otherAnswer = otherCard.querySelector('.faq-answer');
                        if (otherToggle && otherAnswer) {
                            otherToggle.setAttribute('aria-expanded', 'false');
                            otherCard.classList.remove('is-open');
                            otherAnswer.hidden = true;
                        }
                    }
                });
                openAnswer();
            }
        });
    });

    const scrollTriggers = document.querySelectorAll('[data-scroll-target]');

    scrollTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            const { scrollTarget } = trigger.dataset;
            if (!scrollTarget) {
                return;
            }

            const targetElement = document.querySelector(scrollTarget);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const counters = document.querySelectorAll('.metric-counter[data-count]');

    if (counters.length) {
        const formatter = new Intl.NumberFormat('pt-BR');
        const animated = new WeakSet();

        const animateCounter = (element) => {
            if (animated.has(element)) {
                return;
            }

            const targetValue = Number(element.dataset.count);
            if (Number.isNaN(targetValue)) {
                return;
            }

            animated.add(element);

            const duration = 1600;
            const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const currentValue = Math.floor(progress * targetValue);
                element.textContent = formatter.format(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    element.textContent = formatter.format(targetValue);
                }
            };

            requestAnimationFrame(tick);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.45 });

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }

    const tabButtons = document.querySelectorAll('.tab-button[data-tab]');
    const tabPanels = document.querySelectorAll('[data-tab-panel]');

    if (tabButtons.length && tabPanels.length) {
        const tabList = Array.from(tabButtons);

        tabList.forEach((button) => {
            const isActive = button.getAttribute('aria-selected') === 'true';
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        const activateTab = (tabId) => {
            tabList.forEach((button) => {
                const isActive = button.dataset.tab === tabId;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                button.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            tabPanels.forEach((panel) => {
                const matches = panel.dataset.tabPanel === tabId;
                panel.toggleAttribute('hidden', !matches);
                panel.classList.toggle('is-active', matches);
            });
        };

        tabList.forEach((button, index) => {
            button.addEventListener('click', () => {
                activateTab(button.dataset.tab);
            });

            button.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                    return;
                }

                event.preventDefault();
                const offset = event.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + offset + tabList.length) % tabList.length;
                const nextButton = tabList[nextIndex];
                nextButton.focus();
                activateTab(nextButton.dataset.tab);
            });
        });
    }

    const accordionButtons = document.querySelectorAll('.accordion-button');

    if (accordionButtons.length) {
        accordionButtons.forEach((button) => {
            const panel = button.nextElementSibling;
            if (panel instanceof HTMLElement) {
                const expanded = button.getAttribute('aria-expanded') === 'true';
                panel.hidden = !expanded;
            }
        });

        accordionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const expanded = button.getAttribute('aria-expanded') === 'true';

                accordionButtons.forEach((otherButton) => {
                    const otherPanel = otherButton.nextElementSibling;
                    if (!(otherPanel instanceof HTMLElement)) {
                        return;
                    }

                    if (otherButton === button) {
                        otherButton.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                        otherPanel.hidden = expanded;
                    } else {
                        otherButton.setAttribute('aria-expanded', 'false');
                        otherPanel.hidden = true;
                    }
                });
            });
        });
    }
})();
