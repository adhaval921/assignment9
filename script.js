// My code of Assignment 08

//$(document).ready(function (){
//     $.ajax({
//         url: "data.json",
//         success: function(data) {
//             data.cartoons.forEach(cartoons => {
//                 $("table tbody").append(`
//                 <tr class="name">
//                     <td>${cartoons.CartoonName}</td>
//                     <td>${cartoons.CharacterFirstName}</td>
//                     <td>${cartoons.CharacterLastName}</td>
//                     <td>${cartoons.Creator}</td>
//                     <td>${cartoons.YearRelased}</td>
//                     <td>${cartoons.Rating}</td>
//                 </tr>
//                 `);
            
//                 let data1 = 0;
//                 let data2 = 0;
//                 let CharacterFirstName = cartoons.CharacterFirstName[0].toLowerCase();
//                 if (CharacterFirstName.match(/[a-mA-M]/)) {
//                     data1++;
//                 } else {
//                     data2++;
//                 }
//             });
//         }
//     });      

//     $("#searchButton1").click(function(e){
//         $("#cartoons tr:not(:first-child)").filter(function (e) {
//             var valueData = $(this).find("td:eq(1)").text();
            
//                 if (valueData.includes("A") || valueData.includes("B") || valueData.includes("C") || valueData.includes("D") || valueData.includes("E") || valueData.includes("F") || valueData.includes("G") || valueData.includes("H") || valueData.includes("I") || valueData.includes("J") || valueData.includes("K") || valueData.includes("L") || valueData.includes("M")) {
//                     $(this).show();
//                 }
//                 else
//                 {
//                     $(this).hide();
//                 }
//                 dataSave = $('tr:visible').length;

//                 $('#button1').text(`( ${dataSave - 1} )`);
//                 $('#button2').text("");
//         });
//     });
        
//     $("#searchButton2").click(function(e){ 
//         $("#cartoons tr:not(:first-child)").filter(function (e) {
//             var valueData = $(this).find("td:eq(1)").text();
            
//             if (valueData.includes("O") || valueData.includes("P") || valueData.includes("Q") || valueData.includes("R") || valueData.includes("S") || valueData.includes("T") || valueData.includes("U") || valueData.includes("V") || valueData.includes("W") || valueData.includes("X") || valueData.includes("Y") || valueData.includes("Z")) {
//                 $(this).show();
//             }
//             else
//             {
//                 $(this).hide();
//             }
//             dataSave = $('tr:visible').length;

//             $('#button2').text(`( ${dataSave - 1} )`);
//             $('#button1').text("");
//         });
//     });

//     $("#search").keydown(function(e){
//         $("#cartoons").each(function( index ) {
//             var rowData=$("tbody").find("tr").show();

//             $("tbody tr").each(function (td) {
//                 let value = $(this).text().toLowerCase();

//                 // console.log(value);
//                 //console.log(rowData);

//                 if(value.includes(e.target.value.toLowerCase())) {
//                     $(this).css("background-color", "DarkGreen");
//                 } else {
//                     $(this).css("background-color", "");
//                 }
//             }); 
//         });
//     });
// });




// Modify the code which provided by sir on gitHub
//  just for my refernce...


$(function () {

    var $tbody = $('tbody'); // reference <tbody> element on the page
    var $search = $('#search'); // reference to the search input box
    var cache = [];
    var lastNameCount = [0, 0]; // initially 0 last names starting with a- m and 0 starting with n - z
    var $buttons = $('#buttons'); // Store buttons

    // this method is asynchronous, so anything that depends on this data needs to be build inside 
    // the done method or in a function that is called AFTER the method is done
    $.getJSON("data.json").done((data) => {
        // jQuery.each of the players in the array
        $.each(data.cartoons, function (key, val) {
            console.log("data key: ", key, " and data value: ", val);

            var $row = $('<tr></tr>'); // Create their row
            // populate data
            $row.append($('<td></td>').text(val.CartoonName));
            $row.append($('<td></td>').text(val.CharacterFirstName));
            $row.append($('<td></td>').text(val.CharacterLastName));
            $row.append($('<td></td>').text(val.Creator));
            $row.append($('<td></td>').text(val.DateRelased));
            $row.append($('<td></td>').text(val.Rating));

            $tbody.append($row); // Add row to the tbody

            cache.push({ // Create the cache that contains several values
                element: $row, // Reference to the row element
                // The text we're searching against (which in this case is first name)
                fname: val.CharacterFirstName.trim().toLowerCase(),
                // we only need the first character of the last name for filtering
                lnameFirstCharacter: val.CharacterLastName.trim().toLowerCase().charAt(0)
            });

            // add to the count for last names starting with a - m, and n - z
            if ("a" <= val.CharacterLastName.trim().toLowerCase().charAt(0) && "m" >= val.CharacterLastName.trim().toLowerCase().charAt(0)) {
                lastNameCount[0]++; // index 0 will be for if the last name starts with a - m
            }
            else { // n - z
                lastNameCount[1]++; // index 1 will be for if the last name starts with n - z
            }
        });

        $('<button/>', { 
            text: 'A - M (' + lastNameCount[0] + ')', // Add text, and the count for occurances
            click: function () { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((chessPlayer) => { // Each cache entry
                    // check if character is in range
                    if ("a" <= chessPlayer.lnameFirstCharacter && "m" >= chessPlayer.lnameFirstCharacter) {
                        chessPlayer.element.show();
                    }
                    else { // not in range, hide this chess player
                        chessPlayer.element.hide();
                    }
                });

            }
        }).appendTo($buttons); // Add to buttons

        $('<button/>', { // Create button
            text: `N - Z (${lastNameCount[1]})`, // Add text
            click: function () { // Add click handler
                $(this) // Get clicked button
                    .addClass('active') // Make it active
                    .siblings() // Get its siblings
                    .removeClass('active'); // Remove active class
                cache.forEach((chessPlayer) => { // Each cache entry
                    // check if character is in range
                    if ("n" <= chessPlayer.lnameFirstCharacter && "z" >= chessPlayer.lnameFirstCharacter) {
                        chessPlayer.element.show();
                    }
                    else {
                        chessPlayer.element.hide();
                    }
                });
            }
        }).appendTo($buttons); // Add to buttons

    });

    function filter() {
        var query = this.value.trim().toLowerCase(); // Get query
        if (query) { // If there’s a query
            cache.forEach(function (chessPlayer) { // Each cache entry
                var index = 0; // Set index to 0
                index = chessPlayer.fname.indexOf(query); // Is text in there?
                if (index != -1) { // we found the string in their first name
                    chessPlayer.element.addClass("found-first-name"); // we will apply colours based on this class
                }
                else { // player first name doesn't have the query string, make sure it's not higlighted
                    chessPlayer.element.removeClass("found-first-name")
                }
            });
        }
        else { 
            $('tbody tr').removeClass("found-first-name");
        }
    }

    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    } else { 
        $search.on('keyup', filter);
    }

    
    //assignment 09

    var compare = {
        name: function (a, b) {
            console.log("processing the words", b, ", ", a);
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1
            } else //they're equal
            {
                return 0;
            }
        },
        compareNumbersAscending: function (a, b) {
            console.log("processing the numbers", b, ", ", a);
            return a - b;
        },
        compareNumbersDescending: function (a, b) {
            console.log("processing the numbers", b, ", ", a);
            return b - a;
        },
        compareDates: function (a, b) {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        }
    };

    function populateTable() {
        var $tbody = $('#rates').find('tbody'); // Create <tbody> element
        cache.forEach(function (cartoons) { // For each person
            var $row = $('<tr></tr>'); // Create their row
            $row.append($('<td></td>').text(cartoons.CartoonName));// Add name
            $row.append($('<td></td>').text(cartoons.Rating));// Add rate
            $tbody.append($row); // Add HTML for the row
        });
        $('#rates').append($tbody); // Add rows to the table
    }
    
    function init() { // this is essentially the jquery ready function now
        populateTable();
    
        $('.sortable').each(function () {
            var $table = $(this); // This table
            var $tbody = $table.find('tbody'); // Table body
            var $controls = $table.find('th'); // Table headers
            var rows = $tbody.find('tr').toArray(); // Array of rows
            var originalRows = $tbody.find('tr').toArray(); // Array of Original Array Rows

            $controls.on('click', function () { // Event handler
                var $header = $(this); // Get header
                var order = $header.data('sortbythis'); // either name or compareNumbersAscending
                var column; // Used later

                if ($header.is('.ascending') || $header.is('.descending') || $header.is('.original'))
                {               
                    if ($header.is('.ascending')) {
                        $header.removeClass('ascending');
                        $header.addClass('descending');
                        $tbody.append(rows.reverse());
                      } 

                      else if ($header.is('.descending')) {
                        $header.removeClass('descending');
                        $header.addClass('original');
                        $tbody.append(originalRows);
                      } 
                      else {
                        $header.removeClass('original');
                        $header.addClass('ascending');
                        $tbody.append(rows.reverse());
                      }
                }
                else { 
                    $header.addClass('ascending'); // Add class to header
                    $header.siblings().removeClass('ascending descending'); // If compare object has method of that name
                    console.log("check if has property");

                    if (compare.hasOwnProperty(order)) {
                        console.log("has property");
                        column = $controls.index(this); // Column's index no
                        rows.sort(function (a, b) { // Call sort() on rows
                            a = $(a).find('td').eq(column).text();// Text of column row a
                            b = $(b).find('td').eq(column).text();// Text of column row b
                            return compare[order](a, b); // Call compare method
                        });
                        $tbody.append(rows);
                    }
                }
            });
        });
    
    }
    
    $(init);
});



