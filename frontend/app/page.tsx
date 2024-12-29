import "./page.css";
import { Image } from "@nextui-org/image";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <Card className="p-6">
      <CardBody className="flex flex-row card-body">
        <div className="flex-1 text-justify mr-5 flex-col card-body-info">
          <h1 className="title mb-5">Your Voice Forum</h1>
          <span>
            YourVoice is an interactive forum designed to share information and
            connect users. The application allows registered users to publish
            their own content, comment, rate the posts of others and edit their
            profile. Registered users can also actively participate in
            suggesting and evaluating improvements to the online forum.
            Non-logged in users can browse posts but cannot interact. Advanced
            functionalities include filtering and sorting posts, advanced search
            and other options. The application also includes special
            functionalities and rights for moderators and administrators. The
            MERN stack is used for development.
          </span>
          <Button color="primary">Start Now</Button>
        </div>

        <div className="flex-1 ml-5">
          <Image
            alt="NextUI hero Image"
            src="/images/default.png"
            width="100%"
          />
        </div>
      </CardBody>
    </Card>
  );
}
