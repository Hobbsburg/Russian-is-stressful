const syllablesDiv = document.querySelector('.syllables-container');
const translationDiv = document.querySelector('.translation');
const inflectionDiv = document.querySelector('.inflection');
const correctImg = document.querySelector('.correct-img');
const imagesEl = document.querySelector('.images');
let incorrectImg = imagesEl.querySelector("[data-index='0']");
const nextButton = document.querySelector('.next-button');
const randomize = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
 }
 const mockdata = randomize(window.mockData)
// For each of the items in the data,
// Crate a div, and within that div, created buttons for each syllable
const boxes = mockData.map((data, index) => {
  const syllables = data.word.split(' ');

  return `
    <div data-index=${index} class='hidden syllable-container'>
    <div class='button-container'>

      ${syllables.map((syllable, idx) => {
        return `
          <button
            data-key=${data.key}
            data-idx=${idx}
            data-translation="${data.translation}"
            data-inflection="${data.inflection}"
            class="syllable-button ${syllable}"
          >
            ${syllable}
          </button>
        `;
      }).join('')}
      </div>
      <div class="translation">
    <p class='content'>${data.translation}</p>
  </div>

  <div class="inflection">
    <p class='content'>${data.inflection}</p>
  </div>
    </div>
    
`

}).join('');

/**
 * Render content to the page
 */
syllablesDiv.innerHTML = boxes
const firstItem = document.querySelector("[data-index='0']")
firstItem.classList.remove('hidden');
firstItem.classList.add("isTesting")
const hideIncorrectImages = () => { 
  const incorrectImages = document.querySelectorAll('.incorrect-img')
  incorrectImages.forEach((incorrectImage) => {
    incorrectImage.classList.add('hidden');
  })
}

console.log(firstItem)
/**
 *     Event listeners
 */
let counter = 0; 
syllablesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("syllable-button")) {
    console.log(counter);
    if (e.target.dataset.key === e.target.dataset.idx) {
      console.log("this is the correct answer");

      correctImg.classList.remove('hidden');
      hideIncorrectImages();
      nextButton.classList.remove('hidden');

    } else {
      console.log("this is the wrong answer");
      correctImg.classList.add('hidden');
      hideIncorrectImages();
      if (counter >= 2) {
        incorrectImg =  imagesEl.querySelector("[data-index='2']")
      } else if (counter === 1) {

        incorrectImg =  imagesEl.querySelector("[data-index='1']")
      } else if (counter === 0) {
        incorrectImg =  imagesEl.querySelector("[data-index='0']")
      }
      incorrectImg.classList.remove('hidden');
      counter += 1;
    }

  }
  nextButton.classList.remove('hidden');

})

nextButton.addEventListener("click", (e) => {
  const isTesting =  document.querySelector(".isTesting")
  const isTestingIndex = parseInt(isTesting.dataset.index, 10)

  const syllableContainers = document.querySelectorAll('.syllable-container');

  // Hide all
  syllableContainers.forEach(syllableContainer => {
    syllableContainer.classList.add("hidden");
  });
  const nextTest = document.querySelector(`[data-index='${isTestingIndex+1}']`);
  isTesting.classList.remove('isTesting');
  nextTest.classList.add('isTesting');
  nextTest.classList.remove('hidden');
  correctImg.classList.add('hidden');
  hideIncorrectImages();
  nextButton.classList.add('hidden');
  counter = 0; 

 
});
