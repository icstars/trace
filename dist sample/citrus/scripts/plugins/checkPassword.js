/**
 * checkPassword - A small function to check a password for validity based on regexs
 * @version 1.0.0
 * @example
 * checkPassword('[data-target="password"]','[data-target="password-container"]');
 * @return {void}
 */
module.exports = function checkPassword(el, container) {
    'use strict';

    var containsUppercase = /[A-Z]/,
    containsLowercase = /[a-z]/,
    containsNumbers = /[0-9]/,
    containsSpecial = /[@#!$%^&*+=]/,
    $verifyTotal = $( '[data-target~=pwr-total]' ),
    $verifyLowercase = $( '[data-target~=pwr-lowercase]' ),
    $verifyUppercase = $( '[data-target~=pwr-uppercase]' ),
    $verifyLowerUpper = $( '[data-target~=pwr-lowerupper]' ),
    $verifyNumber = $( '[data-target~=pwr-number]' ),
    $verifySpecial = $( '[data-target~=pwr-special]' ),
    $passwordContainer = $(container),
    $passwordField = $(el);

    $passwordField
        .off( 'focus blur keyup' )
        .on( 'focus', function() {
            $passwordContainer.addClass( 'open' ).addClass( 'active' );
        })
        .on( 'blur', function( evt ) {
            var passVal = $( evt.currentTarget ).val(),
                passwordIsValid = ( passVal.length >= 8 ) &&
                    containsUppercase.test( passVal ) &&
                    containsLowercase.test( passVal ) &&
                    containsNumbers.test( passVal ) &&
                    containsSpecial.test( passVal );

            $passwordContainer.removeClass( 'active' );

            if ( !$( evt.currentTarget ).val()) {
                $passwordContainer.removeClass( 'open' ).removeClass( 'error' );
                $passwordField.removeClass( 'invalid' );
            }

            if ( passVal && !passwordIsValid ) {
                $( evt.currentTarget ).addClass( 'invalid' );
                $passwordContainer.addClass( 'error' );
            }
        })
        .on( 'keyup', function( evt ) {
            var passVal = $( evt.currentTarget ).val();

            console.log(passVal);

            // More than 8 characters
            if ( passVal.length >= 8 && passVal.length <= 20 ) {
                $verifyTotal.addClass( 'active' );
            } else {
                $verifyTotal.removeClass( 'active' );
            }

            // Contains lowercase
            if ( containsLowercase.test( passVal )) {
                $verifyLowercase.addClass( 'active' );
            } else {
                $verifyLowercase.removeClass( 'active' );
            }

            // Contains uppercase
            if ( containsUppercase.test( passVal )) {
                $verifyUppercase.addClass( 'active' );
            } else {
                $verifyUppercase.removeClass( 'active' );
            }

            // Contains uppercase and lowercase
            if ( containsUppercase.test( passVal ) && containsLowercase.test( passVal )) {
                $verifyLowerUpper.addClass( 'active' );
            } else {
                $verifyLowerUpper.removeClass( 'active' );
            }

            // Contains number
            if ( containsNumbers.test( passVal )) {
                $verifyNumber.addClass( 'active' );
            } else {
                $verifyNumber.removeClass( 'active' );
            }

            // Contains punctuation
            if ( containsSpecial.test( passVal )) {
                $verifySpecial.addClass( 'active' );
            } else {
                $verifySpecial.removeClass( 'active' );
            }

            var passwordIsValid = ( passVal.length >= 8 ) &&
                    containsUppercase.test( passVal ) &&
                    containsLowercase.test( passVal ) &&
                    containsNumbers.test( passVal ) &&
                    containsSpecial.test( passVal );

            if ( passwordIsValid ) {
                $( evt.currentTarget ).addClass( 'valid' ).removeClass( 'invalid' );
                $passwordContainer.addClass( 'valid' ).removeClass( 'error' );
            } else {
                $( evt.currentTarget ).removeClass( 'valid' );
                $passwordContainer.removeClass( 'valid' );
            }
        });
};
