// Positions the hub and spoke cards along a circular arc
function recalcPositions() {
	const container = document.getElementById("hubContainer");
	const hub = document.querySelector(".hub");
	const hubRect = hub.getBoundingClientRect();
	const hubCenterX = hubRect.left + hubRect.width / 2;
	const hubCenterY = hubRect.top + hubRect.height / 2;

	const containerWidth = container.offsetWidth;
	const containerHeight = container.offsetHeight;

	// Use effective width so that on narrow viewports the offsets don't shrink too much.
	const effectiveWidth = Math.max(containerWidth, 600);

	// Responsive radius based on the smaller container dimension.
	const radius = Math.min(containerWidth, containerHeight) * 0.3;

	// Calculate horizontal offsets using effective width.
	const baseHorizontalOffset = Math.max(100, effectiveWidth * 0.15);
	const additionalOffset = Math.max(50, effectiveWidth * 0.1);

	// Define vertical arc span: 40% of container height, or at least 220px.
	const arcVerticalSpan = Math.max(220, containerHeight * 0.4);

	const n = 5; // Number of spokes per side.
	const allSpokes = Array.from(document.querySelectorAll(".spoke"));

	// Position left arc spokes.
	allSpokes.slice(0, n).forEach((spoke, i) => {
		const p = i / (n - 1);
		const y = hubCenterY - arcVerticalSpan / 2 + p * arcVerticalSpan;
		const parabolicFactor = 0.5 + 0.5 * (1 - 4 * Math.pow(p - 0.5, 2));
		const x =
			hubCenterX - baseHorizontalOffset - additionalOffset * parabolicFactor;

		const rect = spoke.getBoundingClientRect();
		const spokeWidth = rect.width;
		const spokeHeight = rect.height;

		spoke.style.left = `${x - spokeWidth / 2}px`;
		spoke.style.top = `${y - spokeHeight / 2}px`;
	});

	// Position right arc spokes.
	allSpokes.slice(n).forEach((spoke, i) => {
		const p = i / (n - 1);
		const y = hubCenterY - arcVerticalSpan / 2 + p * arcVerticalSpan;
		const parabolicFactor = 0.5 + 0.5 * (1 - 4 * Math.pow(p - 0.5, 2));
		const x =
			hubCenterX + baseHorizontalOffset + additionalOffset * parabolicFactor;

		const rect = spoke.getBoundingClientRect();
		const spokeWidth = rect.width;
		const spokeHeight = rect.height;

		spoke.style.left = `${x - spokeWidth / 2}px`;
		spoke.style.top = `${y - spokeHeight / 2}px`;
	});
}

window.addEventListener("DOMContentLoaded", recalcPositions);
window.addEventListener("resize", recalcPositions);
