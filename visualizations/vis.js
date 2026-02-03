// BAR CHART VISUALIZATION
const data = [
    { label: "Instagram", value: 224, color: "#DB2F55" },
    { label: "Pinterest", value: 36, color: "#BD081C" },
    { label: "TikTok", value: 97, color: "#27F4F2" },
    { label: "Discord", value: 276, color: "#5865F2" },
    { label: "Spotify", value: 82, color: "#1ED760" }
];

const svg = document.getElementById("barChart");

// SVG size
const width = 600;
const height = 350;

// Chart layout
const leftMargin = 50;
const topMargin = 35;
const chartWidth = 530;
const chartHeight = 265;

// Axis values
const maxValue = 300;
const yTicks = 5;

// Draw chart group
const chart = document.createElementNS("http://www.w3.org/2000/svg", "g");
chart.setAttribute(
    "transform",
    "translate(" + leftMargin + "," + topMargin + ")"
);
svg.appendChild(chart);

for (var i = 0; i <= yTicks; i++) {
    var value = (maxValue / yTicks) * i;
    var y = chartHeight - (value / maxValue) * chartHeight;

    // Grid line
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("x2", chartWidth);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#92908750");
    chart.appendChild(line);

    // Label
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", -10);
    text.setAttribute("y", y + 4);
    text.setAttribute("text-anchor", "end");
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "#b6b5af");
    text.textContent = value;
    chart.appendChild(text);
}

// Y axis
var yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxis.setAttribute("x1", 0);
yAxis.setAttribute("y1", 0);
yAxis.setAttribute("x2", 0);
yAxis.setAttribute("y2", chartHeight);
yAxis.setAttribute("stroke", "#92908750");
chart.appendChild(yAxis);

// X axis
var xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxis.setAttribute("x1", 0);
xAxis.setAttribute("y1", chartHeight);
xAxis.setAttribute("x2", chartWidth);
xAxis.setAttribute("y2", chartHeight);
xAxis.setAttribute("stroke", "#92908750");
chart.appendChild(xAxis);


var barWidth = chartWidth / data.length;
var innerBarWidth = barWidth - 40;

for (var i = 0; i < data.length; i++) {
    var d = data[i];

    var barHeight = (d.value / maxValue) * chartHeight;
    var x = i * barWidth + 20;
    var y = chartHeight - barHeight;

    // Bar
    var rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", innerBarWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("rx", 6);
    rect.setAttribute("fill", d.color);
    chart.appendChild(rect);

    // Label
    var label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );
    label.setAttribute("x", x + innerBarWidth / 2);
    label.setAttribute("y", chartHeight + 20);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12");
    label.setAttribute("fill", "#b6b5af");
    label.textContent = d.label;
    chart.appendChild(label);
}

// COOKIE VISUALIZATION
const svgCookie = document.getElementById("cookie");

// --- Cookie base ---
var cx = 150;
var cy = 150;
var cookieRadius = 100;

var cookie = document.createElementNS("http://www.w3.org/2000/svg", "circle");
cookie.setAttribute("cx", cx);
cookie.setAttribute("cy", cy);
cookie.setAttribute("r", cookieRadius);
cookie.setAttribute("fill", "#F29F58"); // cookie color
svgCookie.appendChild(cookie);

// --- Chocolate chips (mixed circles and rounded rectangles) ---
var chips = [
    { type: "circle", x: 120, y: 120, r: 8 },
    { type: "circle", x: 120, y: 220, r: 6 },
    { type: "circle", x: 200, y: 210, r: 8 },
    { type: "circle", x: 180, y: 140, r: 6 },
    { type: "rect", x: 80, y: 120, width: 12, height: 6, rx: 3 },
    { type: "rect", x: 140, y: 180, width: 12, height: 6, rx: 3 },
    { type: "circle", x: 100, y: 160, r: 8 },
    { type: "circle", x: 160, y: 100, r: 5 },
    { type: "rect", x: 200, y: 180, width: 10, height: 7, rx: 3 }
];

for (var i = 0; i < chips.length; i++) {
    var c = chips[i];
    if (c.type === "circle") {
        var chip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        chip.setAttribute("cx", c.x);
        chip.setAttribute("cy", c.y);
        chip.setAttribute("r", c.r);
    } else if (c.type === "rect") {
        var chip = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        chip.setAttribute("x", c.x);
        chip.setAttribute("y", c.y);
        chip.setAttribute("width", c.width);
        chip.setAttribute("height", c.height);
        chip.setAttribute("rx", c.rx);
    }
    chip.setAttribute("fill", "#593329"); // chocolate chip color
    svgCookie.appendChild(chip);
}

// --- Bite in the cookie corner ---
// Using three overlapping circles of background color
var biteColor = "#1d1b11"; // matches background

var bites = [
    { cx: 180, cy: 40, r: 36 },
    { cx: 240, cy: 64, r: 52 }
];

for (var i = 0; i < bites.length; i++) {
    var b = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    b.setAttribute("cx", bites[i].cx);
    b.setAttribute("cy", bites[i].cy);
    b.setAttribute("r", bites[i].r);
    b.setAttribute("fill", biteColor);
    svgCookie.appendChild(b);
}
