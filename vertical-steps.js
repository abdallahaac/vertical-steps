let scrollAmount = 0;
let progressBars = document.querySelectorAll(".loader");
let currentHeight = 0;
let isProgressBarLoading = true;

window.addEventListener("wheel", (event) => {
	const delta = Math.sign(event.deltaY);
	scrollAmount += delta * 5; // Increase speed by multiplying with a factor
	console.log(scrollAmount);

	if (isProgressBarLoading && currentHeight >= 0 && currentHeight <= 170) {
		event.preventDefault();
		progressBars[0].style.height = `${currentHeight + scrollAmount}px`; // Set height to current height + scroll amount
		currentHeight += scrollAmount;
		if (currentHeight < 0) {
			currentHeight = 0;
			scrollAmount = 0;
		} else if (currentHeight > 150) {
			currentHeight = 150;
			scrollAmount = 0;
			isProgressBarLoading = false;
		}
	}

	if (!isProgressBarLoading) {
		// Allow scrolling after the progress bar has finished loading
		document.body.style.overflowY = "scroll";
	} else {
		// Prevent scrolling while the progress bar is loading
		document.body.style.overflowY = "hidden";
	}
});
