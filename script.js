document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('centroidCanvas');
    const ctx = canvas.getContext('2d');
    const generateButton = document.getElementById('generateButton');

    const pointRadius = 5;
    const centroidRadius = 8;
    const numPoints = 10;
    const margin = 50;

    let points = [];
    let centroid = { x: 0, y: 0 };

    function generatePoints() {
        points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * (canvas.width - 2 * margin) + margin,
                y: Math.random() * (canvas.height - 2 * margin) + margin
            });
        }
    }

    function calculateCentroid() {
        let sumX = 0;
        let sumY = 0;
        points.forEach(p => {
            sumX += p.x;
            sumY += p.y;
        });
        centroid = {
            x: sumX / points.length,
            y: sumY / points.length
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw points
        ctx.fillStyle = '#007BFF';
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw centroid
        ctx.fillStyle = '#FFC107';
        ctx.beginPath();
        ctx.arc(centroid.x, centroid.y, centroidRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();


        // Draw dotted lines from centroid to points
        ctx.strokeStyle = '#888';
        ctx.setLineDash([5, 5]);
        points.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(centroid.x, centroid.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        });
        ctx.setLineDash([]); // Reset line dash
    }

    function generateNewExample() {
        generatePoints();
        calculateCentroid();
        draw();
    }

    generateButton.addEventListener('click', generateNewExample);

    // Initial generation
    generateNewExample();
});
