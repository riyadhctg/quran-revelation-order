const chapterSelect = document.getElementById('chapter-select');
const translationContainer = document.getElementById('translation-container');
const prevChapterButtonUp = document.getElementById('prev-chapter-up');
const nextChapterButtonUp = document.getElementById('next-chapter-up');
let currentChapterIndex = 0

quranIndex.forEach((chapter) => {
    const option = document.createElement('option');
    option.value = chapter.id; // Use the "link" for fetching translations
    option.text = `${chapter.rev_order}. ${chapter.transliteration} (${chapter.id})`;
    chapterSelect.appendChild(option);
});

// Function to load and display translation verses from js file
function loadChapterTranslationJson(chapterId) {
    // Select the element with id = 1
    const chapterContent = quranContentEn.find(item => item.id === chapterId);
    const translationVerses = chapterContent.verses.map((verse) => `${verse.id}. ${verse.translation}`);
    translationContainer.innerHTML = translationVerses.map((verse) => `<div class="verse">${verse}</div>`).join('');
}

// Event listener for dropdown change
chapterSelect.addEventListener('change', () => {
    const selectedChapterId = chapterSelect.value;
    // Get the index of the selected option
    currentChapterIndex = chapterSelect.selectedIndex;
    if (selectedChapterId) {
        loadChapterTranslationJson(selectedChapterId);
    }
});

// Event listener for previous chapter button
prevChapterButtonUp.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        chapterSelect.value = quranIndex[currentChapterIndex].id;
        loadChapterTranslationJson(quranIndex[currentChapterIndex].id);
    }
});

// Event listener for next chapter button
nextChapterButtonUp.addEventListener('click', () => {
    if (currentChapterIndex < quranIndex.length - 1) {
        currentChapterIndex++;
        chapterSelect.value = quranIndex[currentChapterIndex].id;
        loadChapterTranslationJson(quranIndex[currentChapterIndex].id);
    }
});