const user = {
    state: {
        isLoggedIn: false
    },
    getters: {
        getStatus: state => state.isLoggedIn
    }
}
export default user