import axios from "axios";

//全局默认配置
axios.defaults.baseURL = "http://localhost:9991";
axios.defaults.withCredentials = true;
const config = {
    headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080', // Set the allowed origin for the request
        // 'Access-Control-Allow-Credentials': true, // Allow cookies to be sent with the request
    }
};

export const userLogin = (username, password) => {
    return axios.post(
        "/signIn",
        JSON.stringify({username, password}),
        config
    );
    // return axios({
    //     // url: " http://175.178.196.147:9991/signIn",
    //     url: "/signIn",
    //     method: "post",
    //     data: {
    //         username: username,
    //         password: password,
    //     },
    // });
    // }
};

export const userRegister = (username, password, password2, email) => {
    return axios.post(
        "/signUp",
        JSON.stringify({username, password, password2, email}),
        config
    );
};

export const getAllPost = () => {
    return axios.get(
        "/get_post",
        JSON.stringify({}),
        config
    );
};

export const getAllPostDetail = (post_id) => {
    return axios.post(
        "/post_detail",
        JSON.stringify({post_id}),
        config
    );
};

export const getTravelPicture = (city) => {
    return axios.get("/mashup/city_pics", {
        params: {
            city: city
        },
        config
    });
}

export const getTravelWeather = (city) => {
    return axios.get(
        "/mashup/forecast",
        {
            params: {
                city: city
            },
            config
        });
}

export const getUserPost = () => {
    return axios.get(
        "/post/my_posts",
        {
            params: {},
            config
        });
};

export const createComment = (post_id, content) => {
    return axios.post(
        "/comment/make",
        JSON.stringify({post_id, content}),
        config
    );
};

export const createPost = (title, destination, start_date, end_date, tags) => {
    return axios.post(
        "/post/create",
        JSON.stringify({title, destination, start_date, end_date, tags}),
        config
    );
}

export const deletePost = (post_id) => {
    return axios.post(
        "/post/delete",
        JSON.stringify({post_id}),
        config
    );
}

export const editPost = (post_id, title, destination, start_date, end_date, tags) => {
    return axios.post(
        "/post/edit",
        JSON.stringify({post_id, title, destination, start_date, end_date, tags}),
        config
    );
}

