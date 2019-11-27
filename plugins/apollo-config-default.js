export default function() {
    return {
        httpEndpoint: process.env.DEFAULT_ENDPOINT,
        getAuth: () => process.env.BASIC_API_TOKEN || "",
        httpLinkOptions: {
            credentials: "include"
        }
    }
}
