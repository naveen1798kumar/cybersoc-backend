import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY || "public_u/u4AIvv/bZDMQSMQElbtxOFIkw=",
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY || "private_X2d/QwHTJCjMaa7CsYByXMCf4iU=",
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/cybersoc"
});

export default imagekit;
