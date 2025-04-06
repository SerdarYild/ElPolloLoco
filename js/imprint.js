/**
 * Displays the imprint dialog by setting its display style to 'flex'.
 */
function openImprint() {
    document.getElementById('imprintDialog').style.display = 'flex';
}

/**
 * Hides the imprint dialog by setting its display style to 'none'.
 */
function closeImprint() {
    document.getElementById('imprintDialog').style.display = 'none';
}

/**
 * Sets up the event listener for the imprint dialog after the DOM content is loaded.
 * 
 * When the document is fully loaded, this function adds a click event listener 
 * to the element with the ID 'imprintDialog', which triggers the 'closeImprint' function.
 */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('imprintDialog').addEventListener('click', closeImprint);
});