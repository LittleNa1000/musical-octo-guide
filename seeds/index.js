const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  // useCreateIndex: true,
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
  for (let i = 0; i < 200; ++i) {
    const rand = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[rand].city}, ${cities[rand].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)} นะจ๊ะ ปัง เว๊อ`,
      author: "63c1236939215a2456455fa9",
      images: [
        {
          url: "https://res.cloudinary.com/djfl7g2u3/image/upload/v1674064367/YelpCamp/7ad85726b9cd4122aae48a3cbf377ebe_rrmitw.jpg",
          filename: "YelpCamp/7ad85726b9cd4122aae48a3cbf377ebe_rrmitw",
        },
        {
          url: "https://res.cloudinary.com/djfl7g2u3/image/upload/v1674064515/YelpCamp/Meme-4_xry3hx.jpg",
          filename: "YelpCamp/Meme-4_xry3hx",
        },
      ],
      geometry: { type: "Point", coordinates: [cities[rand].lng, cities[rand].lat] },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi autem quae mollitia voluptatem eligendi earum error. Cupiditate illo sapiente fugit unde. Minima reiciendis molestiae aliquam magnam adipisci alias facere minus.",
      price: price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  db.close();
});
