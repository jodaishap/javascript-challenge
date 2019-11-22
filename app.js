// from data.js
var tableData = data;

//Print data
console.log(data);

function buildTable(data) {
    tbody.html("");

    // Loop through rows
    data.forEach((dataRow) => {
        var row = tbody.append("tr");

        Object.values(dataRow).forEach((val) => {
            var cell = row.append("td");
            cell.text(val);
        });
    });
}
// Filters
var filters = {};
function updateFilters() {
    var element = d3.select(this).select("input");
    var value = element.property("value");
    var id = element.attr("id");

    // Add id and value if there was a filter value entered in the list. Else clear filter
    if (value) {
        filters[id] = value;
    }
    else {
        delete filters[id];
    }
    // Apply all filters and remake the table
    filterTable();
}
function filterTable() {

    // Set  filteredData to  tableData
    let filteredData = tableData;

    // Loop through filters. Keep information that matches values
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    // Remake  table with the filteredData
    buildTable(filteredData);
}

// Attach event for filter changes
d3.selectAll(".filter").on("change", updateFilters);

// Make table when the page loads
buildTable(tableData);
