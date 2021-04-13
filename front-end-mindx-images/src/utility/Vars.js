import axios from "../api"
const Vars = {
    //
    // home
    //
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
    //
    // user sign status 
    //
    signIn: (token, setUser, history) => {
        Vars.saveTokenToLocal(token)
        Vars.getAndSetUserData(setUser)
        Vars.redirectToHome(history)
    }
    ,
    saveTokenToLocal: (token) => {
        localStorage.setItem(`mindx-img-token`, token)
    }
    ,
    redirectToHome: (history) => {
        history.push("/")
    },
    getAndSetUserData: async (setUser) => {
        try {
            const res = await axios({
                url: "/api/auth/user",
                method: "GET"
            })
            if (res.data.success) {
                setUser(res.data.data)
                return true
            }
            return false
        } catch (err) {
            console.log(`catch.err`, err)
            return false
        }
    },
    signOut: (setUser) => {
        setUser(null)
        localStorage.clear()
    },
    isUserSignIn: () => {
        let hasToken = localStorage.getItem("mindx-img-token")
        if (hasToken) {
            return true
        }
        return false
    },
    //
    // auth
    //
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