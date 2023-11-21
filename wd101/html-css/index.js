var maxDob = new Date();
maxDob.setFullYear(maxDob.getFullYear() - 18); 
var maxDobValue = maxDob.toISOString().split('T')[0]; 

document.getElementById("dob").setAttribute("max", maxDobValue);

function calculateMinDobValue() {
    var currentDate = new Date();
    var minDobValue = new Date(currentDate.getFullYear() - 55, currentDate.getMonth() , currentDate.getDate() + 1);
    return minDobValue.toISOString().split('T')[0]; 
}

var minDobValue = calculateMinDobValue();
document.getElementById("dob").setAttribute("min", minDobValue);

document.addEventListener("DOMContentLoaded", function() {
    let userform = document.getElementById("sign-up");

    const retrieveEntries = () => {
        let entries = localStorage.getItem("user-entries");
        if (entries) {
            entries = JSON.parse(entries);
        }
        else{
            entries = [];
        }
        return entries;
    } 

    let entries = retrieveEntries();

    
    let displayEntries = () => {
        const entries = retrieveEntries();

        const tableEntries = entries.map((entry) => {
            const nametag= `<td class="border px-2 py-4">${entry.name}</td>`;
            const emailtag= `<td class="border px-2 py-4">${entry.email}</td>`;
            const passwordkeytag= `<td class="border px-2 py-4">${entry.password}</td>`;
            const dobtag= `<td class="border px-2 py-4">${entry.dob}</td>`;
            const termsAndConditionstag= `<td class="border px-2 py-4">${entry.termsAndConditions}</td>`;
            
            const row = `${nametag} ${emailtag} ${passwordkeytag} ${dobtag} ${termsAndConditionstag}`; 
            return row;
        }).join("\n");

        const table = `<table id="entriesTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>DOB</th>
                <th>Accepted Terms?</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    ${tableEntries}
                </tr>
            </tbody>
        </table>`

        document.getElementById('entries').innerHTML = table;
    }
    displayEntries();



    const saveEntries = (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const termsAndConditions = document.getElementById("check").checked;

        const entry = {
            name,
            email,
            password,
            dob,
            termsAndConditions
        };

        entries.push(entry);

        localStorage.setItem("user-entries", JSON.stringify(entries));
        console.log(entries);
        displayEntries();
    }
    userform.addEventListener("submit", saveEntries);
})

