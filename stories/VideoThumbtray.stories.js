import VideoThumbtray from "~/components/VideoThumbtray"

export default {
    title: "Gutenberg Blocks / VideoThumbtray",
}

export const Default = () => ({
    components: { VideoThumbtray },
    data() {
        return {
            items: [
                {
                    credits: "credits 1",
                    imageId: "13164",
                    secondaryImageId: "",
                    title: "Slide 1 - subtitle",
                    videoUrl: "https://vimeo.com/587964410",
                },
                {
                    credits: "credits 2",
                    imageId: "13160",
                    secondaryImageId: "10959",
                    title: "Slide 2",
                    videoUrl: "https://vimeo.com/420348095",
                },
                {
                    credits: "Credits 3",
                    imageId: "12818",
                    secondaryImageId: "",
                    title: "Slide 3",
                    videoUrl: "",
                },
            ],
            images: [
                {
                    sourceUrl:
                        "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885.png",
                    sizes: "(max-width: 1936px) 100vw, 1936px",
                    srcSet: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885.png 1936w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-292x300.png 292w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-998x1024.png 998w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-768x788.png 768w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-1497x1536.png 1497w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-526x540.png 526w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-375x385.png 375w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-960x985.png 960w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-1280x1313.png 1280w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885-1920x1970.png 1920w",
                    src: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/Messages-Image3480545106-e1634936175885.png",
                    id: "cG9zdDoxMzE2NA==",
                    databaseId: 13164,
                    title: "Messages Image(3480545106)",
                    altText: "",
                    caption: null,
                    mediaDetails: {
                        height: 1986,
                        width: 1936,
                    },
                    imageMeta: {
                        videoUrl: null,
                        primaryColor: "#857c72",
                        focalPointX: null,
                        focalPointY: null,
                        blurhash: "UPHxf|_2t,?b~pofS2of%NagaekA?uj]V]of",
                    },
                },
                {
                    sourceUrl:
                        "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu.jpg",
                    sizes: "(max-width: 3225px) 100vw, 3225px",
                    srcSet: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu.jpg 3225w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-300x256.jpg 300w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-1024x874.jpg 1024w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-768x655.jpg 768w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-1536x1311.jpg 1536w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-2048x1748.jpg 2048w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-633x540.jpg 633w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-375x320.jpg 375w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-960x819.jpg 960w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-1280x1092.jpg 1280w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu-1920x1638.jpg 1920w",
                    src: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/AdrianYu.jpg",
                    id: "cG9zdDoxMzE2MA==",
                    databaseId: 13160,
                    title: "AdrianYu",
                    altText: "",
                    caption: null,
                    mediaDetails: {
                        height: 2752,
                        width: 3225,
                    },
                    imageMeta: {
                        videoUrl: null,
                        primaryColor: "#9ac4be",
                        focalPointX: null,
                        focalPointY: null,
                        blurhash: "UBHft_vh2-_NPnIA4UOq0x%gD5IA00r?_3NZ",
                    },
                },
                {
                    sourceUrl:
                        "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail.jpg",
                    sizes: "(max-width: 1280px) 100vw, 1280px",
                    srcSet: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail.jpg 1280w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail-300x169.jpg 300w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail-1024x576.jpg 1024w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail-768x432.jpg 768w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail-960x540.jpg 960w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail-375x211.jpg 375w",
                    src: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/10/nationalsafetycouncil-perscribedtodeath-thumbnail.jpg",
                    id: "cG9zdDoxMjgxOA==",
                    databaseId: 12818,
                    title: "nationalsafetycouncil-perscribedtodeath-thumbnail",
                    altText: "",
                    caption: null,
                    mediaDetails: {
                        height: 720,
                        width: 1280,
                    },
                    imageMeta: {
                        videoUrl: null,
                        primaryColor: "#171625",
                        focalPointX: null,
                        focalPointY: null,
                        blurhash: "UF8|;nRi4mof?dWBITogxvt8ITRjogofRiay",
                    },
                },
            ],
            logos: [
                {
                    sourceUrl:
                        "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon.png",
                    sizes: "(max-width: 5211px) 100vw, 5211px",
                    srcSet: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon.png 5211w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-300x235.png 300w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-1024x804.png 1024w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-768x603.png 768w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-1536x1205.png 1536w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-2048x1607.png 2048w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-688x540.png 688w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-375x294.png 375w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-960x753.png 960w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-1280x1004.png 1280w, https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon-1920x1507.png 1920w",
                    src: "https://missingpieces-api.flywheelsites.com/wp-content/uploads/2021/08/oscar-nominated-icon.png",
                    id: "cG9zdDoxMDk1OQ==",
                    databaseId: 10959,
                    title: "oscar-nominated-icon",
                    altText: "",
                    caption: null,
                    mediaDetails: {
                        height: 4089,
                        width: 5211,
                    },
                    imageMeta: {
                        videoUrl: null,
                        primaryColor: "#040404",
                        focalPointX: null,
                        focalPointY: null,
                        blurhash: "U4ONB[xu00M{t7%MfQD%00IUIU%MWB9Fay~q",
                    },
                },
            ],
        }
    },
    template: `<video-thumbtray :images="images" :logos="logos" :items="items" />`,
})
