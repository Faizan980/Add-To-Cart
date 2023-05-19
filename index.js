import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-17aad-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")
const inputFieldEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const shoppingListEl = document.getElementById("shopping-list")

inputBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToshoppingListEl(currentItem)
    
        }
    } else {
        shoppingListEl.innerHTML = "No items here - yet"
    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToshoppingListEl(item) {

    // shoppingListEl.innerHTML += `<li> ${itemValue} </li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.addEventListener("dblclick", function() {
        
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
}