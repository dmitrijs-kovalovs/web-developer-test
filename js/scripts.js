// Created by Dmitrijs Kovalovs

"use strict"; // strict for faster code execution and less errors

// DOMContentLoaded start
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    const formEmail = document.getElementById('formEmail');

    function formSend(e) {

        // prevent the form from submitting
        e.preventDefault();

        // result of the form validation
        let error = validateForm(form);

        // collecting form data
        let formData = new FormData(form);

        const submitBtn = document.getElementById('submit');

        // Disabling/enabling submit button if form is not valid
        if (error === 0) {
            submitBtn.removeAttribute('disabled', 'disabled');

            // removing error text inform is valid
            const elementsToRemove = document.querySelectorAll('.error-text');
            for (let index = 0; index < elementsToRemove.length; index++) {
                elementsToRemove[index].remove();
            }
        }
        else {
            // This disables submit btn, but blocking from pressing it and validating again, so I commented the code line. I suppose here should be some kind of real time check, if form is valid, so submit btn will become active again? 
            // submitBtn.setAttribute('disabled', 'disabled');
        }

    }

    function validateForm(form) {
        let error = 0;
        let formReqFields = document.querySelectorAll('.required');

        // checking inputs for containing .required class
        for (let index = 0; index < formReqFields.length; index++) {
            const input = formReqFields[index];

            // removing error class from input
            removeError(input);

            // removing error text messages
            let elementsToRemove = document.querySelectorAll('.error-text');
            elementsToRemove.remove;

            // adding & removing error class and error text to input fields
            if (input.getAttribute('type') === 'email') {

                // Checking email input
                if (validateEmail(input)) {
                    addError(input);
                    error++;
                    const errorText  = document.createElement('p');
                    errorText.classList.add('error-text');
                    errorText.innerHTML = 'Please provide a valid e-mail address';
                    input.after(errorText);
                }
            }

            // Checking checkbox input
            else if ( input.getAttribute('type') === 'checkbox' && input.checked === false) {
                addError(input);
                error++;
                const errorText  = document.createElement('p');
                errorText.classList.add('error-text');
                errorText.innerHTML = 'You must accept the terms and conditions';
                input.parentElement.after(errorText);
            }

            // Not working - Checking if email input is empty
            else {
                if (input.value === "") {
                    addError(input);
                    error++;
                    const errorText  = document.createElement('p');
                    errorText.classList.add('error-text');
                    errorText.innerHTML = 'Email address is required';
                    input.before(errorText);
                }
            }

        }
        return error;

    }

    function addError(input) {
        input.classList.add('error');
    }

    function removeError(input) {
        input.classList.remove('error');
    }

    // Checking if email is valid
    function validateEmail(input) { 
        // here found and used regular expression for form validating email in most possible cases 
        return ! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value);
    }

});
// DOMContentLoaded end