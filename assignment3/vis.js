vl.register(vega, vegaLite, {
  view: { renderer: "canvas" },
  init: (view) => {
    view.tooltip(new vegaTooltip.Handler().call);
  },
});

// Resolve dataset URLs relative to the current page so they work on localhost and Vercel
function getDataUrl(filename) {
  let path = window.location.pathname;
  if (!path.endsWith("/")) {
    const lastSegment = path.split("/").pop() || "";
    path = lastSegment.includes(".")
      ? path.replace(/\/[^/]+$/, "/")
      : path + "/";
  }
  const base = window.location.origin + path;
  return new URL("dataset/" + filename, base).href;
}

async function fetchData() {
  const [videoGamesWide, videoGamesLong] = await Promise.all([
    d3.csv(getDataUrl("videogames_wide.csv"), d3.autoType),
    d3.csv(getDataUrl("videogames_long.csv"), d3.autoType),
  ]);
  return { videoGamesWide, videoGamesLong };
}

const top7Publishers = [
  "Activision",
  "Electronic Arts",
  "Konami Digital Entertainment",
  "Namco Bandai Games",
  "Nintendo",
  "THQ",
  "Ubisoft",
];

fetchData()
  .then(async ({ videoGamesWide: data, videoGamesLong: dataLong }) => {
    // uniqueGames: deduplicated by Name + Platform
    const uniqueGames = Array.from(
      d3.group(data, (d) => d.Name + "|" + d.Platform),
      ([key, rows]) => rows[0],
    );

    // uniqueTitles: deduplicated by Name only
    const uniqueTitles = Array.from(
      d3.group(data, (d) => d.Name),
      ([key, rows]) => rows[0],
    );

    // Publisher stats for scatterplot
    const publisherStats = Array.from(
      d3.rollup(
        uniqueTitles,
        (v) => ({
          Publisher: v[0].Publisher,
          Total_Sales: d3.sum(v, (d) => d.Global_Sales),
          Num_Games: v.length,
        }),
        (d) => d.Publisher,
      ),
      ([publisher, stats]) => stats,
    );

    const publisherStatsFiltered = publisherStats.filter((d) =>
      top7Publishers.includes(d.Publisher),
    );

    // Viz 1: Global Sales by Genre and Platform
    const vlSpec = vl
      .markBar()
      .data(uniqueGames)
      .encode(
        vl.x().fieldN("Genre").sort("-y").title("Genre"),
        vl
          .y()
          .fieldQ("Global_Sales")
          .aggregate("sum")
          .title("Global Sales (millions)"),
        vl
          .color()
          .fieldN("Platform")
          .scale({ scheme: "tableau20" })
          .title("Platform"),
        vl.tooltip([
          { field: "Genre", type: "nominal" },
          { field: "Platform", type: "nominal" },
          {
            field: "Global_Sales",
            type: "quantitative",
            aggregate: "sum",
            title: "Sales (M)",
          },
        ]),
      )
      .width(600)
      .height(400)
      .title("Global Sales by Genre and Platform")
      .toSpec();

    // Viz 2: Sales Over Time by Platform
    const vlSpec2 = vl
      .markLine()
      .data(uniqueGames)
      .transform(vl.filter("datum.Year != null && datum.Year !== 'N/A'"))
      .encode(
        vl.x().fieldO("Year").title("Year"),
        vl
          .y()
          .fieldQ("Global_Sales")
          .aggregate("sum")
          .title("Global Sales (millions)"),
        vl
          .color()
          .fieldN("Platform")
          .scale({ scheme: "tableau20" })
          .title("Platform"),
        vl.tooltip([
          { field: "Year", type: "ordinal" },
          { field: "Platform", type: "nominal" },
          {
            field: "Global_Sales",
            type: "quantitative",
            aggregate: "sum",
            title: "Sales (M)",
          },
        ]),
      )
      .width(600)
      .height(400)
      .title("Global Sales Over Time by Platform")
      .toSpec();

    // Viz 3: Regional Sales by Platform
    const vlSpec3 = vl
      .markBar()
      .data(dataLong)
      .transform(vl.filter("datum.sales_region !== 'global_sales'"))
      .encode(
        vl
          .x()
          .fieldQ("sales_amount")
          .aggregate("sum")
          .title("Sales (millions)"),
        vl.y().fieldN("platform").sort("-x").title("Platform"),
        vl
          .color()
          .fieldN("sales_region")
          .scale({ scheme: "set1" })
          .title("Region"),
        vl.facet().fieldN("sales_region").columns(2),
        vl.tooltip([
          { field: "platform", type: "nominal" },
          { field: "sales_region", type: "nominal" },
          {
            field: "sales_amount",
            type: "quantitative",
            aggregate: "sum",
            title: "Sales (M)",
          },
        ]),
      )
      .width(300)
      .height(400)
      .title("Regional Sales by Platform")
      .toSpec();

    // Viz 4: Publisher Scatterplot — Number of Games vs Total Sales
    const vlSpec4 = vl
      .markPoint({ filled: true, size: 100 })
      .data(publisherStatsFiltered)
      .encode(
        vl.x().fieldQ("Num_Games").title("Number of Games Published"),
        vl.y().fieldQ("Total_Sales").title("Total Global Sales (millions)"),
        vl
          .color()
          .fieldN("Publisher")
          .scale({ scheme: "tableau20" })
          .title("Publisher"),
        vl.tooltip([
          { field: "Publisher", type: "nominal" },
          {
            field: "Num_Games",
            type: "quantitative",
            title: "Games Published",
          },
          {
            field: "Total_Sales",
            type: "quantitative",
            title: "Total Sales (M)",
          },
        ]),
      )
      .width(600)
      .height(400)
      .title("Publisher: Number of Games vs Total Global Sales")
      .toSpec();

    render("#view1", vlSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vlSpec4);
  })
  .catch((err) => {
    console.error("Failed to load data:", err);
    document.getElementById("view1").innerHTML =
      '<p style="color:#c00; padding:1rem;">Charts could not load. Open this page from a local server (e.g. <code>python -m http.server</code> in the repo root or from the <code>assignment3</code> folder), not by opening the file directly (<code>file://</code>).</p>';
  });

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
