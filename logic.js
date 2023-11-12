const seerahKeyedSelect = document.getElementById('seerahDropdown');
const quranIndexRevisedKeyedSelect = document.getElementById('quranDropdown');
// const chapterSelect = document.getElementById('chapter-select');

const translationContainer = document.getElementById('translation-container');
const prevChapterButtonUp = document.getElementById('prev-chapter-up');
const nextChapterButtonUp = document.getElementById('next-chapter-up');
let currentChapterIndex = 0



function populateDropdown(jsonData, dropdownElement) {
    for (const key in jsonData) {
        const optionElement = document.createElement("option");
        optionElement.value = key;
        optionElement.text = key;
        // seerah content is down here
        // optionElement.textContent = jsonData[key];
        dropdownElement.appendChild(optionElement);
    }
}

window.onload = function() {
    populateDropdown(seerahKeyed, seerahKeyedSelect);
};


// quranIndexRevised.forEach((chapter) => {
//     const option = document.createElement('option');
//     option.value = chapter.id; // Use the "link" for fetching translations
//     option.text = `${chapter.FinRevOrder}. ${chapter.transliteration} (${chapter.id})`;
//     chapterSelect.appendChild(option);
// });

// Function to load and display translation verses from js file
function loadChapterTranslationJson(chapterId) {
    chapterId = parseFloat(chapterId)
    // Select the element with id = 1
    const chapterContent = quranContentEnRevised.find(item => item.id === chapterId);
    const translationVerses = chapterContent.verses.map((verse) => `${verse.id}. ${verse.translation}`);
    translationContainer.innerHTML = translationVerses.map((verse) => `<div class="verse">${verse}</div>`).join('');
}

// // Event listener for dropdown change
// chapterSelect.addEventListener('change', () => {
//     const selectedChapterId = chapterSelect.value;
//     // Get the index of the selected option
//     currentChapterIndex = chapterSelect.selectedIndex;
//     console.log("selectedChapterId")
//     console.log(selectedChapterId)
//     if (selectedChapterId) {
//         loadChapterTranslationJson(selectedChapterId);
//     }
// });

// Event listener for previous chapter button
prevChapterButtonUp.addEventListener('click', () => {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        quranIndexRevisedKeyedSelect.value = quranIndexRevised[currentChapterIndex].id;
        loadChapterTranslationJson(quranIndexRevised[currentChapterIndex].id);
    }
});

// Event listener for next chapter button
nextChapterButtonUp.addEventListener('click', () => {
    if (currentChapterIndex < quranIndexRevised.length - 1) {
        currentChapterIndex++;
        quranIndexRevisedKeyedSelect.value = quranIndexRevised[currentChapterIndex].id;
        loadChapterTranslationJson(quranIndexRevised[currentChapterIndex].id);
    }
});


// Event listener for dropdown change
seerahKeyedSelect.addEventListener('change', () => {
    // Get the selected key from the first dropdown
    let quranIndexRevisedKeyedCurrent = quranIndexRevisedKeyed;
    let selectedKey = seerahKeyedSelect.value;
    // Get the corresponding options from quranIndexRevisedKeyed
    quranIndexRevisedKeyedCurrent = quranIndexRevisedKeyed[selectedKey];
    quranIndexRevisedKeyedSelect.innerHTML = '<option value="" disabled selected>Select an Option</option>';
    quranIndexRevisedKeyedCurrent.forEach(option => {
        let newOption = document.createElement("option");
        newOption.value = option.id;
        newOption.text = option.transliteration;
        quranIndexRevisedKeyedSelect.add(newOption);
    });
});


// Event listener for dropdown change
quranIndexRevisedKeyedSelect.addEventListener('change', () => {
    const selectedChapterId = quranIndexRevisedKeyedSelect.value;
    // Get the index of the selected option
    currentChapterIndex = quranIndexRevisedKeyedSelect.selectedIndex;
    if (selectedChapterId) {
        loadChapterTranslationJson(selectedChapterId);
    }
});



