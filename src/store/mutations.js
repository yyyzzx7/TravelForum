const mutations = {
    //mutations提交风格ccc(state,payload){}
    //mutation包括两部分1：字符串的事件类型2：一个回调函数，该回调函数的第一个参数就是state
    //login是事件类型，后面是回调函数

    login(state, username) {
        state.isLogin = true;
        state.loginUsername = username;
    },
    logout(state) {
        state.isLogin = false;
        state.loginUsername = "";
    },
    setSearchResult(state, searchResult) {
        state.searchResult = searchResult;
        state.searchCount = searchResult.length;
    }
}

export default mutations;