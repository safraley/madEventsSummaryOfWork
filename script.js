// Positions the hub and spoke cards along a circular arc for larger screens.
// On mobile screens (<=480px), this function disables dynamic positioning
// so that the media query can handle stacking the elements automatically.
function recalcPositions() {
	const containerWidth = window.innerWidth;

	// Disable dynamic positioning for mobile screens
	if (containerWidth <= 480) {
		document.querySelectorAll(".spoke").forEach((spoke) => {
			spoke.style.left = "";
			spoke.style.top = "";
		});
		return; // Exit function early for mobile layouts
	}

	const container = document.getElementById("hubContainer");
	const hub = document.querySelector(".hub");
	const hubRect = hub.getBoundingClientRect();
	const hubCenterX = hubRect.left + hubRect.width / 2;
	const hubCenterY = hubRect.top + hubRect.height / 2;

	const containerWidthAdjusted = Math.max(container.offsetWidth, 600);
	const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.3;

	const baseHorizontalOffset = Math.max(100, containerWidthAdjusted * 0.15);
	const additionalOffset = Math.max(50, containerWidthAdjusted * 0.1);
	const arcVerticalSpan = Math.max(220, container.offsetHeight * 0.4);

	const n = 5; // Number of spokes per side.
	const allSpokes = Array.from(document.querySelectorAll(".spoke"));

	// Position left arc spokes.
	allSpokes.slice(0, n).forEach((spoke, i) => {
		const p = i / (n - 1);
		const y = hubCenterY - arcVerticalSpan / 2 + p * arcVerticalSpan;
		const parabolicFactor = 0.5 + 0.5 * (1 - 4 * Math.pow(p - 0.5, 2));
		const x =
			hubCenterX - baseHorizontalOffset - additionalOffset * parabolicFactor;

		spoke.style.left = `${x}px`;
		spoke.style.top = `${y}px`;
	});

	// Position right arc spokes.
	allSpokes.slice(n).forEach((spoke, i) => {
		const p = i / (n - 1);
		const y = hubCenterY - arcVerticalSpan / 2 + p * arcVerticalSpan;
		const parabolicFactor = 0.5 + 0.5 * (1 - 4 * Math.pow(p - 0.5, 2));
		const x =
			hubCenterX + baseHorizontalOffset + additionalOffset * parabolicFactor;

		spoke.style.left = `${x}px`;
		spoke.style.top = `${y}px`;
	});
}

window.addEventListener("DOMContentLoaded", recalcPositions);
window.addEventListener("resize", recalcPositions);
