const Vars = {
    authenticateUserInput: (email_input, password_input) => {
        const isEmailInputValid = Vars.checkEmailInput(email_input);
        const isPasswordInputValid = Vars.checkPasswordInput(password_input);
        if (!isEmailInputValid) {
            alert(`You need to check your email again! Your providing are probably fake!`)
            return false
        }
        if (!isPasswordInputValid) {
            alert(`Check your password again! Maybe your password is not strong enough!`)
            return false
        }
        return true
    },
    checkPasswordInput: (password_input) => {
        let check = /^\S{3,}/i
        if (check.test(password_input)) {
            return true
        }
        return false
    },
    checkEmailInput: (email_input) => {
        let checkemail_regexp = /^[a-zA-Z]+@.+/i
        if (checkemail_regexp.test(email_input)) {
            return true
        }
        return false
    }
}

export default Vars