// Story text content
export const storyTexts = [
    "Ваш дедушка скончался, хоккей — был его самой главной страстью в жизни.",
    "Он оставил вам в наследство хоккейную коробку в далеком сибирском городе.",
    "И попросил вас сделать невозможное — вернуть хоккей туда, где от него остались только голые борта и память.",
    "Вы собрали семью — жену, детей — и отправились туда, в морозный, забытый город, чтобы исполнить последнюю просьбу дедушки."
];

let currentTextIndex = 0;
let isTyping = false;
let typingTimeout = null;

// Typewriter effect
export function typeWriter(text, element, callback) {
    let index = 0;
    isTyping = true;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 50);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    
    element.textContent = '';
    type();
}

// Show next story text
export function showNextText(storyText, skipButton, onComplete) {
    if (currentTextIndex < storyTexts.length) {
        typeWriter(storyTexts[currentTextIndex], storyText, () => {
            currentTextIndex++;
            if (currentTextIndex === 1) {
                skipButton.classList.remove('hidden');
            }
            if (currentTextIndex < storyTexts.length) {
                setTimeout(() => showNextText(storyText, skipButton, onComplete), 2000);
            } else {
                setTimeout(onComplete, 3000);
            }
        });
    }
}

// Skip story
export function skipStory() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
}

// Reset story state
export function resetStory() {
    currentTextIndex = 0;
    isTyping = false;
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
} 