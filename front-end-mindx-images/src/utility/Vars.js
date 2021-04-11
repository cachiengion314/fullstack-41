const Vars = {
    PAGE_SIZE: 4,
    getDataFromPage: async (client, page) => {
        return await client({
            url: "/api/posts",
            method: "GET",
            params: {
                page: page,
                pageSize: Vars.PAGE_SIZE,
            }
        })
    },
    authenticateUserInput: (email_input, password_input, emailFailAction, passwordFailAction) => {
        const isEmailInputValid = Vars.checkEmailInput(email_input);
        const isPasswordInputValid = Vars.checkPasswordInput(password_input);
        if (!isEmailInputValid) {
            emailFailAction()
            return false
        }
        if (!isPasswordInputValid) {
            passwordFailAction()
            return false
        }
        return true
    },
    checkPasswordInput: (password_input) => {
        let check = /^\S{3,}/
        if (check.test(password_input)) {
            return true
        }
        return false
    },
    checkEmailInput: (email_input) => {
        let checkemail_regexp = /^[a-zA-Z]\S+@.+/
        if (checkemail_regexp.test(email_input)) {
            return true
        }
        return false
    }
}

export default Vars
