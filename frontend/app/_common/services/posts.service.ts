import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  votes: number[][];
  image?: string;
  comments: Comment[];
}

export interface Post {
  id: number;
  title: string;
  image?: string;
  user: User;
  content: string;
  category: string[];
  votes: number[][];
  comments: Comment[];
}

export const aljaz = {
  id: 0,
  name: "Aljaz",
  email: "kokol.aljaz@gmail.com",
};

const urban = {
  id: 1,
  name: "Urban",
  email: "urban.ferlinc@gmail.com",
};

const tine = {
  id: 2,
  name: "Tine",
  email: "tine.rogl@gmail.com",
};

const nejc = {
  id: 3,
  name: "nejc",
  email: "nejc.pauman@gmail.com",
};

function generateRandomArrays() {
  let length = Math.floor(Math.random() * 10);

  const array1: number[] = [];
  const array2: number[] = [];

  while (array1.length < length) {
    const newNumber = Math.floor(Math.random() * 100);

    if (!array1.includes(newNumber)) {
      array1.push(newNumber);
    }
  }

  length = Math.floor(Math.random() * 10);

  while (array2.length < length) {
    const newNumber = Math.floor(Math.random() * 100);

    if (!array1.includes(newNumber) && !array2.includes(newNumber)) {
      array2.push(newNumber);
    }
  }

  return [array1, array2];
}

export class PostService {
  private static instance: PostService | null = null;
  group = {
    "RUPS skupina 1": [0, 1],
    "RUPS skupina 2": [2],
  };
  private posts = new BehaviorSubject<Post[]>([
    {
      id: 0,
      user: aljaz,
      title: "Test post 1",
      image:
        "https://codeop.tech/wp-content/uploads/2024/05/What-is-Coding.jpg",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
      category: ["education", "fun"],
      votes: generateRandomArrays(),
      comments: [
        {
          id: 0,
          content: "Simple comment",
          user: urban,
          votes: generateRandomArrays(),
          comments: [],
        },
        {
          id: 1,
          content: "Simple comment 2",
          user: urban,
          votes: generateRandomArrays(),
          comments: [],
        },

        {
          id: 2,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ",
          image:
            "https://as.virginia.edu/sites/as.virginia.edu/files/2023-07/Coding_Class.jpg",
          user: urban,
          votes: generateRandomArrays(),
          comments: [
            {
              id: 3,
              content: "Nested comment 1",
              user: urban,
              votes: generateRandomArrays(),
              comments: [
                {
                  id: 4,
                  content: "Nested comment 2",
                  user: urban,
                  votes: generateRandomArrays(),
                  comments: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      user: urban,
      title: "Test post 2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
      category: ["education", "fun"],
      votes: generateRandomArrays(),
      comments: [
        {
          id: 5,
          content: "Simple comment",
          user: tine,
          votes: generateRandomArrays(),
          comments: [
            {
              id: 21,
              content: "Nested comment",
              user: nejc,
              votes: generateRandomArrays(),
              comments: [
                {
                  id: 31,
                  content: "Nested comment 1",
                  user: urban,
                  votes: generateRandomArrays(),
                  comments: [
                    {
                      id: 41,
                      content: "Nested comment 2",
                      user: tine,
                      votes: generateRandomArrays(),
                      comments: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 31,
              content: "Nested comment 1",
              user: aljaz,
              votes: generateRandomArrays(),
              comments: [
                {
                  id: 41,
                  content: "Nested comment 2",
                  user: urban,
                  votes: generateRandomArrays(),
                  comments: [],
                },
              ],
            },
          ],
        },
        {
          id: 6,
          content: "Simple comment 2",
          user: nejc,
          votes: generateRandomArrays(),
          comments: [],
        },
      ],
    },
    {
      id: 2,
      user: nejc,
      title: "Test post 3",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ips",
      category: ["education", "fun"],
      votes: generateRandomArrays(),
      comments: [
        {
          id: 7,
          content: "Simple comment",
          user: tine,
          votes: generateRandomArrays(),
          comments: [],
        },
        {
          id: 8,
          content: "Simple comment 2",
          user: nejc,
          votes: generateRandomArrays(),
          comments: [],
        },
      ],
    },
  ]);
  readonly posts$: Observable<Post[]> = this.posts.asObservable();

  private constructor() {}

  static get get(): PostService {
    if (this.instance === null) {
      this.instance = new PostService();
    }

    return this.instance;
  }

  getPosts() {
    return this.posts.value.sort((a, b) => {
      return (
        b.votes[0].length -
        b.votes[1].length -
        (a.votes[0].length - a.votes[1].length)
      );
    });
  }

  update(updatedPost: Post) {
    const posts = this.posts.value;
    const index = posts.findIndex((post) => post.id === updatedPost.id);

    posts[index] = updatedPost;
    this.posts.next(
      posts.sort((a, b) => {
        return (
          b.votes[0].length -
          b.votes[1].length -
          (a.votes[0].length - a.votes[1].length)
        );
      }),
    );
  }

  async createPost(payload: {
    title: string;
    content: string;
    category: string[];
  }) {
    const newId = this.posts.value.sort((a, b) => b.id - a.id)[0].id + 1;

    const newPost: Post = {
      id: newId,
      user: aljaz,
      comments: [],
      votes: [[], []],
      title: payload.title,
      content: payload.content,
      category: payload.category,
    };

    this.posts.next(
      [...this.posts.value, newPost].sort((a, b) => {
        return (
          b.votes[0].length -
          b.votes[1].length -
          (a.votes[0].length - a.votes[1].length)
        );
      }),
    );
  }
}
