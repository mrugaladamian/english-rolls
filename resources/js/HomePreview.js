const previewElement = document.querySelector('[data-home-preview]');

if (previewElement) {
    const rollsElement = previewElement.querySelector('[data-home-preview-rolls]');
    const plElement = previewElement.querySelector('[data-home-preview-pl]');
    const enElement = previewElement.querySelector('[data-home-preview-en]');
    const phoneticElement = previewElement.querySelector('[data-home-preview-phonetic]');
    const rolls = JSON.parse(rollsElement.textContent);
    let currentRollIndex = 0;

    previewElement.addEventListener('click', () => {
        currentRollIndex = (currentRollIndex + 1) % rolls.length;
        plElement.textContent = rolls[currentRollIndex].pl;
        enElement.textContent = rolls[currentRollIndex].en;
        phoneticElement.textContent = rolls[currentRollIndex].phonetic;
    });
}
