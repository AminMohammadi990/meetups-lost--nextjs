import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First Meetup",
//     image:
//       "https://www.objective.com.au/assets/content/images/Resources/Blog-Articles/_sm/img-blog-PNC-meetup.png",
//     address: "some street5, some city",
//   },
//   {
//     id: "m2",
//     title: "Second Meetup",
//     image:
//       "https://imageio.forbes.com/specials-images/imageserve/e870685b6cc344e49c376b79d3083e0f/0x0.jpg?format=jpg&width=1200",
//     address: "some street10, some city...",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb+srv://amin990:amin3028@cluster0.osd14gw.mongodb.net/Meetups?retryWrites=true&w=majority");

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups =await  meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: (await meetups).map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
