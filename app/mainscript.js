    function getCurrentLog() {

    const sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./database/database.sqlite3');

    db.serialize(function() {

       //target the tbody element to have data inserted
        var rows = document.getElementById("database");
        //query the database to include all entries that are made by the current user
        db.each("SELECT rowid AS id, user, date, shift, time, subject, log FROM logs ORDER BY time", function(err, row) {
          // creates the HTML elements that will recieve the data from the database
          var entry = document.createElement("tr");
          var entryTime = document.createElement("td");
          // each createTextNode is filling the column of each row with data from the database
          var entryTimeText = document.createTextNode(row.time);
          var entrySubject = document.createElement("td");
          var entrySubjectText = document.createTextNode(row.subject);
          var entryLog = document.createElement("td");
          var entryLogText = document.createTextNode(row.log);
          
          entryTime.appendChild(entryTimeText);
          entrySubject.appendChild(entrySubjectText);
          entryLog.appendChild(entryLogText);
          entry.appendChild(entryTime);
          entry.appendChild(entrySubject);
          entry.appendChild(entryLog);
          rows.appendChild(entry);
        });
      });

      db.close();

    }

      function addEntry() {

        const sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('./database/database.sqlite3');

      db.serialize(function() {

         var entry = db.prepare("INSERT INTO logs(time, subject, log) VALUES (?, ?, ?)");
          
        var newEntryTime = document.getElementById("newEntryTime").value;
        var newEntrySubject = document.getElementById("newEntrySubject").value;
        var newEntryLog = document.getElementById("newEntryLog").value;

        entry.run(newEntryTime, newEntrySubject, newEntryLog);

        entry.finalize();

        var rows = document.getElementById("database");

      var entry = document.createElement("tr");
          var entryTime = document.createElement("td");
          var entryTimeText = document.createTextNode(newEntryTime);
          var entrySubject = document.createElement("td");
          var entrySubjectText = document.createTextNode(newEntrySubject);
          var entryLog = document.createElement("td");
          var entryLogText = document.createTextNode(newEntryLog);
          
          entryTime.appendChild(entryTimeText);
          entrySubject.appendChild(entrySubjectText);
          entryLog.appendChild(entryLogText);
          entry.appendChild(entryTime);
          entry.appendChild(entrySubject);
          entry.appendChild(entryLog);
          rows.appendChild(entry);

          
      });


      db.close()

      }

      function newSession() {

        // pull the values from the form entries
        var userName = document.getElementById("sessionUserName").value;
        var user = document.getElementById("sessionUser").value;
        var date = document.getElementById("sessionDate").value;
        var shift = document.querySelector('input[name="sessionShift"]:checked').value;

        // grab the location to display the text pulled from the form
        var sessionUserName = document.getElementById("sessionHeaderUserName");
        var sessionUser = document.getElementById("sessionHeaderUser");
        var sessionDate = document.getElementById("sessionHeaderDate");
        var sessionShift = document.getElementById("sessionHeaderShift");

        // create text nodes to insert into the spans
        var sessionUserNameText = document.createTextNode(userName);
        var sessionUserText = document.createTextNode(user);
        var sessionDateText = document.createTextNode(date);
        var sessionShiftText = document.createTextNode(chooseShift(shift));

        // insert text nodes into the spans
        sessionUserName.appendChild(sessionUserNameText);
        sessionUser.appendChild(sessionUserText);
        sessionDate.appendChild(sessionDateText);
        sessionShift.appendChild(sessionShiftText);

        // hide the new session form and display the new entry form
        var newSessionForm = document.getElementById("newSessionContainer");
        var newEntryForm = document.getElementById("newEntryContainer");
        var currentSessionHeader = document.getElementById("currentSessionHeader");
        var endSessionContainer = document.getElementById("endSessionContainer");

        newSessionForm.style.display = "none";
        currentSessionHeader.style.display = "block";
        newEntryForm.style.display = "block";
        endSessionContainer.style.display = "block";
      
        // loop through the possible shifts to find the one checked, and add it to a text node
          function chooseShift(shift) {
                
                if (shift = '6a6p') {
                    return "6 AM - 6 PM"
                }
                else if (shift = '6p6a') {
                    return "6 PM - 6 AM"
                }
              }
        getCurrentLog();
    }

    function endSession() {

        // grab each of the containers to either hide or reveal parts of the application
        var newSessionForm = document.getElementById("newSessionContainer");
        var newEntryForm = document.getElementById("newEntryContainer");
        var currentSessionHeader = document.getElementById("currentSessionHeader");
        var logEntries = document.getElementById("database");
        var endSessionContainer = document.getElementById("endSessionContainer");

        // grab the elements of the new session form to clear it's text
        var newSessionUserName = document.getElementById("sessionUserName");
        var newSessionUser = document.getElementById("sessionUser");
        var newSessionDate = document.getElementById("sessionDate");

        var currentSessionHeaderUserName = document.getElementById("sessionHeaderUserName");
        var currentSessionHeaderUser = document.getElementById("sessionHeaderUser");
        var currentSessionHeaderDate = document.getElementById("sessionHeaderDate");
        var currentSessionHeaderShift = document.getElementById("sessionHeaderShift");

        // clear the previous information from the forms and log entry table
        newSessionUserName.value = "";
        newSessionUser.value = "";
        newSessionDate.value = "";
        logEntries.innerHTML = "";

        currentSessionHeaderUserName.innerHTML = "";
        currentSessionHeaderUser.innerHTML = "";
        currentSessionHeaderDate.innerHTML = "";
        currentSessionHeaderShift.innerHTML = "";

        // either hide or reveal each section of the application
        newSessionForm.style.display = "block";
        currentSessionHeader.style.display = "none";
        newEntryForm.style.display = "none";
        endSessionContainer.style.display = "none";



    }