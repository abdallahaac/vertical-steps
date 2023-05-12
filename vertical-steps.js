const PROGRESS_BAR_SELECTOR = ".loader";
const SCROLL_MULTIPLIER = 20;
const MAX_HEIGHT = 200;

const progressBars = Array.from(
	document.querySelectorAll(PROGRESS_BAR_SELECTOR)
);
const [progressBar1, progressBar2] = progressBars;

let scrollAmount = 0;
let currentHeight = 0;
let isSecondProgressBarVisible = false;

function clampHeight(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function showProgressBar(progressBar) {
	progressBar.style.display = "block";
}

function setProgressBarHeight(progressBar, height) {
	progressBar.style.height = `${height}px`;
}

function updateProgressBar(progressBar, height) {
	showProgressBar(progressBar);
	setProgressBarHeight(progressBar, height);
}

function showStep2Icon() {
	const step2Icon = document.querySelector('[data-step="2"]');
	step2Icon.classList.remove("disabled");
}
function hideStep2Icon() {
	const step2Icon = document.querySelector('[data-step="2"]');
	step2Icon.classList.add("disabled");
}

function hideStep3Icon() {
	const step3Icon = document.querySelector('[data-step="3"]');
	step3Icon.classList.add("disabled");
}
function showStep3Icon() {
	const step3Icon = document.querySelector('[data-step="3"]');
	step3Icon.classList.remove("disabled");
}

function updateScrollAmount(event) {
	const delta = Math.sign(event.deltaY);
	scrollAmount += delta * SCROLL_MULTIPLIER;
	if (delta < 0) {
		scrollAmount = 1;
	}
}

function updateCurrentHeight() {
	currentHeight += scrollAmount;
	currentHeight = clampHeight(currentHeight, 1, MAX_HEIGHT);
}

function updateFirstProgressBar() {
	updateProgressBar(progressBar1, currentHeight);
	scrollAmount = 1;
	if (currentHeight >= MAX_HEIGHT && !isSecondProgressBarVisible) {
		console.log("Maximum length reached for the first progress bar");
		isSecondProgressBarVisible = true;
		showProgressBar(progressBar2);
		showStep2Icon();
		scrollAmount = 0;
	}
}

function updateSecondProgressBar() {
	updateProgressBar(progressBar2, 300);
}

function handleFirstProgressBar() {
	if (currentHeight <= MAX_HEIGHT) {
		updateCurrentHeight();
		updateFirstProgressBar();
	} else if (scrollAmount > 0) {
		updateSecondProgressBar();
	} else {
		updateProgressBar(progressBar2, currentHeight);
	}
}

function handleStep2Icon() {
	if (scrollAmount != 1) {
		hideStep2Icon();
	} else {
		showStep2Icon();
	}
}

function handleScroll(event) {
	updateScrollAmount(event);
	handleFirstProgressBar();
	handleStep2Icon();
	console.log(scrollAmount);
}

window.addEventListener("wheel", handleScroll);
