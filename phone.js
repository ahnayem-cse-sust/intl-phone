/**
 * Intl_phone.js
 * @description 
 * add "intl-phone" css class where you need to modify the field.
 * you must use an id for the input field
 * @class intl_phone
 * @author Md. Abu Hanife Nayem
 *
 */
Intl_phone = function () {
    return {
        init: function () {
            //Set Contry wise phone
            var allObj = $('.intl-phone');
            $.each(allObj, function (k, obj) {
                Intl_phone.setUpPhone(obj.id);
            });

        },
        setUpPhone: function (id) {
            var div = document.getElementById(id);
            var validId = id + '-valid-msg';
            var errorId = id + '-error-msg';
            if (!document.getElementById(validId)) {
                var span1 = document.createElement('span');
                span1.id = validId;
                span1.class = 'hide';
                span1.style = 'color:green';
                var span2 = document.createElement('span');
                span2.id = errorId;
                span2.class = 'hide';
                span2.style = 'color:red';
                div.parentNode.insertBefore(span1, div.nextSibling);
                div.parentNode.insertBefore(span2, span1.nextSibling);
            }
            var input = document.querySelector('#' + id),
                    errorMsg = document.querySelector('#' + id + "-error-msg"),
                    validMsg = document.querySelector('#' + id + "-valid-msg");

            // here, the index maps to the error code returned from getValidationError - see readme
            var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

            // initialise plugin
            $('#' + id).intlTelInput({
                "preferredCountries": ["us", "gb", "au", "ca", "nz", "ie"],
                "hiddenInput": "full_phone",
                "utilsScript": "intl-tel-input/build/js/utils.js"
            });
            var iti = $('#' + id);

            var reset = function () {
                input.classList.remove("error");
                let countryCode = iti.intlTelInput("getSelectedCountryData").dialCode;
                $(id + "-country").val(countryCode);
                errorMsg.innerHTML = "";
                errorMsg.classList.add("hide");
                validMsg.classList.add("hide");
            };

            // on blur: validate
            input.addEventListener('blur', function () {
                reset();
                if (input.value.trim()) {
                    if (iti.intlTelInput("isValidNumber")) {
                        validMsg.innerHTML = '✓ Valid';
                        validMsg.classList.remove("hide");
                    } else {
                        input.classList.add("error");
                        var errorCode = iti.intlTelInput("getValidationError");
                        errorMsg.innerHTML = errorMap[errorCode];
                        errorMsg.classList.remove("hide");
                    }
                }
            });

            // on keyup / change flag: reset
            input.addEventListener('change', reset);
            input.addEventListener('keyup', reset);

        }

    }
}();

$(function () {
    Intl_phone.init();
});