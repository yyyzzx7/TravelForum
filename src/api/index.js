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

export const apiUserLogin = (username, password) => {
    return axios.post(
        "/signIn",
        JSON.stringify({username, password}),
        config
    );
};

export const apiUserRegister = (username, password, password2, email) => {
    return axios.post(
        "/signUp",
        JSON.stringify({username, password, password2, email}),
        config
    );
};

export const apiGetAllPost = () => {
    return axios.get(
        "/get_post",
        JSON.stringify({}),
        config
    );
};

export const apiGetAllPostDetail = (post_id) => {
    return axios.post(
        "/post_detail",
        JSON.stringify({post_id}),
        config
    );
};

export const apiGetTravelPicture = (city) => {
    return axios.get("/mashup/city_pics", {
        params: {
            city: city
        },
        config
    });
}

export const apiGetTravelWeather = (city) => {
    return axios.get(
        "/mashup/forecast",
        {
            params: {
                city: city
            },
            config
        });
}

export const apiGetUserPost = () => {
    return axios.get(
        "/post/my_posts",
        {
            params: {},
            config
        });
};

export const apiCreateComment = (post_id, content) => {
    return axios.post(
        "/comment/make",
        JSON.stringify({post_id, content}),
        config
    );
};

export const apiCreatePost = (title, destination, start_date, end_date, tags) => {
    return axios.post(
        "/post/create",
        JSON.stringify({title, destination, start_date, end_date, tags}),
        config
    );
}

export const apiDeletePost = (post_id) => {
    return axios.post(
        "/post/delete",
        JSON.stringify({post_id}),
        config
    );
}

export const apiEditPost = (post_id, title, destination, start_date, end_date, tags) => {
    return axios.post(
        "/post/edit",
        JSON.stringify({post_id, title, destination, start_date, end_date, tags}),
        config
    );
}

export const apiSearchPost = (text, type) => {
    return axios.post(
        "/search",
        JSON.stringify({
            "keywords": text,
            "type": type
        }),
        config
    );
}
