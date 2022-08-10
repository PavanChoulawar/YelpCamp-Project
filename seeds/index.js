const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random200 = Math.floor(Math.random() * 200);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "62f3922e2511232bf8bee146",
            location: `${cities[random200].city}, ${cities[random200].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random200].longitude, cities[random200].latitude],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/pavanchoulawar/image/upload/v1660130679/YelpCamp/cjp8yi9shs01gte76872.jpg",
                    filename: "YelpCamp/cjp8yi9shs01gte76872",
                },
                {
                    url: "https://res.cloudinary.com/pavanchoulawar/image/upload/v1660130680/YelpCamp/yffexmktpkovmbkpudur.jpg",
                    filename: "YelpCamp/yffexmktpkovmbkpudur",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
