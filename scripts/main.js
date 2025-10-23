document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('primary-navigation');

    if (!toggleButton || !navigation) {
        return;
    }

    const updateAria = (isOpen) => {
        toggleButton.setAttribute('aria-expanded', String(isOpen));
        toggleButton.classList.toggle('is-open', isOpen);
    };

    toggleButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('is-open');
        updateAria(isOpen);
    });

    // Fecha o menu ao selecionar um link (melhora a navegação mobile)
    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navigation.classList.contains('is-open')) {
                navigation.classList.remove('is-open');
                updateAria(false);
            }
        });
    });
});
